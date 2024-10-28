import { IDeleteAvatarDTO } from "@/infra/dtos/AvatarDTO";
import { ManageFileService } from "@/infra/services/manageFileService";
import { DeleteUserAvatarUseCase } from "@/infra/useCases/avatars/deleteUserAvatarUseCase";
import { GetAvatarByIdUseCase } from "@/infra/useCases/avatars/getAvatarByIdUseCase";
import { GetUserByIdUseCase } from "@/infra/useCases/users/getUserByIdUseCase";
import { extractFileNameFromUrl } from "@/utils/formatString";
import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Delete,
  HttpCode,
  UseGuards,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AuthGuard } from "@nestjs/passport";
import { TEnvSchema } from "env";
import { z } from "zod";

const deleteAvatarValidationSchema = z.object({
  user_id: z.string(),
  avatar_id: z.string(),
});

@Controller("/avatars/delete-users-avatars")
@UseGuards(AuthGuard("jwt-user"))
export class DeleteUserAvatarController {
  constructor(
    private deleteUserAvatarUseCase: DeleteUserAvatarUseCase,
    private getUserByIdUseCase: GetUserByIdUseCase,
    private getAvatarByIdUseCase: GetAvatarByIdUseCase,
    private manageFileService: ManageFileService,
    private configService: ConfigService<TEnvSchema, true>
  ) {}
  @Delete()
  @HttpCode(204)
  async handle(@Body() body: IDeleteAvatarDTO) {
    const isBodyValidated = deleteAvatarValidationSchema.safeParse(body);

    if (!isBodyValidated.success) {
      throw new BadRequestException({
        message: "Invalid request body. Please check the input fields.",
        errors: isBodyValidated.error.issues,
      });
    }

    try {
      const { user_id, avatar_id } = body;

      console.log(user_id, avatar_id);

      const user = await this.getUserByIdUseCase.execute(user_id);

      const avatar = await this.getAvatarByIdUseCase.execute(avatar_id);

      const fileName = extractFileNameFromUrl(avatar.url);
      const containerName = await this.configService.get(
        "AZURE_BLOB_STORAGE_AVATARS_CONTAINER_NAME"
      );

      await this.manageFileService.removeUploadedFile(
        fileName,
        containerName,
        avatar_id
      );

      await this.deleteUserAvatarUseCase.execute(user.id);

      return true;
    } catch (error) {
      console.log("[INTERNAL ERROR]", error.message);
      throw new ConflictException({
        message:
          "An error occurred. Check all request body fields for possible mismatching.",
        error: error.message,
      });
    }
  }
}

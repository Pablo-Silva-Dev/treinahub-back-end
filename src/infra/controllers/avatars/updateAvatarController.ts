import { ManageFileService } from "@/infra/services/manageFileService";
import { UpdateAvatarUseCase } from "@/infra/useCases/avatars/updateAvatarUseCase";
import {
  BadRequestException,
  ConflictException,
  Controller,
  HttpCode,
  Put,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AuthGuard } from "@nestjs/passport";
import { FileInterceptor } from "@nestjs/platform-express";
import { TEnvSchema } from "env";
import { Request } from "express";
import { z } from "zod";

const updateAvatarValidationSchema = z.object({
  id: z.string(),
});

@Controller("/avatars/update")
@UseGuards(AuthGuard("jwt-user"))
@UseInterceptors(FileInterceptor("img_file"))
export class UpdateAvatarController {
  constructor(
    private updateAvatarUseCase: UpdateAvatarUseCase,
    private manageFileService: ManageFileService,
    private configService: ConfigService<TEnvSchema, true>
  ) {}
  @Put()
  @HttpCode(203)
  async execute(
    @Req() req: Request,
    @UploadedFile() file: Express.Multer.File
  ) {
    const isBodyValidated = updateAvatarValidationSchema.safeParse(req.body);

    if (!isBodyValidated.success) {
      throw new BadRequestException({
        message: "Invalid request body. Please check the input fields.",
        errors: isBodyValidated.error.issues,
      });
    }

    try {
      const blobStorageContainer = await this.configService.get(
        "AZURE_BLOB_STORAGE_AVATARS_CONTAINER_NAME"
      );

      const fileExtension = file.originalname.split(".")[1];

      const fileName = req.body.id + "." + fileExtension;

      const uploadedFile = await this.manageFileService.uploadFile(
        file.buffer,
        fileName,
        blobStorageContainer
      );

      const updatedAvatar = await this.updateAvatarUseCase.execute({
        ...req.body,
        url: uploadedFile,
      });
      return updatedAvatar;
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

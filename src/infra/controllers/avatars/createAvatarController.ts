import { ManageFileService } from "@/infra/services/manageFileService";
import { CreateAvatarUseCase } from "@/infra/useCases/avatars/createsAvatarUseCase";
import {
  BadRequestException,
  ConflictException,
  Controller,
  HttpCode,
  Post,
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

const createAvatarValidationSchema = z.object({
  user_id: z.string(),
});

@Controller("/avatars/create")
@UseGuards(AuthGuard("jwt-user"))
@UseInterceptors(FileInterceptor("img_file"))
export class CreateAvatarController {
  constructor(
    private createAvatarUseCase: CreateAvatarUseCase,
    private manageFileService: ManageFileService,
    private configService: ConfigService<TEnvSchema>
  ) {}
  @Post()
  @HttpCode(201)
  async handle(@UploadedFile() file: Express.Multer.File, @Req() req: Request) {
    const isBodyValidated = createAvatarValidationSchema.safeParse(req.body);

    if (!isBodyValidated.success) {
      throw new BadRequestException({
        message: "Invalid request body. Please check the input fields.",
        errors: isBodyValidated.error.issues,
      });
    }

    try {
      const blobStorageContainerName = await this.configService.get(
        "AZURE_BLOB_STORAGE_AVATARS_CONTAINER_NAME"
      );

      const fileExtension = file.originalname.split(".")[1];

      const fileName = req.body.user_id + "." + fileExtension;

      const uploadedFile = await this.manageFileService.uploadFile(
        file.buffer,
        fileName,
        blobStorageContainerName
      );

      const createdAvatar = await this.createAvatarUseCase.execute({
        ...req.body,
        url: uploadedFile,
      });

      console.log("@@@@@@@@@@@", createdAvatar);

      return createdAvatar;
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

import { ManageFileService } from "@/infra/services/manageFileService";
import { DeleteVideoClassUseCase } from "@/infra/useCases/videoClasses/deleteVideoClassUseCase";
import { extractFileNameFromUrl } from "@/utils/formatString";
import {
  ConflictException,
  Controller,
  Delete,
  HttpCode,
  Param,
  UseGuards,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AuthGuard } from "@nestjs/passport";
import { TEnvSchema } from "env";
import { GetVideoClassByIdUseCase } from "./../../useCases/videoClasses/getVideoClassByIdUseCase";

@Controller("video-classes/delete")
@UseGuards(AuthGuard("jwt-admin"))
export class DeleteVideoClassController {
  constructor(
    private deleteVideoClassUseCase: DeleteVideoClassUseCase,
    private getVideoClassByIdUseCase: GetVideoClassByIdUseCase,
    private manageFileService: ManageFileService,
    private configService: ConfigService<TEnvSchema, true>
  ) {}
  @Delete(":videoClassId")
  @HttpCode(200)
  async handle(@Param("videoClassId") videoClassId: string) {
    if (!videoClassId) {
      throw new ConflictException("videoClassId is required");
    }
    try {
      const { thumbnail_url, video_url } =
        await this.getVideoClassByIdUseCase.execute(videoClassId);

      const thumbnailFileName = extractFileNameFromUrl(thumbnail_url);
      const videoFileName = extractFileNameFromUrl(video_url);

      const thumbnailContainerName = await this.configService.get(
        "AZURE_BLOB_STORAGE_VIDEOS_THUMBNAILS_CONTAINER_NAME"
      );
      const videoContainerName = await this.configService.get(
        "AZURE_BLOB_STORAGE_VIDEO_CLASSES_CONTAINER_NAME"
      );

      await this.manageFileService.removeUploadedFile(
        thumbnailFileName,
        thumbnailContainerName
      );
      await this.manageFileService.removeUploadedFile(
        videoFileName,
        videoContainerName
      );

      await this.deleteVideoClassUseCase.execute(videoClassId);
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

import { BitmovinVideoEncodingService } from "@/infra/services/bitmovinVideoEncodingService";
import { ManageFileService } from "@/infra/services/manageFileService";
import { ListVideoClassesByTrainingUseCase } from "@/infra/useCases/videoClasses/listVideoClassesByTrainingUseCase";
import { formatSlugAzureEncodingManifestUrl } from "@/utils/formatSlug";
import { extractFileNameFromUrl } from "@/utils/formatString";
import {
  ConflictException,
  Controller,
  Get,
  HttpCode,
  Param,
  UseGuards,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AuthGuard } from "@nestjs/passport";
import { TEnvSchema } from "env";

@Controller("/video-classes/list-by-training")
@UseGuards(AuthGuard("jwt-user"))
export class ListVideoClassesByTrainingController {
  constructor(
    private listVideoClassesByTrainingUseCase: ListVideoClassesByTrainingUseCase,
    private bitmovinVideoEncodingService: BitmovinVideoEncodingService,
    private configService: ConfigService<TEnvSchema, true>,
    private manageFileService: ManageFileService
  ) {}
  @Get(":trainingId")
  @HttpCode(200)
  async handle(@Param("trainingId") trainingId: string) {
    try {
      const videoClasses =
        await this.listVideoClassesByTrainingUseCase.execute(trainingId);

      for (const vc of videoClasses) {
        const hlsEncodingStatus =
          await this.bitmovinVideoEncodingService.getEncodingStatus(
            vc.hls_encoding_id
          );

        if (hlsEncodingStatus === "FINISHED") {
          vc.hls_encoding_url = formatSlugAzureEncodingManifestUrl(
            this.configService.get("AZURE_STORAGE_ACCOUNT_NAME"),
            this.configService.get(
              "AZURE_BLOB_STORAGE_BITMOVIN_OUTPUTS_CONTAINER_NAME"
            ),
            vc.video_url
          );

          const fileName = extractFileNameFromUrl(vc.video_url);
          const videoContainerName = this.configService.get(
            "AZURE_BLOB_STORAGE_VIDEO_CLASSES_CONTAINER_NAME"
          );
          try {
            await this.manageFileService.removeUploadedFile(
              fileName,
              videoContainerName
            );
          } catch (error) {
            console.log(
              `[DELETE ERROR] Failed to delete blob: ${fileName}. Error: ${error.message}`
            );
          }
        } else {
          vc.hls_encoding_url = null;
        }
      }

      return videoClasses;
    } catch (error) {
      console.log("[INTERNAL ERROR]", error.message);
      throw new ConflictException({
        message: "An error occurred.",
        error: error.message,
      });
    }
  }
}

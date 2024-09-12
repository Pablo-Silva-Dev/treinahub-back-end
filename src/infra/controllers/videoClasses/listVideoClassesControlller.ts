import { BitmovinVideoEncodingService } from "@/infra/services/bitmovinVideoEncodingService";
import { ManageFileService } from "@/infra/services/manageFileService";
import { ListVideoClassesUseCase } from "@/infra/useCases/videoClasses/listVideoClassesUseCase";
import { formatSlugAzureEncodingManifestUrl } from "@/utils/formatSlug";
import { extractFileNameFromUrl } from "@/utils/formatString";
import {
  ConflictException,
  Controller,
  Get,
  HttpCode,
  UseGuards,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AuthGuard } from "@nestjs/passport";
import { TEnvSchema } from "env";

@Controller("/video-classes/list")
@UseGuards(AuthGuard("jwt-user"))
export class ListVideoClassesController {
  constructor(
    private listVideoClassesUseCase: ListVideoClassesUseCase,
    private bitmovinVideoEncodingService: BitmovinVideoEncodingService,
    private configService: ConfigService<TEnvSchema, true>,
    private manageFileService: ManageFileService
  ) {}
  @Get()
  @HttpCode(200)
  async handle() {
    try {
      const videoClasses = await this.listVideoClassesUseCase.execute();

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

          const videoContainerName = this.configService.get(
            "AZURE_BLOB_STORAGE_VIDEO_CLASSES_CONTAINER_NAME"
          );
          const fileName = extractFileNameFromUrl(vc.video_url);

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
        message: "An error occurred",
        error: error.message,
      });
    }
  }
}

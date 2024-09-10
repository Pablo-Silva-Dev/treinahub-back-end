import { BitmovinVideoEncodingService } from "@/infra/services/bitmovinVideoEncodingService";
import { GetVideoClassByIdUseCase } from "@/infra/useCases/videoClasses/getVideoClassByIdUseCase";
import { formatSlugAzureEncodingManifestUrl } from "@/utils/formatSlug";
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

@Controller("/video-classes/get-by-id")
@UseGuards(AuthGuard("jwt-user"))
export class GetVideoClassByIdController {
  constructor(
    private getVideoClassByIdUseCase: GetVideoClassByIdUseCase,
    private bitmovinVideoEncodingService: BitmovinVideoEncodingService,
    private configService: ConfigService<TEnvSchema, true>
  ) {}
  @Get(":videoClassId")
  @HttpCode(200)
  async handle(@Param("videoClassId") videoClassId: string) {
    try {
      const videoClass =
        await this.getVideoClassByIdUseCase.execute(videoClassId);

      const hlsEncodingStatus =
        await this.bitmovinVideoEncodingService.getEncodingStatus(
          videoClass.hls_encoding_id
        );

      if (hlsEncodingStatus === "FINISHED") {
        videoClass.hls_encoding_url = formatSlugAzureEncodingManifestUrl(
          this.configService.get("AZURE_STORAGE_ACCOUNT_NAME"),
          this.configService.get(
            "AZURE_BLOB_STORAGE_BITMOVIN_OUTPUTS_CONTAINER_NAME"
          ),
          videoClass.video_url
        );
      } else {
        videoClass.hls_encoding_url = null;
      }

      return videoClass;
    } catch (error) {
      console.log("[INTERNAL ERROR]", error.message);
      throw new ConflictException({
        message: "An error occurred",
        error: error.message,
      });
    }
  }
}

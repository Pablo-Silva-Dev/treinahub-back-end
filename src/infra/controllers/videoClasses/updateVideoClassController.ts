import { BitmovinVideoEncodingService } from "@/infra/services/bitmovinVideoEncodingService";
import { ManageFileService } from "@/infra/services/manageFileService";
import { UpdateVideoClassUseCase } from "@/infra/useCases/videoClasses/updateVideoClassUseCase";
import { formatSlugFileName } from "@/utils/formatSlug";
import { getVideoDuration } from "@/utils/getVideoDuration";
import {
  BadRequestException,
  ConflictException,
  Controller,
  HttpCode,
  NotAcceptableException,
  Put,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AuthGuard } from "@nestjs/passport";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { TEnvSchema } from "env";
import { Request } from "express";
import * as multer from "multer";
import { z } from "zod";

const updateVideoClassSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  description: z.string().optional(),
  training_id: z.string(),
});
@Controller("/video-classes/update")
@UseGuards(AuthGuard("jwt-admin"))
@UseInterceptors(
  FileFieldsInterceptor([{ name: "video_file", maxCount: 1 }], {
    storage: multer.memoryStorage(),
  })
)
export class UpdateVideoClassController {
  constructor(
    private updateVideoClassUseCase: UpdateVideoClassUseCase,
    private manageFileService: ManageFileService,
    private configService: ConfigService<TEnvSchema, true>,
    private bitmovinVideoEncodingService: BitmovinVideoEncodingService
  ) {}

  @Put()
  @HttpCode(203)
  async handle(
    @UploadedFiles()
    files: {
      video_file: Express.Multer.File[];
    },
    @Req() req: Request
  ) {
    const { video_file } = files;

    if (!video_file || video_file.length === 0) {
      throw new ConflictException("Video and image files are required.");
    }

    const isBodyValidated = updateVideoClassSchema.safeParse(req.body);

    if (!isBodyValidated.success) {
      throw new BadRequestException({
        message: "The body format is invalid. Check the fields below:",
        errors: isBodyValidated.error.issues,
      });
    }

    try {
      const { name } = req.body;

      const videoFile = video_file[0];

      const videoFileExtension = videoFile.originalname.split(".")[1];

      const videoFileName = name + "-video." + videoFileExtension;

      const MAX_VIDEO_DURATION_IN_SECONDS = 15 * 60; // 15 minutes

      const videoClassDurationInSeconds = await getVideoDuration(
        videoFile.buffer
      );

      if (videoClassDurationInSeconds > MAX_VIDEO_DURATION_IN_SECONDS) {
        throw new NotAcceptableException(
          "Video duration can not be more than 15 minutes."
        );
      }

      const blobStorageVideoContainer = this.configService.get(
        "AZURE_BLOB_STORAGE_VIDEO_CLASSES_CONTAINER_NAME"
      );

      await this.manageFileService.removeAllExistingUploadedFiles(
        blobStorageVideoContainer
      );

      const uploadedVideo = await this.manageFileService.uploadFile(
        videoFile.buffer,
        videoFileName,
        blobStorageVideoContainer
      );

      const videoInputName = formatSlugFileName(uploadedVideo.split("/")[4]);
      const videoInputPath = req.body.name + "-video." + videoFileExtension;

      const hlsEncoding =
        await this.bitmovinVideoEncodingService.encodeHLSVideo(
          videoInputName,
          videoInputPath
        );

      const updatedVideoClass = await this.updateVideoClassUseCase.execute({
        ...req.body,
        duration: videoClassDurationInSeconds,
        video_url: uploadedVideo,
        hls_encoding_url: null,
        hls_encoding_id: hlsEncoding.id,
      });
      return updatedVideoClass;
    } catch (error) {
      console.log("[INTERNAL ERROR]", error.message);

      if (error instanceof NotAcceptableException) {
        throw error;
      }

      throw new ConflictException({
        message:
          "An error occurred. Check all request body fields for possible mismatching.",
        error: error.message,
      });
    }
  }
}

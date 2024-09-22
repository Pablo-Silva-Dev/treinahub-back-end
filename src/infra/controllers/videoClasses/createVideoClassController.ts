import { VideoClassesImplementation } from "@/infra/repositories/implementations/videoClassesImplementation";
import { BitmovinVideoEncodingService } from "@/infra/services/bitmovinVideoEncodingService";
import { ManageFileService } from "@/infra/services/manageFileService";
import { CreateVideoClassUseCase } from "@/infra/useCases/videoClasses/createVideoClassUseCase";
import { checkVideoAudio } from "@/utils/checkVideoAudio";
import { formatSlugFileName } from "@/utils/formatSlug";
import { getVideoDuration } from "@/utils/getVideoDuration";
import {
  ConflictException,
  Controller,
  HttpCode,
  NotAcceptableException,
  Post,
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

const createVideoClassValidationSchema = z.object({
  name: z.string(),
  description: z.string(),
  training_id: z.string(),
});

@Controller("/video-classes/create")
@UseGuards(AuthGuard("jwt-admin"))
@UseInterceptors(
  FileFieldsInterceptor([{ name: "video_file", maxCount: 1 }], {
    storage: multer.memoryStorage(),
  })
)
export class CreateVideoClassController {
  constructor(
    private createVideoClassUseCase: CreateVideoClassUseCase,
    private videoClassesImplementation: VideoClassesImplementation,
    private manageFileService: ManageFileService,
    private configService: ConfigService<TEnvSchema, true>,
    private bitmovinVideoEncodingService: BitmovinVideoEncodingService
  ) {}
  @Post()
  @HttpCode(201)
  async handle(
    @UploadedFiles()
    files: {
      video_file: Express.Multer.File[];
    },
    @Req() req: Request
  ) {
    const { video_file } = files;

    if (!video_file || video_file.length === 0) {
      throw new ConflictException("Video file is required.");
    }

    const isBodyValidated = createVideoClassValidationSchema.safeParse(
      req.body
    );
    if (!isBodyValidated.success) {
      throw new ConflictException({
        message: "An error occurred while creating video class",
        error: isBodyValidated.error.issues,
      });
    }

    try {
      const { name, training_id } = req.body;

      const videoClassByName =
        await this.videoClassesImplementation.getVideoClassByNameAndTrainingId(
          name,
          training_id
        );

      if (videoClassByName) {
        throw new ConflictException(
          `A video class with the name "${name}" already exists in the specified training.`
        );
      }

      const videoFile = video_file[0];

      const videoFileExtension = videoFile.originalname.split(".")[1];

      const formattedName = formatSlugFileName(name);

      const videoFileName = formattedName + "." + videoFileExtension;

      const MAX_VIDEO_DURATION_IN_SECONDS = 15 * 60; // 15 minutes

      const videoClassDurationInSeconds = await getVideoDuration(
        videoFile.buffer
      );

      const videoHasAudio = await checkVideoAudio(videoFile.buffer);

      if (videoClassDurationInSeconds > MAX_VIDEO_DURATION_IN_SECONDS) {
        throw new NotAcceptableException(
          "Video duration can not be more than 15 minutes."
        );
      }

      if (!videoHasAudio) {
        throw new NotAcceptableException("Video must have an audio.");
      }

      const blobStorageVideoContainerName = this.configService.get(
        "AZURE_BLOB_STORAGE_VIDEO_CLASSES_CONTAINER_NAME"
      );

      const uploadedVideo = await this.manageFileService.uploadFile(
        videoFile.buffer,
        videoFileName,
        blobStorageVideoContainerName
      );

      const videoInputName =
        formatSlugFileName(formattedName) + "." + videoFileExtension;
      const videoInputPath = formattedName + "." + videoFileExtension;

      const hlsEncoding =
        await this.bitmovinVideoEncodingService.encodeHLSVideo(
          videoInputName,
          videoInputPath
        );

      const createdVideoClass = await this.createVideoClassUseCase.execute({
        ...req.body,
        duration: videoClassDurationInSeconds,
        video_url: uploadedVideo,
        hls_encoding_url: null,
        hls_encoding_id: hlsEncoding.id,
      });

      return createdVideoClass;
    } catch (error) {
      console.log("[INTERNAL ERROR]", error.message);

      if (error instanceof NotAcceptableException) {
        throw error;
      }

      throw new ConflictException({
        message:
          "An error occurred. Check all request body fields for possible mismatching. Check if the video you are trying to upload is working correctly, and if it has audio.",
        error: error.message,
      });
    }
  }
}

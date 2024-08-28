import { BitmovinVideoEncodingService } from "@/infra/services/bitmovinVideoEncodingService";
import { ManageFileService } from "@/infra/services/manageFileService";
import { CreateVideoClassUseCase } from "@/infra/useCases/videoClasses/createVideoClassUseCase";
import { formatSlugFileName } from "@/utils/formatSlug";
import { getVideoDuration } from "@/utils/getVideoDuration";
import {
  ConflictException,
  Controller,
  HttpCode,
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
  FileFieldsInterceptor(
    [
      { name: "video_file", maxCount: 1 },
      { name: "img_file", maxCount: 1 },
    ],
    {
      storage: multer.memoryStorage(),
    }
  )
)
export class CreateVideoClassController {
  constructor(
    private createVideoClassUseCase: CreateVideoClassUseCase,
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
      img_file: Express.Multer.File[];
    },
    @Req() req: Request
  ) {
    const { img_file, video_file } = files;

    if (
      !video_file ||
      !img_file ||
      video_file.length === 0 ||
      img_file.length === 0
    ) {
      throw new ConflictException("Video and image files are required.");
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
      const { name } = req.body;

      const videoFile = video_file[0];
      const thumbnailFile = img_file[0];

      const videoFileExtension = videoFile.originalname.split(".")[1];
      const thumbnailFileExtension = thumbnailFile.originalname.split(".")[1];

      const videoFileName = name + "-video." + videoFileExtension;
      const thumbnailFileName = name + "-thumbnail." + thumbnailFileExtension;

      const blobStorageVideoContainerName = this.configService.get(
        "AZURE_BLOB_STORAGE_VIDEO_CLASSES_CONTAINER_NAME"
      );

      const blobStorageThumbnailContainerName = this.configService.get(
        "AZURE_BLOB_STORAGE_VIDEOS_THUMBNAILS_CONTAINER_NAME"
      );

      const uploadedVideo = await this.manageFileService.uploadFile(
        videoFile.buffer,
        videoFileName,
        blobStorageVideoContainerName
      );

      const uploadedThumbnail = await this.manageFileService.uploadFile(
        thumbnailFile.buffer,
        thumbnailFileName,
        blobStorageThumbnailContainerName
      );

      const videoClassDurationInSeconds = await getVideoDuration(
        videoFile.buffer
      );

      const videoInputName = formatSlugFileName(uploadedVideo.split("/")[4]);
      const videoInputPath = req.body.name + "-video." + videoFileExtension;

      const dashEncoding =
        await this.bitmovinVideoEncodingService.encodeDASHVideo(
          videoInputName,
          videoInputPath
        );

      const hlsEncoding =
        await this.bitmovinVideoEncodingService.encodeHLSVideo(
          videoInputName,
          videoInputPath
        );

      const createdVideoClass = await this.createVideoClassUseCase.execute({
        ...req.body,
        duration: videoClassDurationInSeconds,
        video_url: uploadedVideo,
        thumbnail_url: uploadedThumbnail,
        hls_encoding_url: null,
        dash_encoding_url: null,
        dash_encoding_id: dashEncoding.id,
        hls_encoding_id: hlsEncoding.id,
      });

      return createdVideoClass;
    } catch (error) {
      console.log("[INTERNAL ERROR]", error.message);
      throw new ConflictException({
        message:
          "An error occurred. Check all request body fields for possible mismatching. Check if the video you are trying to upload is working correctly, and if it has audio.",
        error: error.message,
      });
    }
  }
}

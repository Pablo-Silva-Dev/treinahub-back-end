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
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AuthGuard } from "@nestjs/passport";
import { FilesInterceptor } from "@nestjs/platform-express";
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
  FilesInterceptor("file", 2, {
    //upload the files on memory temporarily instead on hard disk
    storage: multer.memoryStorage(),
  })
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
  async handle(@Req() req: Request) {
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

      const files: Express.Multer.File[] = req.files as Express.Multer.File[];

      const videoFile = files.find(
        (file) => file.mimetype.substring(0, 5) !== "image"
      );
      const thumbnailFile = files.find(
        (file) => file.mimetype.substring(0, 5) === "image"
      );

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

      const createdVideoClass = await this.createVideoClassUseCase.execute({
        ...req.body,
        duration: videoClassDurationInSeconds,
        url: uploadedVideo,
        thumbnail_url: uploadedThumbnail,
      });

      const videInputName = formatSlugFileName(
        createdVideoClass.url.split("/")[4]
      );
      const videoInputPath = req.body.name + "-video." + videoFileExtension;

      if (createdVideoClass) {
        const dashEncoding =
          await this.bitmovinVideoEncodingService.encodeDASHVideo(
            videInputName,
            videoInputPath
          );

        const hlsEncoding =
          await this.bitmovinVideoEncodingService.encodeHLSVideo(
            videInputName,
            videoInputPath
          );
        return {
          video_class: createdVideoClass,
          hls_encoding: hlsEncoding,
          dash_encoding: dashEncoding,
        };
      }
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

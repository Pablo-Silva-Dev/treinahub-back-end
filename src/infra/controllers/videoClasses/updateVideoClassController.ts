import { PandaVideoService } from "@/infra/services/pandaVideoService";
import { UpdateVideoClassUseCase } from "@/infra/useCases/videoClasses/updateVideoClassUseCase";
import {
  BadRequestException,
  ConflictException,
  Controller,
  HttpCode,
  NotAcceptableException,
  Put,
  Req,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Request } from "express";
import { z } from "zod";

const updateVideoClassSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  description: z.string().optional(),
  training_id: z.string(),
});
@Controller("/video-classes/update")
@UseGuards(AuthGuard("jwt-admin"))
export class UpdateVideoClassController {
  constructor(
    private updateVideoClassUseCase: UpdateVideoClassUseCase,
    private pandaVideoService: PandaVideoService
  ) {}

  @Put()
  @HttpCode(203)
  async handle(@Req() req: Request) {
    const isBodyValidated = updateVideoClassSchema.safeParse(req.body);

    if (!isBodyValidated.success) {
      throw new BadRequestException({
        message: "The body format is invalid. Check the fields below:",
        errors: isBodyValidated.error.issues,
      });
    }

    try {
      const { name } = req.body;
      const { videos } = await this.pandaVideoService.listVideos();

      const video = videos.find((video) => video.title === name);
      const pandaVideo = await this.pandaVideoService.getVideo(video.id);
      const updatedVideoClass = await this.updateVideoClassUseCase.execute({
        ...req.body,
        status: pandaVideo.status,
        video_url: pandaVideo.video_player,
        thumbnail_url: pandaVideo.thumbnail,
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

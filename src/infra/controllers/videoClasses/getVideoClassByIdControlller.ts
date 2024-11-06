import { PandaVideoService } from "@/infra/services/pandaVideoService";
import { GetVideoClassByIdUseCase } from "@/infra/useCases/videoClasses/getVideoClassByIdUseCase";
import {
  ConflictException,
  Controller,
  Get,
  HttpCode,
  Param,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Controller("/video-classes/get-by-id")
@UseGuards(AuthGuard("jwt-user"))
export class GetVideoClassByIdController {
  constructor(
    private getVideoClassByIdUseCase: GetVideoClassByIdUseCase,
    private pandaVideoService: PandaVideoService
  ) {}
  @Get(":videoClassId")
  @HttpCode(200)
  async handle(@Param("videoClassId") videoClassId: string) {
    try {
      const videoClass =
        await this.getVideoClassByIdUseCase.execute(videoClassId);

      const { name } = videoClass;

      const { videos } = await this.pandaVideoService.listVideos();

      const video = videos.find(
        (video) => video.title.includes(name) || video.title === name
      );

      if (video) {
        const pandaVideo = await this.pandaVideoService.getVideo(video.id);
        const updatedVideoClass = {
          ...videoClass,
          status: pandaVideo.status,
          video_url: pandaVideo.video_player,
        };
        return updatedVideoClass;
      } else {
        return videoClass;
      }
    } catch (error) {
      console.log("[INTERNAL ERROR]", error.message);
      throw new ConflictException({
        message: "An error occurred",
        error: error.message,
      });
    }
  }
}

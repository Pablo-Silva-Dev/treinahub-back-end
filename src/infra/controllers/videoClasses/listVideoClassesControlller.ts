import { PandaVideoService } from "@/infra/services/pandaVideoService";
import { ListVideoClassesUseCase } from "@/infra/useCases/videoClasses/listVideoClassesUseCase";
import {
  ConflictException,
  Controller,
  Get,
  HttpCode,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Controller("/video-classes/list")
@UseGuards(AuthGuard("jwt-user"))
export class ListVideoClassesController {
  constructor(
    private listVideoClassesUseCase: ListVideoClassesUseCase,
    private pandaVideoService: PandaVideoService
  ) {}
  @Get()
  @HttpCode(200)
  async handle() {
    try {
      const videoClasses = await this.listVideoClassesUseCase.execute();

      const { videos: trainingVideos } =
        await this.pandaVideoService.listVideos();

      const updatedVideoClasses = videoClasses.map((videoClass) => {
        const videoData = trainingVideos.find(
          (video) => video.title === videoClass.name
        );
        if (videoData) {
          videoClass.video_url = videoData.video_player;
          videoClass.status = videoData.status;
        }
        return videoClass;
      });

      return updatedVideoClasses;
    } catch (error) {
      console.log("[INTERNAL ERROR]", error.message);
      throw new ConflictException({
        message: "An error occurred",
        error: error.message,
      });
    }
  }
}

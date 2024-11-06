import { PandaVideoService } from "@/infra/services/pandaVideoService";
import { DeleteVideoClassUseCase } from "@/infra/useCases/videoClasses/deleteVideoClassUseCase";
import {
  ConflictException,
  Controller,
  Delete,
  HttpCode,
  Param,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { GetVideoClassByIdUseCase } from "./../../useCases/videoClasses/getVideoClassByIdUseCase";

@Controller("video-classes/delete")
@UseGuards(AuthGuard("jwt-admin"))
export class DeleteVideoClassController {
  constructor(
    private deleteVideoClassUseCase: DeleteVideoClassUseCase,
    private getVideoClassByIdUseCase: GetVideoClassByIdUseCase,
    private pandaVideoService: PandaVideoService
  ) {}
  @Delete(":videoClassId")
  @HttpCode(200)
  async handle(@Param("videoClassId") videoClassId: string) {
    if (!videoClassId) {
      throw new ConflictException("videoClassId is required");
    }
    try {
      const videoClass =
        await this.getVideoClassByIdUseCase.execute(videoClassId);

      const { name } = videoClass;

      const { videos } = await this.pandaVideoService.listVideos();

      const pandaVideo = videos.find(
        (video) => video.title.includes(name) || video.title === name
      );

      if (pandaVideo) {
        let videosToDelete = [];
        videosToDelete.push(pandaVideo.id);

        await this.pandaVideoService.deleteVideo(videosToDelete);
      }

      await this.deleteVideoClassUseCase.execute(videoClassId);
    } catch (error) {
      console.log("[INTERNAL ERROR]", error.message);
      throw new ConflictException({
        message:
          "An error occurred. Check all request body fields for possible mismatching.",
        error: error.message,
      });
    }
  }
}

import { PandaVideoService } from "@/infra/services/pandaVideoService";
import { ListVideoClassesByTrainingUseCase } from "@/infra/useCases/videoClasses/listVideoClassesByTrainingUseCase";
import {
  ConflictException,
  Controller,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Controller("/video-classes/list-by-training")
@UseGuards(AuthGuard("jwt-user"))
export class ListVideoClassesByTrainingController {
  constructor(
    private listVideoClassesByTrainingUseCase: ListVideoClassesByTrainingUseCase,
    private pandaVideoService: PandaVideoService
  ) {}
  @Get(":trainingId")
  @HttpCode(200)
  async handle(@Param("trainingId") trainingId: string) {
    try {
      const videoClasses =
        await this.listVideoClassesByTrainingUseCase.execute(trainingId);

      const { folders } = await this.pandaVideoService.listFolders();

      const trainingFolder = folders.find((folder) =>
        folder.name.includes(trainingId)
      );

      if (!trainingFolder) {
        throw new NotFoundException("Training folder not found.");
      }

      const { videos: trainingVideos } =
        await this.pandaVideoService.listVideos(trainingFolder.id);

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
        message: "An error occurred.",
        error: error.message,
      });
    }
  }
}

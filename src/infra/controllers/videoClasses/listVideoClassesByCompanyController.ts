import { PandaVideoService } from "@/infra/services/pandaVideoService";
import { ListVideoClassesByCompanyUseCase } from "@/infra/useCases/videoClasses/listVideoClassesByCompanyUseCase";
import {
  ConflictException,
  Controller,
  Get,
  HttpCode,
  Param,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Controller("/video-classes/list-by-company")
@UseGuards(AuthGuard("jwt-user"))
export class ListVideoClassesByCompanyController {
  constructor(
    private listVideoClassesByCompanyUseCase: ListVideoClassesByCompanyUseCase,
    private pandaVideoService: PandaVideoService
  ) {}
  @Get(":companyId")
  @HttpCode(200)
  async handle(@Param("companyId") companyId: string) {
    try {
      const videoClasses =
        await this.listVideoClassesByCompanyUseCase.execute(companyId);

      let updatedVideoClasses;

      const pandaVideos =
        await this.pandaVideoService.listAllVideosByCompany(companyId);

      updatedVideoClasses = videoClasses.map((videoClass) => {
        const videoData = pandaVideos.find(
          (video) => video.title === videoClass.name
        );
        if (videoData) {
          videoClass.video_url = videoData.video_player;
          videoClass.status = videoData.status;
          videoClass.thumbnail_url = videoData.thumbnail;
          videoClass.storage_size = parseFloat(
            Number(videoData.storage_size / (1024 * 1024 * 1024)).toFixed(3) //CONVERTS BYTE TO GB
          ); //storage size in GB
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

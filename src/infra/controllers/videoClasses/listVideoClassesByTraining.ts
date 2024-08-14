import { ListVideoClassesByTrainingUseCase } from "@/infra/useCases/videoClasses/listVideoClassesByTrainingUseCase";
import {
  ConflictException,
  Controller,
  Get,
  HttpCode,
  Param,
} from "@nestjs/common";

@Controller("/video-classes/list-by-training")
export class ListVideoClassesByTrainingController {
  constructor(
    private listVideoClassesByTrainingUseCase: ListVideoClassesByTrainingUseCase
  ) {}
  @Get(":trainingId")
  @HttpCode(200)
  async handle(@Param("trainingId") trainingId: string) {
    try {
      const videoClasses =
        await this.listVideoClassesByTrainingUseCase.execute(trainingId);
      return videoClasses;
    } catch (error) {
      console.log("[INTERNAL ERROR]", error.message);
      throw new ConflictException({
        message: "An error occurred.",
        error: error.message,
      });
    }
  }
}
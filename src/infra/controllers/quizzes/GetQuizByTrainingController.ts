import { GetQuizByTrainingUseCase } from "@/infra/useCases/quizzes/getQuizByTrainingUseCase";
import {
  Controller,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Controller("/quizzes/get-by-training")
@UseGuards(AuthGuard("jwt-user"))
export class GetQuizByTrainingController {
  constructor(private getQuizByTrainingUseCase: GetQuizByTrainingUseCase) {}
  @HttpCode(200)
  @Get(":trainingId")
  async handle(@Param("trainingId") trainingId: string) {
    try {
      const quiz = await this.getQuizByTrainingUseCase.execute(trainingId);
      return quiz;
    } catch (error) {
      console.log("[INTERNAL ERROR]", error.message);
      throw new NotFoundException({
        message: "Quiz not found",
        error: error.message,
      });
    }
  }
}

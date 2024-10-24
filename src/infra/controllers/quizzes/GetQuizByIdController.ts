import { GetQuizByIdUseCase } from "@/infra/useCases/quizzes/getQuizByIdUseCase";
import {
  Controller,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Controller("/quizzes/get-by-id")
@UseGuards(AuthGuard("jwt-user"))
export class GetQuizByIdController {
  constructor(private getQuizByIdUseCase: GetQuizByIdUseCase) {}
  @HttpCode(200)
  @Get(":quizId")
  async handle(@Param("quizId") quizId: string) {
    try {
      const quiz = await this.getQuizByIdUseCase.execute(quizId);
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

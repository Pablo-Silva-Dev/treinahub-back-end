import { GetQuizQuestionByIdUseCase } from "@/infra/useCases/quizQuestions/getQuizQuestionByIdUseCase";
import {
  Controller,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Controller("/quizzes-questions/get-by-id")
@UseGuards(AuthGuard("jwt-user"))
export class GetQuizQuestionByIdController {
  constructor(private getQuizQuestionByIdUseCase: GetQuizQuestionByIdUseCase) {}
  @HttpCode(200)
  @Get(":quizQuestionId")
  async handle(@Param("quizQuestionId") quizQuestionId: string) {
    try {
      const quizQuestion =
        await this.getQuizQuestionByIdUseCase.execute(quizQuestionId);
      return quizQuestion;
    } catch (error) {
      console.log("[INTERNAL ERROR]", error.message);
      throw new NotFoundException({
        message: "QuizQuestion not found",
        error: error.message,
      });
    }
  }
}

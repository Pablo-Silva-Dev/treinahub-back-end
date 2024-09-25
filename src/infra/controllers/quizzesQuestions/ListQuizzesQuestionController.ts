import {
  ConflictException,
  Controller,
  Get,
  HttpCode,
  Param,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ListQuizzesQuestionsUseCase } from "../../useCases/quizQuestions/listQuizzesQuestionsUseCase";

@Controller("/quizzes-questions/list-by-quiz")
@UseGuards(AuthGuard("jwt-user"))
export class ListQuizQuestionsController {
  constructor(
    private listQuizzesQuestionsUseCase: ListQuizzesQuestionsUseCase
  ) {}
  @Get(":quizId")
  @HttpCode(200)
  async handle(@Param("quizId") quizId: string) {
    try {
      const quizzes = await this.listQuizzesQuestionsUseCase.execute(quizId);
      return quizzes;
    } catch (error) {
      console.log("[INTERNAL ERROR]", error.message);
      throw new ConflictException({
        message: "An error occurred.",
        error: error.message,
      });
    }
  }
}

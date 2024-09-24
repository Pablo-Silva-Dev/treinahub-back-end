import {
  ConflictException,
  Controller,
  Get,
  HttpCode,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ListQuizzesQuestionsUseCase } from "../../useCases/quizQuestions/listQuizzesQuestionsUseCase";

@Controller("/quizzes-questions/list")
@UseGuards(AuthGuard("jwt-user"))
export class ListQuizQuestionsController {
  constructor(
    private listQuizzesQuestionsUseCase: ListQuizzesQuestionsUseCase
  ) {}
  @Get()
  @HttpCode(200)
  async handle() {
    try {
      const quizzes = await this.listQuizzesQuestionsUseCase.execute();
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

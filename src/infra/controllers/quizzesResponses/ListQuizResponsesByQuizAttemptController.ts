import { ListQuizResponsesByAttemptIdUseCase } from "@/infra/useCases/quizResponses/listQuizResponsesByQuizAttemptUseCase";
import {
  ConflictException,
  Controller,
  Get,
  HttpCode,
  Param,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Controller("/quizzes-responses/list-by-quiz-attempt")
@UseGuards(AuthGuard("jwt-user"))
export class ListQuizResponsesByAttemptController {
  constructor(
    private listQuizResponsesByAttemptIdUseCase: ListQuizResponsesByAttemptIdUseCase
  ) {}

  @Get(":quizAttemptId")
  @HttpCode(200)
  async handle(@Param("quizAttemptId") quizAttemptId: string) {
    try {
      const quizResponses =
        await this.listQuizResponsesByAttemptIdUseCase.execute(quizAttemptId);
      return quizResponses;
    } catch (error) {
      console.error("[INTERNAL ERROR]", error.message);
      throw new ConflictException({
        message: "An error occurred while listing the quiz responses.",
        error: error.message,
      });
    }
  }
}

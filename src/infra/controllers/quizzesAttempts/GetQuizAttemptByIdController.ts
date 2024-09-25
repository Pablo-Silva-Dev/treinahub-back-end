import { GetQuizAttemptByIdUseCase } from "@/infra/useCases/quizAttempts/getQuizAttemptByIdUseCase";
import {
  ConflictException,
  Controller,
  Get,
  HttpCode,
  Param,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Controller("/quizzes-attempts/get-by-id")
@UseGuards(AuthGuard("jwt-user"))
export class GetQuizAttemptByIdController {
  constructor(private getQuizAttemptByIdUseCase: GetQuizAttemptByIdUseCase) {}

  @Get(":quizAttemptId")
  @HttpCode(200)
  async handle(@Param("quizAttemptId") quizAttemptId: string) {
    try {
      const quizAttempt =
        await this.getQuizAttemptByIdUseCase.execute(quizAttemptId);
      return quizAttempt;
    } catch (error) {
      console.error("[INTERNAL ERROR]", error.message);
      throw new ConflictException({
        message: "An error occurred while fetching the quiz attempt.",
        error: error.message,
      });
    }
  }
}

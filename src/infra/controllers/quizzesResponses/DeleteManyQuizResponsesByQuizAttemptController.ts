import { DeleteManyQuizResponsesByQuizAttemptUseCase } from "@/infra/useCases/quizResponses/deleteManyQuizResponsesByQuizAttemptUseCase";
import {
  BadRequestException,
  ConflictException,
  Controller,
  Delete,
  HttpCode,
  Param,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Controller("/quizzes-response/delete-many-by-quiz-attempt")
@UseGuards(AuthGuard("jwt-user"))
export class DeleteManyQuizResponsesByQuizAttemptController {
  constructor(
    private deleteManyQuizResponsesByQuizAttemptUseCase: DeleteManyQuizResponsesByQuizAttemptUseCase
  ) {}
  @Delete(":quizAttemptId")
  @HttpCode(204)
  async handle(@Param("quizAttemptId") quizAttemptId: string) {
    if (!quizAttemptId) {
      throw new BadRequestException("quizAttemptId is required");
    }
    try {
      await this.deleteManyQuizResponsesByQuizAttemptUseCase.execute(
        quizAttemptId
      );
    } catch (error) {
      console.log("[INTERNAL ERROR]", error.message);
      throw new ConflictException({
        message:
          "An error occurred. Check all request body fields for possible mismatching.",
        error: error.message,
      });
    }
  }
}

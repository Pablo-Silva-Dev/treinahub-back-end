import { DeleteQuizAttemptUseCase } from "@/infra/useCases/quizAttempts/deleteQuizAttemptUseCase";
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

@Controller("/quizzes-attempts/delete")
@UseGuards(AuthGuard("jwt-user"))
export class DeleteQuizAttemptController {
  constructor(private deleteQuizAttemptUseCase: DeleteQuizAttemptUseCase) {}
  @Delete(":quizAttemptId")
  @HttpCode(204)
  async handle(@Param("quizAttemptId") quizAttemptId: string) {
    if (!quizAttemptId) {
      throw new BadRequestException("quizAttemptId is required");
    }
    try {
      await this.deleteQuizAttemptUseCase.execute(quizAttemptId);
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

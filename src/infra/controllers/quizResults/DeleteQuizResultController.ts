import { DeleteQuizResultUseCase } from "@/infra/useCases/quizResults/deleteQuizResultUseCase";
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

@Controller("/quizzes-results/delete")
@UseGuards(AuthGuard("jwt-user"))
export class DeleteQuizResultController {
  constructor(private deleteQuizResultUseCase: DeleteQuizResultUseCase) {}
  @Delete(":quizResultId")
  @HttpCode(204)
  async handle(@Param("quizResultId") quizResultId: string) {
    if (!quizResultId) {
      throw new BadRequestException("quizResultId is required");
    }
    try {
      await this.deleteQuizResultUseCase.execute(quizResultId);
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

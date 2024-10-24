import {
  ConflictException,
  Controller,
  Delete,
  Param,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { DeleteQuizQuestionUseCase } from "../../useCases/quizQuestions/deleteQuizQuestionUseCase";

@Controller("/quizzes-questions/delete")
@UseGuards(AuthGuard("jwt-admin"))
export class DeleteQuizQuestionController {
  constructor(private deleteQuizQuestionUseCase: DeleteQuizQuestionUseCase) {}
  @Delete(":quizQuestionId")
  async handle(@Param("quizQuestionId") questionId: string) {
    try {
      await this.deleteQuizQuestionUseCase.execute(questionId);
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

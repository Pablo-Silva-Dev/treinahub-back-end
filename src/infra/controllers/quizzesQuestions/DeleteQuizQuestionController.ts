import { ConflictException, Controller, Delete, Param } from "@nestjs/common";
import { DeleteQuizQuestionUseCase } from "../../useCases/quizQuestions/deleteQuizQuestionUseCase";

@Controller("/quizzes-questions/delete")
export class DeleteQuizQuestionController {
  constructor(private deleteQuizQuestionUseCase: DeleteQuizQuestionUseCase) {}
  @Delete(":quizQuestionId")
  async handle(@Param("quizQuestionId") quizId: string) {
    try {
      await this.deleteQuizQuestionUseCase.execute(quizId);
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

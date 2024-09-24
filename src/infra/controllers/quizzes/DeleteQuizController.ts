import { ConflictException, Controller, Delete, Param } from "@nestjs/common";
import { DeleteQuizUseCase } from "../../useCases/quizzes/deleteQuizUseCase";

@Controller("/quizzes/delete")
export class DeleteQuizController {
  constructor(private deleteQuizUseCase: DeleteQuizUseCase) {}
  @Delete(":quizId")
  async handle(@Param("quizId") quizId: string) {
    try {
      await this.deleteQuizUseCase.execute(quizId);
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

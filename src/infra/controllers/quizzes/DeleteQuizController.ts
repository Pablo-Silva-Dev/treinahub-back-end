import {
  ConflictException,
  Controller,
  Delete,
  Param,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { DeleteQuizUseCase } from "../../useCases/quizzes/deleteQuizUseCase";

@Controller("/quizzes/delete")
@UseGuards(AuthGuard("jwt-admin"))
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

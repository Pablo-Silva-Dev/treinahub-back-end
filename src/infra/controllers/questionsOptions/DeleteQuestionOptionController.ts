import {
  ConflictException,
  Controller,
  Delete,
  Param,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { DeleteQuestionOptionUseCase } from "../../useCases/questionOptions/deleteQuestionOptionUseCase";

@Controller("/question-options/delete")
@UseGuards(AuthGuard("jwt-admin"))
export class DeleteQuestionOptionController {
  constructor(
    private deleteQuestionOptionUseCase: DeleteQuestionOptionUseCase
  ) {}
  @Delete(":questionOptionId")
  async handle(@Param("questionOptionId") optionId: string) {
    try {
      await this.deleteQuestionOptionUseCase.execute(optionId);
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

import { ListQuestionOptionsUseCase } from "@/infra/useCases/questionOptions/listQuestionOptionsUseCase";
import {
  ConflictException,
  Controller,
  Get,
  HttpCode,
  Param,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Controller("/question-options/list-by-quiz-question")
@UseGuards(AuthGuard("jwt-admin"))
export class ListQuestionOptionsController {
  constructor(private listQuestionOptionsUseCase: ListQuestionOptionsUseCase) {}
  @Get(":questionId")
  @HttpCode(200)
  async handle(@Param("questionId") questionId: string) {
    try {
      const questionOptions =
        await this.listQuestionOptionsUseCase.execute(questionId);
      return questionOptions;
    } catch (error) {
      console.log("[INTERNAL ERROR]", error.message);
      throw new ConflictException({
        message: "An error occurred.",
        error: error.message,
      });
    }
  }
}

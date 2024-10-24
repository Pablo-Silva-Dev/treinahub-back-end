import { GetQuestionOptionByIdUseCase } from "@/infra/useCases/questionOptions/getQuestionOptionByIdUseCase";
import {
  Controller,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Controller("/question-options/get-by-id")
@UseGuards(AuthGuard("jwt-user"))
export class GetQuestionOptionByIdController {
  constructor(
    private getQuestionOptionByIdUseCase: GetQuestionOptionByIdUseCase
  ) {}
  @HttpCode(200)
  @Get(":questionOptionId")
  async handle(@Param("questionOptionId") questionOptionId: string) {
    try {
      const questionOption =
        await this.getQuestionOptionByIdUseCase.execute(questionOptionId);
      return questionOption;
    } catch (error) {
      console.log("[INTERNAL ERROR]", error.message);
      throw new NotFoundException({
        message: "QuestionOption not found",
        error: error.message,
      });
    }
  }
}

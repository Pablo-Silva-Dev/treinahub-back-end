import { IExplainQuestionDTO } from "@/infra/dtos/QuestionDTO";
import { ExplainQuestionUseCase } from "@/infra/useCases/quizQuestions/explainQuestionUseCase";
import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
} from "@nestjs/common";

@Controller("/quizzes-questions/explain-question")
export class ExplainQuestionController {
  constructor(private explainQuestionUseCase: ExplainQuestionUseCase) {}
  @Post()
  @HttpCode(200)
  async handle(@Body() body: IExplainQuestionDTO) {
    {
      const { question, selectedOptionContent, correctOptionContent } = body;
      try {
        const response = await this.explainQuestionUseCase.execute({
          question,
          selectedOptionContent,
          correctOptionContent,
        });
        return response;
      } catch (error) {
        console.log("[INTERNAL ERROR]", error.message);
        throw new ConflictException({
          message: "There as an error at trying to explain the question.",
          error: error.message,
        });
      }
    }
  }
}

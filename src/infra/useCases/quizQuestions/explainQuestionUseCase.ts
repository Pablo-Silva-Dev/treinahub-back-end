import { IExplainQuestionDTO } from "@/infra/dtos/QuestionDTO";
import { OpenAiService } from "./../../services/openAiService";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ExplainQuestionUseCase {
  constructor(private openAiService: OpenAiService) {}
  async execute(data: IExplainQuestionDTO) {
    const explanation = await this.openAiService.explainQuestion(data);
    return explanation;
  }
}

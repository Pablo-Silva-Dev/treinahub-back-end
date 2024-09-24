import { QuestionsOptionsImplementation } from "@/infra/repositories/implementations/questionsOptionsImplementation";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ListQuestionOptionsUseCase {
  constructor(
    private questionsOptionsImplementation: QuestionsOptionsImplementation
  ) {}
  async execute(quizQuestionId: string) {
    const options =
      await this.questionsOptionsImplementation.listQuestionOptions(
        quizQuestionId
      );
    return options;
  }
}

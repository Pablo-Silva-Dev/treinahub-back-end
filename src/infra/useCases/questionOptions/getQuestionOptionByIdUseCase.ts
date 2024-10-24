import { QuestionsOptionsImplementation } from "@/infra/repositories/implementations/questionsOptionsImplementation";
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class GetQuestionOptionByIdUseCase {
  constructor(
    private questionsOptionsImplementation: QuestionsOptionsImplementation
  ) {}
  async execute(id: string) {
    const quizQuestion =
      await this.questionsOptionsImplementation.getQuestionOptionById(id);
    if (!quizQuestion) {
      throw new NotFoundException("Quiz question not found");
    }
    return quizQuestion;
  }
}

import { Injectable, NotFoundException } from "@nestjs/common";
import { QuestionsOptionsImplementation } from "../../repositories/implementations/questionsOptionsImplementation";

@Injectable()
export class DeleteQuestionOptionUseCase {
  constructor(
    private questionsOptionsImplementation: QuestionsOptionsImplementation
  ) {}
  async execute(quizQuestionId: string) {
    const quizQuestion =
      await this.questionsOptionsImplementation.getQuestionOptionById(
        quizQuestionId
      );
    if (!quizQuestion) {
      throw new NotFoundException("Option not found");
    }
    await this.questionsOptionsImplementation.deleteQuestionOption(
      quizQuestionId
    );
  }
}

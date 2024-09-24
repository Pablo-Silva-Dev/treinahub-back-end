import { Injectable, NotFoundException } from "@nestjs/common";
import { QuizQuestionsImplementation } from "./../../repositories/implementations/quizQuestionsImplementation";

@Injectable()
export class DeleteQuizQuestionUseCase {
  constructor(
    private quizQuestionsImplementation: QuizQuestionsImplementation
  ) {}
  async execute(quizQuestionId: string) {
    const quizQuestion =
      await this.quizQuestionsImplementation.getQuizQuestionById(
        quizQuestionId
      );
    if (!quizQuestion) {
      throw new NotFoundException("Quiz question not found");
    }
    await this.quizQuestionsImplementation.deleteQuizQuestion(quizQuestionId);
  }
}

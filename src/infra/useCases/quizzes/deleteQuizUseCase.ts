import { Injectable, NotFoundException } from "@nestjs/common";
import { QuizzesImplementation } from "./../../repositories/implementations/quizzesImplementation";

@Injectable()
export class DeleteQuizUseCase {
  constructor(private quizzesImplementation: QuizzesImplementation) {}
  async execute(quizId: string) {
    const quiz = await this.quizzesImplementation.getQuizById(quizId);
    if (!quiz) {
      throw new NotFoundException("Quiz not found");
    }
    await this.quizzesImplementation.deleteQuiz(quizId);
  }
}

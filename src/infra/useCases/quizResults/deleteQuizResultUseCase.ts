import { QuizResultsImplementation } from "@/infra/repositories/implementations/quizResultsImplementation";
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class DeleteQuizResultUseCase {
  constructor(private quizResultsImplementation: QuizResultsImplementation) {}
  async execute(quizResultId: string) {
    const quizResult =
      await this.quizResultsImplementation.getQuizResultById(quizResultId);
    if (!quizResult) {
      throw new NotFoundException("Quiz result not found.");
    }
    await this.quizResultsImplementation.deleteQuizResult(quizResultId);
  }
}

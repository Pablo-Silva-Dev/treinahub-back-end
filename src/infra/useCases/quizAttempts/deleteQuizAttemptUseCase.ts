import { QuizAttemptsImplementation } from "@/infra/repositories/implementations/quizAttemptImplementation";
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class DeleteQuizAttemptUseCase {
  constructor(private quizAttemptsImplementation: QuizAttemptsImplementation) {}
  async execute(quizAttemptId: string) {
    const quizAttempt =
      await this.quizAttemptsImplementation.getQuizAttemptById(quizAttemptId);
    if (!quizAttempt) {
      throw new NotFoundException("Quiz attempt not found.");
    }
    await this.quizAttemptsImplementation.deleteQuizAttempt(quizAttemptId);
  }
}

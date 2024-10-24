import { QuizAttemptsImplementation } from "@/infra/repositories/implementations/quizAttemptImplementation";
import { QuizResponsesImplementation } from "@/infra/repositories/implementations/quizResponsesImplementation";
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class DeleteManyQuizResponsesByQuizAttemptUseCase {
  constructor(
    private quizResponsesImplementation: QuizResponsesImplementation,
    private quizAttemptsImplementation: QuizAttemptsImplementation
  ) {}
  async execute(quizAttemptId: string) {
    const quizAttempt =
      await this.quizAttemptsImplementation.getQuizAttemptById(quizAttemptId);
    if (!quizAttempt) {
      throw new NotFoundException("Quiz attempt not found.");
    }

    await this.quizResponsesImplementation.deleteManyQuizzesResponsesByQuizAttempt(
      quizAttemptId
    );
  }
}

import { QuizAttemptsImplementation } from "@/infra/repositories/implementations/quizAttemptImplementation";
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class GetQuizAttemptByIdUseCase {
  constructor(private quizAttemptRepository: QuizAttemptsImplementation) {}

  async execute(quizAttemptId: string) {
    const quizAttempt =
      await this.quizAttemptRepository.getQuizAttemptById(quizAttemptId);

    if (!quizAttempt) {
      throw new NotFoundException("Quiz attempt not found");
    }

    return quizAttempt;
  }
}

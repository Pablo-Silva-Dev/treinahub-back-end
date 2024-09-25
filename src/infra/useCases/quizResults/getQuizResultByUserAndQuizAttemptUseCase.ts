import { IGetQuizResultDTO } from "@/infra/dtos/QuizResultDTO";
import { QuizAttemptsImplementation } from "@/infra/repositories/implementations/quizAttemptImplementation";
import { QuizResultsImplementation } from "@/infra/repositories/implementations/quizResultsImplementation";
import { UsersImplementation } from "@/infra/repositories/implementations/usersImplementation";
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class getQuizResultByUserAndQuizAttemptUseCase {
  constructor(
    private usersImplementation: UsersImplementation,
    private quizAttemptImplementation: QuizAttemptsImplementation,
    private quizResultsImplementation: QuizResultsImplementation
  ) {}
  async execute(data: IGetQuizResultDTO) {
    const { quiz_attempt_id, user_id } = data;

    const user = await this.usersImplementation.getUserById(user_id);

    if (!user) {
      throw new NotFoundException("User not found");
    }

    const quizAttempt =
      await this.quizAttemptImplementation.getQuizAttemptById(quiz_attempt_id);

    if (!quizAttempt) {
      throw new NotFoundException("Quiz attempt not found");
    }

    const quizResult =
      await this.quizResultsImplementation.getQuizResultByUserAndAttempt(data);
    return quizResult;
  }
}

import {
  ICreateQuizResultDTO,
  IQuizResultDTO,
} from "@/infra/dtos/QuizResultDTO";
import { QuizAttemptsImplementation } from "@/infra/repositories/implementations/quizAttemptImplementation";
import { QuizzesImplementation } from "@/infra/repositories/implementations/quizzesImplementation";
import { UsersImplementation } from "@/infra/repositories/implementations/usersImplementation";
import { Injectable, NotFoundException } from "@nestjs/common";
import { QuizResultsImplementation } from "./../../repositories/implementations/quizResultsImplementation";

@Injectable()
export class CreateQuizResultUseCase {
  constructor(
    private usersImplementation: UsersImplementation,
    private quizzesImplementation: QuizzesImplementation,
    private quizAttemptImplementation: QuizAttemptsImplementation,
    private quizResultsImplementation: QuizResultsImplementation
  ) {}

  async execute(data: ICreateQuizResultDTO): Promise<IQuizResultDTO> {
    const { user_id, quiz_id, quiz_attempt_id } = data;

    const user = await this.usersImplementation.getUserById(user_id);

    if (!user) {
      throw new NotFoundException("User not found");
    }

    const quiz = await this.quizzesImplementation.getQuizById(quiz_id);

    if (!quiz) {
      throw new NotFoundException("Quiz not found");
    }

    const quizAttempt =
      await this.quizAttemptImplementation.getQuizAttemptById(quiz_attempt_id);

    if (!quizAttempt) {
      throw new NotFoundException("Quiz attempt not found");
    }

    const newQuizResult =
      await this.quizResultsImplementation.createQuizResult(data);

    return newQuizResult;
  }
}

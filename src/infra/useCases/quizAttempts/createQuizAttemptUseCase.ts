import { ICreateQuizAttemptDTO } from "@/infra/dtos/QuizAttemptDTO";
import { QuizAttemptRepositoryImplementation } from "@/infra/repositories/implementations/quizAttemptImplementation";
import { QuizzesImplementation } from "@/infra/repositories/implementations/quizzesImplementation";

import { UsersImplementation } from "@/infra/repositories/implementations/usersImplementation";
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class CreateQuizAttemptUseCase {
  constructor(
    private quizAttemptRepository: QuizAttemptRepositoryImplementation,
    private quizzesImplementation: QuizzesImplementation,
    private usersImplementation: UsersImplementation
  ) {}

  async execute(data: ICreateQuizAttemptDTO) {
    const { quiz_id, user_id } = data;

    const quiz = await this.quizzesImplementation.getQuizById(quiz_id);
    if (!quiz) {
      throw new NotFoundException("Quiz not found");
    }

    const user = await this.usersImplementation.getUserById(user_id);
    if (!user) {
      throw new NotFoundException("User not found");
    }

    const newQuizAttempt =
      await this.quizAttemptRepository.createQuizAttempt(data);

    return newQuizAttempt;
  }
}

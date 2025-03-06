import { IListQuizAttemptsByUserAndQuizDTO } from "@/infra/dtos/QuizAttemptDTO";
import { QuizAttemptsImplementation } from "@/infra/repositories/implementations/quizAttemptImplementation";
import { QuizzesImplementation } from "@/infra/repositories/implementations/quizzesImplementation";
import { UsersImplementation } from "@/infra/repositories/implementations/usersImplementation";
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class ListQuizAttemptsByUserAndQuizUseCase {
  constructor(
    private quizAttemptRepository: QuizAttemptsImplementation,
    private usersImplementation: UsersImplementation,
    private quizImplementation: QuizzesImplementation
  ) {}

  async execute(data: IListQuizAttemptsByUserAndQuizDTO) {
    const user = await this.usersImplementation.getUserById(data.user_id);

    if (!user) {
      throw new NotFoundException("User not found");
    }

    const quiz = await this.quizImplementation.getQuizById(data.quiz_id);

    if (!quiz) {
      throw new NotFoundException("Quiz not found");
    }

    const quizAttempts =
      await this.quizAttemptRepository.listQuizAttemptsByUserAndQuiz(data);

    return quizAttempts;
  }
}

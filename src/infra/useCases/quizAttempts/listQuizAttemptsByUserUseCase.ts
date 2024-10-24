import { QuizAttemptsImplementation } from "@/infra/repositories/implementations/quizAttemptImplementation";
import { UsersImplementation } from "@/infra/repositories/implementations/usersImplementation";
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class ListQuizAttemptsByUserUseCase {
  constructor(
    private quizAttemptRepository: QuizAttemptsImplementation,
    private usersImplementation: UsersImplementation
  ) {}

  async execute(userId: string) {
    const user = await this.usersImplementation.getUserById(userId);

    if (!user) {
      throw new NotFoundException("User not found");
    }

    const quizAttempts =
      await this.quizAttemptRepository.listQuizAttemptsByUser(userId);

    return quizAttempts;
  }
}

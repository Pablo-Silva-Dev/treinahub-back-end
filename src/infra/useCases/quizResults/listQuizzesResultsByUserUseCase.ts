import { QuizResultsImplementation } from "@/infra/repositories/implementations/quizResultsImplementation";
import { UsersImplementation } from "@/infra/repositories/implementations/usersImplementation";
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class ListQuizzesResultsByUserUseCase {
  constructor(
    private quizzesResultsImplementation: QuizResultsImplementation,
    private usersImplementation: UsersImplementation
  ) {}
  async execute(userId) {
    const user = await this.usersImplementation.getUserById(userId);

    if (!user) {
      throw new NotFoundException("User not found");
    }

    const quizzesResults =
      await this.quizzesResultsImplementation.listQuizzesResultsByUser(userId);
    return quizzesResults;
  }
}

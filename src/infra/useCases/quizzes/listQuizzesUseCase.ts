import { Injectable } from "@nestjs/common";
import { QuizzesImplementation } from "./../../repositories/implementations/quizzesImplementation";

@Injectable()
export class ListQuizzesUseCase {
  constructor(private quizzesImplementation: QuizzesImplementation) {}
  async execute() {
    const quizzes = await this.quizzesImplementation.listQuizzes();
    return quizzes;
  }
}

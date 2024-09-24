import { QuizQuestionsImplementation } from "@/infra/repositories/implementations/quizQuestionsImplementation";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ListQuizzesQuestionsUseCase {
  constructor(
    private quizzesQuestionsImplementation: QuizQuestionsImplementation
  ) {}
  async execute() {
    const quizzes =
      await this.quizzesQuestionsImplementation.listQuizQuestions();
    return quizzes;
  }
}

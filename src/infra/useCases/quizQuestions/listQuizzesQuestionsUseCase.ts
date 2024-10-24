import { QuizQuestionsImplementation } from "@/infra/repositories/implementations/quizQuestionsImplementation";
import { QuizzesImplementation } from "@/infra/repositories/implementations/quizzesImplementation";
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class ListQuizzesQuestionsUseCase {
  constructor(
    private quizzesQuestionsImplementation: QuizQuestionsImplementation,
    private quizzesImplementation: QuizzesImplementation
  ) {}
  async execute(quizId: string) {
    const quiz = await this.quizzesImplementation.getQuizById(quizId);
    if (!quiz) {
      throw new NotFoundException("Quiz not found");
    }
    const quizzesQuestions =
      await this.quizzesQuestionsImplementation.listQuizQuestionsByQuiz(quizId);
    return quizzesQuestions;
  }
}

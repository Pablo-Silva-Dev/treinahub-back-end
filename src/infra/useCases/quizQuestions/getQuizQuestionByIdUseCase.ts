import { QuizQuestionsImplementation } from "@/infra/repositories/implementations/quizQuestionsImplementation";
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class GetQuizQuestionByIdUseCase {
  constructor(
    private quizQuestionsImplementation: QuizQuestionsImplementation
  ) {}
  async execute(id: string) {
    const quizQuestion =
      await this.quizQuestionsImplementation.getQuizQuestionById(id);
    if (!quizQuestion) {
      throw new NotFoundException("Quiz question not found");
    }
    return quizQuestion;
  }
}

import { IUpdateQuizQuestionDTO } from "@/infra/dtos/QuestionDTO";
import { Injectable, NotFoundException } from "@nestjs/common";
import { QuizQuestionsImplementation } from "./../../repositories/implementations/quizQuestionsImplementation";
@Injectable()
export class UpdateQuizQuestionUseCase {
  constructor(
    private quizQuestionsImplementation: QuizQuestionsImplementation
  ) {}
  async execute(data: IUpdateQuizQuestionDTO) {
    const { id } = data;
    const quizQuestion =
      await this.quizQuestionsImplementation.getQuizQuestionById(id);
    if (!quizQuestion) {
      throw new NotFoundException("Quiz question not found");
    }
    const updatedQuizQuestion =
      await this.quizQuestionsImplementation.updateQuizQuestion(data);
    return updatedQuizQuestion;
  }
}

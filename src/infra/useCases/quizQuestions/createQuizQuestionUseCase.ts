import { ICreateQuizQuestionDTO } from "@/infra/dtos/QuestionDTO";
import { QuizzesImplementation } from "@/infra/repositories/implementations/quizzesImplementation";
import { Injectable, NotFoundException } from "@nestjs/common";
import { QuizQuestionsImplementation } from "./../../repositories/implementations/quizQuestionsImplementation";

@Injectable()
export class CreateQuizQuestionUseCase {
  constructor(
    private quizQuestionsImplementation: QuizQuestionsImplementation,
    private quizImplementation: QuizzesImplementation
  ) {}
  async execute(data: ICreateQuizQuestionDTO) {
    const { quiz_id } = data;
    const quiz = await this.quizImplementation.getQuizById(quiz_id);
    if (!quiz) {
      throw new NotFoundException("Quiz not found");
    }
    const newQuizQuestion =
      await this.quizQuestionsImplementation.createQuizQuestion(data);
    return newQuizQuestion;
  }
}

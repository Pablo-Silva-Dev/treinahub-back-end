import { ICreateQuestionOptionDTO } from "@/infra/dtos/QuestionOptionDTO";
import { QuestionsOptionsImplementation } from "@/infra/repositories/implementations/questionsOptionsImplementation";
import { QuizQuestionsImplementation } from "@/infra/repositories/implementations/quizQuestionsImplementation";
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class CreateQuestionOptionUseCase {
  constructor(
    private questionOptionsImplementation: QuestionsOptionsImplementation,
    private quizQuestionImplementation: QuizQuestionsImplementation
  ) {}
  async execute(data: ICreateQuestionOptionDTO) {
    const { question_id } = data;
    const question =
      await this.quizQuestionImplementation.getQuizQuestionById(question_id);
    if (!question) {
      throw new NotFoundException("Question not found");
    }

    const newQuestionOption =
      await this.questionOptionsImplementation.createQuestionOption(data);
    return newQuestionOption;
  }
}

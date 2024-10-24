import { QuestionsOptionsImplementation } from "@/infra/repositories/implementations/questionsOptionsImplementation";
import { QuizQuestionsImplementation } from "@/infra/repositories/implementations/quizQuestionsImplementation";
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class ListQuestionOptionsUseCase {
  constructor(
    private questionsOptionsImplementation: QuestionsOptionsImplementation,
    private quizQuestionsImplementation: QuizQuestionsImplementation
  ) {}
  async execute(quizQuestionId: string) {
    const quizQuestion =
      await this.quizQuestionsImplementation.getQuizQuestionById(
        quizQuestionId
      );

    if (!quizQuestion) {
      throw new NotFoundException("Quiz question not found");
    }

    const options =
      await this.questionsOptionsImplementation.listQuestionOptions(
        quizQuestionId
      );
    return options;
  }
}

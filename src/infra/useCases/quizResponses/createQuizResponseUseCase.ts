import {
  ICreateQuizResponseDTO,
  IQuizResponseDTO,
} from "@/infra/dtos/QuizResponseDTO";
import { QuestionsOptionsImplementation } from "@/infra/repositories/implementations/questionsOptionsImplementation";
import { QuizAttemptsImplementation } from "@/infra/repositories/implementations/quizAttemptImplementation";
import { QuizQuestionsImplementation } from "@/infra/repositories/implementations/quizQuestionsImplementation";
import { QuizResponsesImplementation } from "@/infra/repositories/implementations/quizResponsesImplementation";
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class CreateQuizResponseUseCase {
  constructor(
    private quizResponseImplementation: QuizResponsesImplementation,
    private questionsOptionsImplementation: QuestionsOptionsImplementation,
    private quizQuestionsImplementation: QuizQuestionsImplementation,
    private quizAttemptImplementation: QuizAttemptsImplementation
  ) {}

  async execute(data: ICreateQuizResponseDTO): Promise<IQuizResponseDTO> {
    const { selected_option_id, question_id, quiz_attempt_id } = data;

    const option =
      await this.questionsOptionsImplementation.getQuestionOptionById(
        selected_option_id
      );

    if (!option) {
      throw new NotFoundException("Option not found");
    }

    const quizQuestion =
      await this.quizQuestionsImplementation.getQuizQuestionById(question_id);

    if (!quizQuestion) {
      throw new NotFoundException("Quiz question not found");
    }

    const quizAttempt =
      await this.quizAttemptImplementation.getQuizAttemptById(quiz_attempt_id);

    if (!quizAttempt) {
      throw new NotFoundException("Quiz attempt not found");
    }

    const newQuizResponse =
      await this.quizResponseImplementation.createQuizResponse(data);

    return newQuizResponse;
  }
}

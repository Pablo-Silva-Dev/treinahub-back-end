import { IQuizResponseDTO } from "@/infra/dtos/QuizResponseDTO";
import { QuizResponsesImplementation } from "@/infra/repositories/implementations/quizResponsesImplementation";
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class ListQuizResponsesByAttemptIdUseCase {
  constructor(
    private quizResponseImplementation: QuizResponsesImplementation
  ) {}

  async execute(quizAttemptId: string): Promise<IQuizResponseDTO[]> {
    const quizResponses =
      await this.quizResponseImplementation.listQuizResponsesByQuizAttempt(
        quizAttemptId
      );

    if (!quizResponses) {
      throw new NotFoundException("Quiz attempt not found");
    }

    return quizResponses;
  }
}

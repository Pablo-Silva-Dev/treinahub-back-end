import { IQuizResponseDTO } from "@/infra/dtos/QuizResponseDTO";
import { QuizResponsesImplementation } from "@/infra/repositories/implementations/quizResponsesImplementation";
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class GetQuizResponseByIdUseCase {
  constructor(
    private quizResponseImplementation: QuizResponsesImplementation
  ) {}

  async execute(quizResponseId: string): Promise<IQuizResponseDTO | void> {
    const quizResponse =
      await this.quizResponseImplementation.getQuizResponseById(quizResponseId);

    if (!quizResponse) {
      throw new NotFoundException("Quiz response not found");
    }

    return quizResponse;
  }
}

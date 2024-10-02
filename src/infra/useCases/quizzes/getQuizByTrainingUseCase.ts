import { QuizzesImplementation } from "@/infra/repositories/implementations/quizzesImplementation";
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class GetQuizByTrainingUseCase {
  constructor(private quizzesImplementation: QuizzesImplementation) {}
  async execute(id: string) {
    const quiz = await this.quizzesImplementation.getQuizByTraining(id);
    if (!quiz) {
      throw new NotFoundException("Quiz not found for the provided training");
    }
    return quiz;
  }
}

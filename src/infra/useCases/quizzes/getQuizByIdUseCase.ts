import { QuizzesImplementation } from "@/infra/repositories/implementations/quizzesImplementation";
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class GetQuizByIdUseCase {
  constructor(private quizzesImplementation: QuizzesImplementation) {}
  async execute(id: string) {
    const quiz = await this.quizzesImplementation.getQuizById(id);
    if (!quiz) {
      throw new NotFoundException("Quiz not found");
    }
    return quiz;
  }
}

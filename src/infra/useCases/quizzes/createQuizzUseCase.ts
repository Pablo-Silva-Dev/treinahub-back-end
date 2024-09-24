import { ICreateQuizDTO } from "@/infra/dtos/QuizDTO";
import { TrainingsImplementation } from "@/infra/repositories/implementations/trainingsImplementation";
import { Injectable, NotFoundException } from "@nestjs/common";
import { QuizzesImplementation } from "./../../repositories/implementations/quizzesImplementation";

@Injectable()
export class CreateQuizUseCase {
  constructor(
    private quizzesImplementation: QuizzesImplementation,
    private trainingsImplementation: TrainingsImplementation
  ) {}
  async execute(data: ICreateQuizDTO) {
    const { training_id } = data;
    const training =
      await this.trainingsImplementation.getTrainingById(training_id);
    if (!training) {
      throw new NotFoundException("Training not found");
    }
    const newQuiz = await this.quizzesImplementation.createQuiz(data);
    return newQuiz;
  }
}

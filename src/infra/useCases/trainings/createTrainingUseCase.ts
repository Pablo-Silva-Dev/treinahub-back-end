import { ICreateTrainingDTO } from "@/infra/dtos/TrainingDTO";
import { TrainingsImplementation } from "@/infra/repositories/implementations/trainingsImplementation";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CreateTrainingUseCase {
  constructor(private trainingsImplementation: TrainingsImplementation) {}

  async execute(data: ICreateTrainingDTO) {
    const newTraining = await this.trainingsImplementation.createTraining(data);

    return newTraining;
  }
}

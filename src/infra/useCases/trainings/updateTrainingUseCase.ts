import { IUpdateTrainingDTO } from "@/infra/dtos/TrainingDTO";
import { TrainingsImplementation } from "@/infra/repositories/implementations/trainingsImplementation";
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class UpdateTrainingUseCase {
  constructor(private trainingsImplementation: TrainingsImplementation) {}
  async execute(data: IUpdateTrainingDTO) {
    const { id } = data;
    const training = await this.trainingsImplementation.getTrainingById(id);
    if (!training) {
      throw new NotFoundException("Training not found.");
    }
    const updatedTraining = await this.trainingsImplementation.updateTraining(data);
    return updatedTraining
  }
}

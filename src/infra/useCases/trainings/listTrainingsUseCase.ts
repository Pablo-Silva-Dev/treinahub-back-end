import { TrainingsImplementation } from "@/infra/repositories/implementations/trainingsImplementation";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ListTrainingsUseCase {
  constructor(private trainingsImplementation: TrainingsImplementation) {}
  async execute() {
    const trainings = await this.trainingsImplementation.listTrainings();
    return trainings;
  }
}

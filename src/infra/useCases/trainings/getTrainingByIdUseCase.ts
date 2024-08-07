import { TrainingsImplementation } from "@/infra/repositories/implementations/trainingsImplementation";
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class GetTrainingByIdUseCase {
  constructor(private trainingsImplementation: TrainingsImplementation) {}
  async execute(id: string) {
    const training = await this.trainingsImplementation.getTrainingById(id);
    if (!training) {
      throw new NotFoundException("Training not found");
    }
    return training;
  }
}

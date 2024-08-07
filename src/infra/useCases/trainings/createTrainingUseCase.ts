import { ICreateTrainingDTO } from "@/infra/dtos/TrainingDTO";
import { TrainingsImplementation } from "@/infra/repositories/implementations/trainingsImplementation";
import { ConflictException, Injectable } from "@nestjs/common";

@Injectable()
export class CreateTrainingUseCase {
  constructor(private trainingsImplementation: TrainingsImplementation) {}

  async execute(data: ICreateTrainingDTO) {
    const { name } = data;

    const trainingAlreadyExists =
      await this.trainingsImplementation.getTrainingByName(name);
    if (trainingAlreadyExists) {
      throw new ConflictException(
        "A training with the same name already exists."
      );
    }

    const newTraining = await this.trainingsImplementation.createTraining(data);

    return newTraining;
  }
}

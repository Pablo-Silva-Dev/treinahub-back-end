import { TrainingsImplementation } from "@/infra/repositories/implementations/trainingsImplementation";
import { VideoClassesImplementation } from "@/infra/repositories/implementations/videoClassesImplementation";
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class ListVideoClassesByTrainingUseCase {
  constructor(
    private videoClassesImplementation: VideoClassesImplementation,
    private trainingsImplementation: TrainingsImplementation
  ) {}
  async execute(trainingId: string) {
    const training =
      await this.trainingsImplementation.getTrainingById(trainingId);

    if (!training) {
      throw new NotFoundException("Training not found");
    }

    const videoClasses =
      await this.videoClassesImplementation.listVideoClassesByTraining(
        trainingId
      );
    return videoClasses;
  }
}

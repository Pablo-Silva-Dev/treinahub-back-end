import {
  ICreateVideoClassDTO,
  IVideoClassDTO,
} from "@/infra/dtos/VideoClassDTO";
import { TrainingsImplementation } from "@/infra/repositories/implementations/trainingsImplementation";
import { VideoClassesImplementation } from "@/infra/repositories/implementations/videoClassesImplementation";
import { ConflictException, Injectable } from "@nestjs/common";

@Injectable()
export class CreateVideoClassUseCase {
  constructor(
    private videoClassesImplementation: VideoClassesImplementation,
    private trainingsImplementation: TrainingsImplementation
  ) {}

  async execute(data: ICreateVideoClassDTO): Promise<IVideoClassDTO> {
    const { name, url, training_id } = data;

    const training =
      await this.trainingsImplementation.getTrainingById(training_id);

    const videoClassByName =
      await this.videoClassesImplementation.getVideoClassByNameAndTrainingId(
        name,
        training_id
      );
    const videoClassByUrl =
      await this.videoClassesImplementation.getVideoClassByUrlAndTrainingId(
        url,
        training_id
      );

    if (!training) {
      throw new ConflictException("Training not found");
    }

    if (videoClassByName) {
      throw new ConflictException(
        `A video class with the name "${name}" already exists in the specified training.`
      );
    }

    if (videoClassByUrl) {
      throw new ConflictException(
        `A video class with the provided URL already exists in the specified training.`
      );
    }

    const newVideoClass =
      await this.videoClassesImplementation.createVideoClass(data);
    return newVideoClass;
  }
}

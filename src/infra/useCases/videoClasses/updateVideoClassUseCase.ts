import { IUpdateVideoClassDTO } from "@/infra/dtos/VideoClassDTO";
import { TrainingsImplementation } from "@/infra/repositories/implementations/trainingsImplementation";
import { VideoClassesImplementation } from "@/infra/repositories/implementations/videoClassesImplementation";
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";

@Injectable()
export class UpdateVideoClassUseCase {
  constructor(
    private videoClassesImplementation: VideoClassesImplementation,
    private trainingsImplementation: TrainingsImplementation
  ) {}
  async execute(data: IUpdateVideoClassDTO) {
    const { name, url, training_id, id } = data;

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

    const videoClass =
      await this.videoClassesImplementation.getVideoClassById(id);
    if (!videoClass) {
      throw new NotFoundException("Video class not found.");
    }
    const updatedVideoClass =
      await this.videoClassesImplementation.updateVideoClass(data);
    return updatedVideoClass;
  }
}

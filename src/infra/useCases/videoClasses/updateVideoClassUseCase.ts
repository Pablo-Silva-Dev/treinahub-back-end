import {
  IUpdateVideoClassDTO,
  IVideoClassDTO,
} from "@/infra/dtos/VideoClassDTO";
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
  async execute(data: IUpdateVideoClassDTO): Promise<IVideoClassDTO> {
    const { training_id, id } = data;

    const training =
      await this.trainingsImplementation.getTrainingById(training_id);

    if (!training) {
      throw new ConflictException("Training not found");
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

import { ITrainingDTO } from "@/infra/dtos/TrainingDTO";
import { ICreateWatchedClassesDTO } from "@/infra/dtos/WatchedClassDTO";
import { TrainingsImplementation } from "@/infra/repositories/implementations/trainingsImplementation";
import { UsersImplementation } from "@/infra/repositories/implementations/usersImplementation";
import { VideoClassesImplementation } from "@/infra/repositories/implementations/videoClassesImplementation";
import { WatchedClassesImplementation } from "@/infra/repositories/implementations/watchedClassesImplementation";
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";

@Injectable()
export class CreateWatchedClassUseCase {
  constructor(
    private watchedClassesImplementation: WatchedClassesImplementation,
    private usersImplementation: UsersImplementation,
    private trainingsImplementation: TrainingsImplementation,
    private videoClassesImplementation: VideoClassesImplementation
  ) {}
  async execute(data: ICreateWatchedClassesDTO) {
    const { user_id, videoclass_id, training_id } = data;

    const user = await this.usersImplementation.getUserById(user_id);
    const videoClass =
      await this.videoClassesImplementation.getVideoClassById(videoclass_id);
    const training =
      await this.trainingsImplementation.getTrainingById(training_id);

    const { video_classes } = training as ITrainingDTO;

    if (videoClass) {
      const videoClassesExistsOnTraining = video_classes.some(
        (vc) => vc.id === videoClass.id
      );
      if (!videoClassesExistsOnTraining) {
        throw new ConflictException(
          "This video class does not belongs to this training"
        );
      }
    }

    if (!user) {
      throw new NotFoundException("User not found");
    }

    if (!training) {
      throw new NotFoundException("Training not found");
    }

    if (!videoClass) {
      throw new NotFoundException("Video class not found");
    }

    const alreadyWatchedClass =
      await this.watchedClassesImplementation.getUniqueWatchedClass({
        user_id,
        videoclass_id,
      });
    if (alreadyWatchedClass) {
      return;
    }
    const newWatchedClass =
      await this.watchedClassesImplementation.createWatchedClass(data);
    return newWatchedClass;
  }
}

import { ICreateITrainingMetricsDTO } from "@/infra/dtos/TrainingMetricDTO";
import { TrainingMetricsImplementation } from "@/infra/repositories/implementations/trainingMetricsImplementation";
import { TrainingsImplementation } from "@/infra/repositories/implementations/trainingsImplementation";
import { UsersImplementation } from "@/infra/repositories/implementations/usersImplementation";
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";

@Injectable()
export class CreateTrainingMetricsUseCase {
  constructor(
    private trainingMetricsImplementation: TrainingMetricsImplementation,
    private usersImplementation: UsersImplementation,
    private trainingsImplementation: TrainingsImplementation
  ) {}
  async execute(data: ICreateITrainingMetricsDTO) {
    const { user_id, training_id } = data;

    const user = await this.usersImplementation.getUserById(user_id);

    const training =
      await this.trainingsImplementation.getTrainingById(training_id);

    const trainingMetricsAlreadyExists =
      await this.trainingMetricsImplementation.getTrainingMetricsByTrainingAndUser(
        user_id,
        training_id
      );

    if (!user) {
      throw new NotFoundException("User not found");
    }

    if (!training) {
      throw new NotFoundException("Training not found");
    }

    if (trainingMetricsAlreadyExists) {
      throw new ConflictException(
        "Already exists metrics for this user and this training"
      );
    }

    const { video_classes } = training;
    const totalTrainingVideoClasses = video_classes.length;

    const newTrainingMetrics =
      await this.trainingMetricsImplementation.createTrainingMetrics({
        ...data,
        total_watched_classes: 0,
        total_training_classes: totalTrainingVideoClasses,
        total_watched_classes_percentage: 0,
      });

    return newTrainingMetrics;
  }
}

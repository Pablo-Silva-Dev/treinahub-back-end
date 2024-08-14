import { IUpdateITrainingMetricsDTO } from "@/infra/dtos/TrainingMetricDTO";
import { TrainingMetricsImplementation } from "@/infra/repositories/implementations/trainingMetricsImplementation";
import { UsersImplementation } from "@/infra/repositories/implementations/usersImplementation";
import { WatchedClassesImplementation } from "@/infra/repositories/implementations/watchedClassesImplementation";
import { Injectable, NotFoundException } from "@nestjs/common";
import { TrainingsImplementation } from "./../../repositories/implementations/trainingsImplementation";

@Injectable()
export class UpdateTrainingMetricsUseCase {
  constructor(
    private trainingMetricsImplementation: TrainingMetricsImplementation,
    private trainingsImplementation: TrainingsImplementation,
    private usersImplementation: UsersImplementation,
    private watchedClassesImplementation: WatchedClassesImplementation
  ) {}
  async execute(data: IUpdateITrainingMetricsDTO) {
    const { id, user_id, training_id } = data;

    const user = await this.usersImplementation.getUserById(user_id);
    const training =
      await this.trainingsImplementation.getTrainingById(training_id);

    const trainingMetrics =
      await this.trainingMetricsImplementation.getTrainingMetricsById(id);

    const watchedClasses =
      await this.watchedClassesImplementation.listWatchedClassesByUserIdAndTrainingId(
        user_id,
        training_id
      );

    if (!user) {
      throw new NotFoundException("User not found");
    }
    if (!training) {
      throw new NotFoundException("Training not found");
    }
    if (!trainingMetrics) {
      throw new NotFoundException("Training metrics not found");
    }
    if (!watchedClasses) {
      throw new NotFoundException("Training metrics relation not found");
    }

    const trainingClasses =
      await this.trainingsImplementation.getTrainingById(training_id);

    const totalWatchedClasses = watchedClasses.length;

    //@ts-ignore
    const totalTrainingClasses = trainingClasses.video_classes.length;

    const totalWatchedClassesPercentage =
      Number(totalWatchedClasses / totalTrainingClasses) * 100;

    const updatedTrainingMetrics =
      await this.trainingMetricsImplementation.updateTrainingMetrics({
        ...data,
        total_watched_classes: totalWatchedClasses,
        total_training_classes: totalTrainingClasses,
        total_watched_classes_percentage: totalWatchedClassesPercentage,
      });
    return updatedTrainingMetrics;
  }
}

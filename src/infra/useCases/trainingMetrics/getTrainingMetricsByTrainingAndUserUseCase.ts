import { IGetTrainingMetricsDTO } from "@/infra/dtos/TrainingMetricDTO";
import { TrainingMetricsImplementation } from "@/infra/repositories/implementations/trainingMetricsImplementation";
import { TrainingsImplementation } from "@/infra/repositories/implementations/trainingsImplementation";
import { UsersImplementation } from "@/infra/repositories/implementations/usersImplementation";
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class GetTrainingMetricsByUserIdAndTrainingIdUseCase {
  constructor(
    private trainingMetricsImplementation: TrainingMetricsImplementation,
    private usersImplementation: UsersImplementation,
    private trainingsImplementation: TrainingsImplementation
  ) {}
  async execute(data: IGetTrainingMetricsDTO) {
    const { user_id, training_id } = data;
    const user = await this.usersImplementation.getUserById(user_id);
    const training =
      await this.trainingsImplementation.getTrainingById(training_id);

    if (!user) {
      throw new NotFoundException("User not found");
    }

    if (!training) {
      throw new NotFoundException("Training not found");
    }

    const trainingMetrics =
      await this.trainingMetricsImplementation.getTrainingMetricsByTrainingAndUser(
        user_id,
        training_id
      );
    return trainingMetrics;
  }
}

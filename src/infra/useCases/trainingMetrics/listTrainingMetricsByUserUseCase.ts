import { TrainingMetricsImplementation } from "@/infra/repositories/implementations/trainingMetricsImplementation";
import { UsersImplementation } from "@/infra/repositories/implementations/usersImplementation";
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class ListTrainingMetricsByUserUseCase {
  constructor(
    private trainingMetricsImplementation: TrainingMetricsImplementation,
    private usersImplementation: UsersImplementation
  ) {}
  async execute(user_id: string) {
    const user = await this.usersImplementation.getUserById(user_id);

    if (!user) {
      throw new NotFoundException("User not found");
    }

    const trainingMetrics =
      await this.trainingMetricsImplementation.listTrainingMetricsByUser(
        user_id
      );

    return trainingMetrics;
  }
}

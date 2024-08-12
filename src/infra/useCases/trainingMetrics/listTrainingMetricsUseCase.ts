import { TrainingMetricsImplementation } from "@/infra/repositories/implementations/trainingMetricsImplementation";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ListTrainingMetricsUseCase {
  constructor(
    private trainingMetricsImplementation: TrainingMetricsImplementation
  ) {}
  async execute() {
    const trainingMetrics =
      await this.trainingMetricsImplementation.listTrainingMetrics();
    return trainingMetrics;
  }
}

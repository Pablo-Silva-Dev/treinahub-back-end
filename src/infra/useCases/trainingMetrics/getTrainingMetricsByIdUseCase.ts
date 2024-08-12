import { TrainingMetricsImplementation } from "@/infra/repositories/implementations/trainingMetricsImplementation";
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class GetTrainingMetricsByIdUseCase {
  constructor(
    private trainingMetricsImplementation: TrainingMetricsImplementation
  ) {}
  async execute(id: string) {
    const trainingMetrics =
      await this.trainingMetricsImplementation.getTrainingMetricsById(id);

    if (!trainingMetrics) {
      throw new NotFoundException("Training metrics not found");
    }

    return trainingMetrics;
  }
}

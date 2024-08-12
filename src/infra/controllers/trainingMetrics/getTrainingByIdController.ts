import { GetTrainingMetricsByIdUseCase } from "@/infra/useCases/trainingMetrics/getTrainingMetricsByIdUseCase";

import {
  ConflictException,
  Controller,
  Get,
  HttpCode,
  Param,
} from "@nestjs/common";

@Controller("/training-metrics/get-by-id")
export class GetTrainingMetricsByIdController {
  constructor(
    private getTrainingMetricsByIdUseCase: GetTrainingMetricsByIdUseCase
  ) {}
  @Get(":trainingMetricsId")
  @HttpCode(200)
  async handle(@Param("trainingMetricsId") trainingMetricsId: string) {
    try {
      const newTrainingMetrics =
        await this.getTrainingMetricsByIdUseCase.execute(trainingMetricsId);
      return newTrainingMetrics;
    } catch (error) {
      console.log("[INTERNAL ERROR]", error);
      throw new ConflictException({
        message:
          "An error occurred. Check all request body fields for possible mismatching.",
        error: error.message,
      });
    }
  }
}

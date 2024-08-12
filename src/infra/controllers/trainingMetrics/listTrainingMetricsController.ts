import { ListTrainingMetricsUseCase } from "@/infra/useCases/trainingMetrics/listTrainingMetricsUseCase";
import { ConflictException, Controller, Get, HttpCode } from "@nestjs/common";

@Controller("/training-metrics/list")
export class ListTrainingMetricsController {
  constructor(private listTrainingMetricsUseCase: ListTrainingMetricsUseCase) {}
  @Get()
  @HttpCode(200)
  async handle() {
    try {
      const trainingMetrics = await this.listTrainingMetricsUseCase.execute();
      return trainingMetrics;
    } catch (error) {
      console.log("[INTERNAL ERROR]", error.message);
      throw new ConflictException({
        message: "An error occurred.",
        error: error.message,
      });
    }
  }
}

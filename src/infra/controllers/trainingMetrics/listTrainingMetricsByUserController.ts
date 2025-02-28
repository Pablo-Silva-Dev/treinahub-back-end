import { ListTrainingMetricsByUserUseCase } from "@/infra/useCases/trainingMetrics/listTrainingMetricsByUserUseCase";
import {
  ConflictException,
  Controller,
  Get,
  HttpCode,
  Param,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Controller("/training-metrics/list-by-user")
@UseGuards(AuthGuard("jwt-user"))
export class ListTrainingMetricsByUserController {
  constructor(
    private listTrainingMetricsByUserUseCase: ListTrainingMetricsByUserUseCase
  ) {}
  @Get(":userId")
  @HttpCode(200)
  async handle(@Param("userId") user_id: string) {
    try {
      const trainingMetrics =
        await this.listTrainingMetricsByUserUseCase.execute(user_id);
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

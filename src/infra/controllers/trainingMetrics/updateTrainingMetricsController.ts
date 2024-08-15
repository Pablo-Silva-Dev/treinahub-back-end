import { IUpdateITrainingMetricsDTO } from "@/infra/dtos/TrainingMetricDTO";
import { UpdateTrainingMetricsUseCase } from "@/infra/useCases/trainingMetrics/updateTrainingMetricsUseCase";
import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Put,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { z } from "zod";

const updateTrainingMetricsValidationSchema = z.object({
  id: z.string(),
});

@Controller("/training-metrics/update")
@UseGuards(AuthGuard("jwt-user"))
export class UpdateTrainingMetricsController {
  constructor(
    private updateTrainingMetricsUseCase: UpdateTrainingMetricsUseCase
  ) {}
  @Put()
  @HttpCode(203)
  async handle(@Body() body: IUpdateITrainingMetricsDTO) {
    const isBodyValidated =
      updateTrainingMetricsValidationSchema.safeParse(body);
    if (!isBodyValidated.success) {
      throw new BadRequestException({
        message: "Invalid request body. Please, check all fields",
        error: isBodyValidated.error.issues,
      });
    }

    try {
      const newTrainingMetrics =
        await this.updateTrainingMetricsUseCase.execute(body);
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

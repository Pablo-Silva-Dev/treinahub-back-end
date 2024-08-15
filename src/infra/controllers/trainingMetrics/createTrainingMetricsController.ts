import { ICreateITrainingMetricsDTO } from "@/infra/dtos/TrainingMetricDTO";
import { CreateTrainingMetricsUseCase } from "@/infra/useCases/trainingMetrics/createTrainingMetricsUseCase";
import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { z } from "zod";

const createTrainingMetricsValidationSchema = z.object({
  user_id: z.string(),
  training_id: z.string(),
});

@Controller("/training-metrics/create")
@UseGuards(AuthGuard("jwt-user"))
export class CreateTrainingMetricsController {
  constructor(
    private createTrainingMetricsUseCase: CreateTrainingMetricsUseCase
  ) {}
  @Post()
  @HttpCode(203)
  async handle(@Body() body: ICreateITrainingMetricsDTO) {
    const isBodyValidated =
      createTrainingMetricsValidationSchema.safeParse(body);
    if (!isBodyValidated.success) {
      throw new BadRequestException({
        message: "Invalid request body. Please, check all fields",
        error: isBodyValidated.error.issues,
      });
    }

    try {
      const newTrainingMetrics =
        await this.createTrainingMetricsUseCase.execute(body);
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

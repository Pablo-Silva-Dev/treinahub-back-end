import { IGetTrainingMetricsDTO } from "@/infra/dtos/TrainingMetricDTO";
import { GetTrainingMetricsByUserIdAndTrainingIdUseCase } from "@/infra/useCases/trainingMetrics/getTrainingMetricsByTrainingAndUserUseCase";
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

const getTrainingMetricsBodySchema = z.object({
  user_id: z.string(),
  training_id: z.string(),
});

@Controller("/training-metrics/get-by-user-and-training")
@UseGuards(AuthGuard("jwt-user"))
export class GetTrainingMetricsByUserIdAndTrainingIdController {
  constructor(
    private getTrainingMetricsByTrainingAndUserUseCase: GetTrainingMetricsByUserIdAndTrainingIdUseCase
  ) {}
  @HttpCode(200)
  @Post()
  async handle(@Body() body: IGetTrainingMetricsDTO) {
    const isBodyValidated = getTrainingMetricsBodySchema.safeParse(body);

    if (!isBodyValidated.success) {
      throw new BadRequestException({
        message: "Invalid request body. Please check the input fields.",
        error: isBodyValidated.error.issues,
      });
    }

    try {
      const trainingMetrics =
        await this.getTrainingMetricsByTrainingAndUserUseCase.execute(body);
      return trainingMetrics;
    } catch (error) {
      console.log("[INTERNAL ERROR]", error.message);
      throw new ConflictException({
        message:
          "An error occurred. Check all request body fields for possible mismatching.",
        error: error.message,
      });
    }
  }
}

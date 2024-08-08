import { IUpdateTrainingDTO } from "@/infra/dtos/TrainingDTO";
import { UpdateTrainingUseCase } from "@/infra/useCases/trainings/updateTrainingUseCase";
import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  InternalServerErrorException,
  Put,
} from "@nestjs/common";
import { z } from "zod";

const updateTrainingSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  description: z.string().optional(),
  cover_url: z.string().url().optional(),
});

@Controller("/trainings/update")
export class UpdateTrainingController {
  constructor(private updateTrainingUseCase: UpdateTrainingUseCase) {}

  @Put()
  @HttpCode(203)
  async handle(@Body() body: IUpdateTrainingDTO) {
    const isBodyValidated = updateTrainingSchema.safeParse(body);

    if (!isBodyValidated.success) {
      throw new BadRequestException({
        message: "The body format is invalid. Check the fields below:",
        errors: isBodyValidated.error.issues,
      });
    }

    try {
      const updatedTraining = await this.updateTrainingUseCase.execute(body);
      return updatedTraining;
    } catch (error) {
      console.log("[INTERNAL ERROR]", error.message);
      throw new InternalServerErrorException({
        message:
          "An error occurred. Check all request body fields for possible mismatching.",
        error: error.message,
      });
    }
  }
}

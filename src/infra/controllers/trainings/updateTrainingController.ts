import { IUpdateTrainingDTO } from "@/infra/dtos/TrainingDTO";
import { UpdateTrainingUseCase } from "@/infra/useCases/trainings/updateTrainingUseCase";
import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Param,
  Put,
} from "@nestjs/common";
import { z } from "zod";

const updateTrainingSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  cover_url: z.string().url().optional(),
});

@Controller("trainings/update")
export class UpdateTrainingController {
  constructor(private updateTrainingUseCase: UpdateTrainingUseCase) {}
  @Put(":trainingId")
  @HttpCode(203)
  async handle(
    @Param("trainingId") trainingId: string,
    @Body() body: IUpdateTrainingDTO
  ) {
    if (!trainingId) {
      throw new ConflictException("trainingId is required");
    }

    const isBodyValidated = updateTrainingSchema.safeParse(body);

    if (!isBodyValidated.success) {
      throw new ConflictException({
        message: "The body format is invalid. Check the fields below:",
        error: isBodyValidated.error.issues,
      });
    }

    const updatedTraining = await this.updateTrainingUseCase.execute({
      ...body,
      id: trainingId,
    });
    return updatedTraining;
  }
}

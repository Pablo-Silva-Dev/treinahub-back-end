import { ICreateTrainingDTO } from "@/infra/dtos/TrainingDTO";
import { CreateTrainingUseCase } from "@/infra/useCases/trainings/createTrainingUseCase";
import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { z } from "zod";

const createTrainingBodySchema = z.object({
  name: z.string(),
  description: z.string(),
  duration: z.number(),
  cover_url: z.string().url().optional(),
});

@Controller("/trainings/create")
@UseGuards(AuthGuard("jwt-admin"))
export class CreateTrainingController {
  constructor(private createTrainingUseCase: CreateTrainingUseCase) {}

  @Post()
  @HttpCode(201)
  async handle(@Body() body: ICreateTrainingDTO) {
    const isBodyValidated = createTrainingBodySchema.safeParse(body);

    if (!isBodyValidated.success) {
      throw new ConflictException({
        message: "Invalid request body. Please check the input fields.",
        errors: isBodyValidated.error.issues,
      });
    }

    try {
      const training = await this.createTrainingUseCase.execute(body);
      return training;
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

import { ICreateQuizResultDTO } from "@/infra/dtos/QuizResultDTO";
import { CreateQuizResultUseCase } from "@/infra/useCases/quizResults/createQuizResultUseCase";
import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  NotFoundException,
  Post,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { z } from "zod";

const createQuizResultValidationSchema = z.object({
  user_id: z.string(),
  quiz_id: z.string(),
  quiz_attempt_id: z.string(),
});

@Controller("/quizzes-results/create")
@UseGuards(AuthGuard("jwt-user"))
export class CreateQuizResultController {
  constructor(private createQuizResultUseCase: CreateQuizResultUseCase) {}

  @Post()
  @HttpCode(201)
  async handle(@Body() body: ICreateQuizResultDTO) {
    const validationResult = createQuizResultValidationSchema.safeParse(body);

    if (!validationResult.success) {
      throw new BadRequestException({
        message: "Invalid request body. Please check the input fields.",
        errors: validationResult.error.issues,
      });
    }

    try {
      const quizResult = await this.createQuizResultUseCase.execute(body);
      return quizResult;
    } catch (error) {
      console.error("[INTERNAL ERROR]", error.message);

      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new ConflictException({
        message: "An error occurred while creating the quiz result.",
        error: error.message,
      });
    }
  }
}

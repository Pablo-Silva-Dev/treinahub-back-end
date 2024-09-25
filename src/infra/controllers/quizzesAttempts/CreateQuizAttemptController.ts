import { ICreateQuizAttemptDTO } from "@/infra/dtos/QuizAttemptDTO";
import { CreateQuizAttemptUseCase } from "@/infra/useCases/quizAttempts/createQuizAttemptUseCase";
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

const createQuizAttemptValidationSchema = z.object({
  quiz_id: z.string(),
  user_id: z.string(),
});

@Controller("/quizzes-attempts/create")
@UseGuards(AuthGuard("jwt-user"))
export class CreateQuizAttemptController {
  constructor(
    private createQuizAttemptUseCase: CreateQuizAttemptUseCase
  ) {}

  @Post()
  @HttpCode(201)
  async handle(@Body() body: ICreateQuizAttemptDTO) {
    const isBodyValidated = createQuizAttemptValidationSchema.safeParse(body);

    if (!isBodyValidated.success) {
      throw new BadRequestException({
        message: "Invalid request body. Please check the input fields.",
        errors: isBodyValidated.error.issues,
      });
    }

    try {
      const createdQuizAttempt = await this.createQuizAttemptUseCase.execute(body);
      return createdQuizAttempt;
    } catch (error) {
      console.error("[INTERNAL ERROR]", error.message);
      throw new ConflictException({
        message: "An error occurred while creating the quiz attempt.",
        error: error.message,
      });
    }
  }
}

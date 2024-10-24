import { ICreateQuizResponseDTO } from "@/infra/dtos/QuizResponseDTO";
import { CreateQuizResponseUseCase } from "@/infra/useCases/quizResponses/createQuizResponseUseCase";
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

const createQuizResponseValidationSchema = z.object({
  quiz_attempt_id: z.string(),
  question_id: z.string(),
  selected_option_id: z.string(),
});

@Controller("/quizzes-responses/create")
@UseGuards(AuthGuard("jwt-user"))
export class CreateQuizResponseController {
  constructor(private createQuizResponseUseCase: CreateQuizResponseUseCase) {}

  @Post()
  @HttpCode(201)
  async handle(@Body() body: ICreateQuizResponseDTO) {
    const validationResult = createQuizResponseValidationSchema.safeParse(body);

    if (!validationResult.success) {
      throw new BadRequestException({
        message: "Invalid request body. Please check the input fields.",
        errors: validationResult.error.issues,
      });
    }

    try {
      const quizResponse = await this.createQuizResponseUseCase.execute(body);
      return quizResponse;
    } catch (error) {
      console.error("[INTERNAL ERROR]", error.message);
      throw new ConflictException({
        message: "An error occurred while creating the quiz response.",
        error: error.message,
      });
    }
  }
}

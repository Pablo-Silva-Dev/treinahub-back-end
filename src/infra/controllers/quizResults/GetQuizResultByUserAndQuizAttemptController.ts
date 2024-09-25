import { IGetQuizResultDTO } from "@/infra/dtos/QuizResultDTO";
import { getQuizResultByUserAndQuizAttemptUseCase } from "@/infra/useCases/quizResults/getQuizResultByUserAndQuizAttemptUseCase";
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

const getQuizResultValidationSchema = z.object({
  user_id: z.string(),
  quiz_attempt_id: z.string(),
});

@Controller("/quizzes-results/get-by-user-and-quiz-attempt")
@UseGuards(AuthGuard("jwt-user"))
export class GetQuizResultByUserAndQuizAttemptController {
  constructor(
    private getQuizResultByUserAndQuizAttemptUseCase: getQuizResultByUserAndQuizAttemptUseCase
  ) {}

  @Post()
  @HttpCode(200)
  async handle(@Body() body: IGetQuizResultDTO) {
    try {
      const validationResult = getQuizResultValidationSchema.safeParse(body);
      if (!validationResult.success) {
        throw new BadRequestException({
          message: "Invalid request body. Please check the input fields.",
          errors: validationResult.error.issues,
        });
      }

      const quizResult =
        await this.getQuizResultByUserAndQuizAttemptUseCase.execute(body);
      return quizResult;
    } catch (error) {
      console.error("[INTERNAL ERROR]", error.message);

      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new ConflictException({
        message: "An error occurred while fetching the quiz result.",
        error: error.message,
      });
    }
  }
}

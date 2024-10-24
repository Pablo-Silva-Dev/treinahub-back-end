import { ICreateQuizDTO } from "@/infra/dtos/QuizDTO";
import { CreateQuizUseCase } from "@/infra/useCases/quizzes/createQuizzUseCase";
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

const createQuizValidationSchema = z.object({
  training_id: z.string(),
});

@Controller("/quizzes/create")
@UseGuards(AuthGuard("jwt-admin"))
export class CreateQuizController {
  constructor(private createQuizUseCase: CreateQuizUseCase) {}
  @Post()
  @HttpCode(201)
  async handle(@Body() body: ICreateQuizDTO) {
    const isBodyValidated = createQuizValidationSchema.safeParse(body);

    if (!isBodyValidated.success) {
      throw new BadRequestException({
        message: "Invalid request body. Please check the input fields.",
        errors: isBodyValidated.error.issues,
      });
    }

    try {
      const createdQuiz = await this.createQuizUseCase.execute(body);

      return createdQuiz;
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

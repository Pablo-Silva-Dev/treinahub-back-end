import { ICreateQuizQuestionDTO } from "@/infra/dtos/QuestionDTO";
import { CreateQuizQuestionUseCase } from "@/infra/useCases/quizQuestions/createQuizQuestionUseCase";
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

const createQuizQuestionValidationSchema = z.object({
  quiz_id: z.string(),
  content: z.string(),
});

@Controller("/quizzes-questions/create")
@UseGuards(AuthGuard("jwt-admin"))
export class CreateQuizQuestionController {
  constructor(private createQuizQuestionUseCase: CreateQuizQuestionUseCase) {}
  @Post()
  @HttpCode(201)
  async handle(@Body() body: ICreateQuizQuestionDTO) {
    const isBodyValidated = createQuizQuestionValidationSchema.safeParse(body);

    if (!isBodyValidated.success) {
      throw new BadRequestException({
        message: "Invalid request body. Please check the input fields.",
        errors: isBodyValidated.error.issues,
      });
    }

    try {
      const createdQuizQuestion = await this.createQuizQuestionUseCase.execute({
        ...body,
        correct_option_id: "",
      });

      return createdQuizQuestion;
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

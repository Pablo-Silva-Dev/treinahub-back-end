import { ICreateQuestionOptionDTO } from "@/infra/dtos/QuestionOptionDTO";
import { CreateQuestionOptionUseCase } from "@/infra/useCases/questionOptions/createQuestionOptionUseCase";
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

const createQuestionOptionValidationSchema = z.object({
  question_id: z.string(),
  content: z.string(),
  is_correct: z.boolean(),
});

@Controller("/question-options/create")
@UseGuards(AuthGuard("jwt-admin"))
export class CreateQuestionOptionController {
  constructor(
    private createQuestionOptionUseCase: CreateQuestionOptionUseCase
  ) {}
  @Post()
  @HttpCode(201)
  async handle(@Body() body: ICreateQuestionOptionDTO) {
    const isBodyValidated =
      createQuestionOptionValidationSchema.safeParse(body);

    if (!isBodyValidated.success) {
      throw new BadRequestException({
        message: "Invalid request body. Please check the input fields.",
        errors: isBodyValidated.error.issues,
      });
    }

    try {
      const createdQuestionOption =
        await this.createQuestionOptionUseCase.execute(body);

      return createdQuestionOption;
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

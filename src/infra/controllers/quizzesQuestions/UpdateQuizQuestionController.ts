import { IUpdateQuizQuestionDTO } from "@/infra/dtos/QuestionDTO";
import { UpdateQuizQuestionUseCase } from "@/infra/useCases/quizQuestions/updateQuizQuestionUseCase";
import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Put,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { z } from "zod";

const updateQuizQuestionValidationSchema = z.object({
  id: z.string(),
  content: z.string().optional(),
  correct_option_id: z.string().optional(),
});

@Controller("/quizzes-questions/update")
@UseGuards(AuthGuard("jwt-admin"))
export class UpdateQuizQuestionController {
  constructor(private updateQuizQuestionUseCase: UpdateQuizQuestionUseCase) {}
  @Put()
  @HttpCode(203)
  async execute(@Body() body: IUpdateQuizQuestionDTO) {
    const isBodyValidated = updateQuizQuestionValidationSchema.safeParse(body);

    if (!isBodyValidated.success) {
      throw new BadRequestException({
        message: "Invalid request body. Please check the input fields.",
        errors: isBodyValidated.error.issues,
      });
    }

    try {
      const updatedQuizQuestion =
        await this.updateQuizQuestionUseCase.execute(body);
      return updatedQuizQuestion;
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

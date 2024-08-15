import { IUpdateFaqQuestionDTO } from "@/infra/dtos/FaqQuestionDTO";
import { UpdateFaqQuestionUseCase } from "@/infra/useCases/faqQuestions/updateFaqQuestionUseCase";
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

const updateFaqQuestionBodySchema = z.object({
  id: z.string(),
  question: z.string().optional(),
  answer: z.string().min(24).optional(),
});
@Controller("/faq-questions/update")
@UseGuards(AuthGuard("jwt-admin"))
export class UpdateFaqQuestionController {
  constructor(private updateFaqQuestionUseCase: UpdateFaqQuestionUseCase) {}
  @Put()
  @HttpCode(203)
  async handle(@Body() body: IUpdateFaqQuestionDTO) {
    const isBodyValidated = updateFaqQuestionBodySchema.safeParse(body);

    if (!isBodyValidated.success) {
      throw new BadRequestException({
        message: "The body format is invalid. Check the fields below:",
        error: isBodyValidated.error.issues,
      });
    }
    try {
      const updatedFaqQuestion =
        await this.updateFaqQuestionUseCase.execute(body);
      return updatedFaqQuestion;
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

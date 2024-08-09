import { CreateFaqQuestionUseCase } from "@/infra/useCases/faqQuestions/createFaqQuestionUseCase";
import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
} from "@nestjs/common";
import { z } from "zod";
import { ICreateFaqQuestionDTO } from "../../dtos/FaqQuestionDTO";

const createFaqQuestionBodySchema = z.object({
  question: z.string(),
  answer: z.string().min(24),
});

@Controller("/faq-questions/create")
export class CreateFaqQuestionController {
  constructor(private createFaqQuestionUseCase: CreateFaqQuestionUseCase) {}
  @Post()
  @HttpCode(201)
  async handle(@Body() body: ICreateFaqQuestionDTO) {
    const isBodyValidated = createFaqQuestionBodySchema.safeParse(body);

    if (!isBodyValidated.success) {
      throw new ConflictException({
        message: "The body format is invalid. Check the fields below:",
        error: isBodyValidated.error.issues,
      });
    }

    try {
      const createdFaqQuestion =
        await this.createFaqQuestionUseCase.execute(body);
      return createdFaqQuestion;
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

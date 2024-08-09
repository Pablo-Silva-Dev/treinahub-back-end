import {
  ConflictException,
  Controller,
  Get,
  HttpCode,
  Param,
} from "@nestjs/common";
import { GetFaqQuestionByIdUseCase } from "../../useCases/faqQuestions/getFaqQuestionByIdUseCase";

@Controller("/faq-questions/get-by-id")
export class GetFaqQuestionByIdController {
  constructor(private getFaqQuestionByIdUseCase: GetFaqQuestionByIdUseCase) {}
  @HttpCode(200)
  @Get(":faqQuestionId")
  async handle(@Param("faqQuestionId") faqQuestionId: string) {
    try {
      const faqQuestion =
        await this.getFaqQuestionByIdUseCase.execute(faqQuestionId);
      return faqQuestion;
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

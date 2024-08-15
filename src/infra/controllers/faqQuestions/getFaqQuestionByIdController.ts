import { GetFaqQuestionByIdUseCase } from "@/infra/useCases/faqQuestions/getFaqQuestionByIdUseCase";
import {
  ConflictException,
  Controller,
  Get,
  HttpCode,
  Param,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Controller("/faq-questions/get-by-id")
@UseGuards(AuthGuard("jwt-user"))
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

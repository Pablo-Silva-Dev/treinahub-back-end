import {
  ConflictException,
  Controller,
  Delete,
  HttpCode,
  Param,
} from "@nestjs/common";
import { DeleteFaqQuestionUseCase } from "./../../useCases/faqQuestions/deleteFaqQuestionUseCase";

@Controller("/faq-questions/delete")
export class DeleteFaqQuestionController {
  constructor(private deleteFaqQuestionUseCase: DeleteFaqQuestionUseCase) {}
  @Delete(":faqQuestionId")
  @HttpCode(200)
  async handle(@Param("faqQuestionId") faqQuestionId: string) {
    if (!faqQuestionId) {
      throw new ConflictException("faqQuestionId is required");
    }
    try {
      await this.deleteFaqQuestionUseCase.execute(faqQuestionId);
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

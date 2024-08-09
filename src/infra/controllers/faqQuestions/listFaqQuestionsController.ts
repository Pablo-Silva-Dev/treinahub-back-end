import { ListFaqQuestionsUseCase } from "@/infra/useCases/faqQuestions/listFaqQuestionsUseCase";
import { ConflictException, Controller, Get, HttpCode } from "@nestjs/common";

@Controller("/faq-questions/list")
export class ListFaqQuestionsController {
  constructor(private listFaqQuestionsUseCase: ListFaqQuestionsUseCase) {}
  @Get()
  @HttpCode(200)
  async handle() {
    try {
      const faqQuestions = await this.listFaqQuestionsUseCase.execute();
      return faqQuestions;
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

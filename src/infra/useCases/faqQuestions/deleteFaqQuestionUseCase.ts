import { FaqQuestionsImplementation } from "@/infra/repositories/implementations/faqQuestionsImplementation";
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class DeleteFaqQuestionUseCase {
  constructor(private faqQuestionsImplementation: FaqQuestionsImplementation) {}
  async execute(id: string) {
    const faqQuestion =
      await this.faqQuestionsImplementation.getFaqQuestionById(id);
    if (!faqQuestion) {
      throw new NotFoundException("Faq Question not found");
    }
    await this.faqQuestionsImplementation.deleteFaqQuestion(id);
  }
}
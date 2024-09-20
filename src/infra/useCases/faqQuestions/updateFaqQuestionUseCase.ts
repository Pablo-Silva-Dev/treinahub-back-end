import { IUpdateFaqQuestionDTO } from "@/infra/dtos/FaqQuestionDTO";
import { FaqQuestionsImplementation } from "@/infra/repositories/implementations/faqQuestionsImplementation";
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class UpdateFaqQuestionUseCase {
  constructor(private faqQuestionsImplementation: FaqQuestionsImplementation) {}
  async execute(data: IUpdateFaqQuestionDTO) {
    const { id, question } = data;
    const faqQuestion =
      await this.faqQuestionsImplementation.getFaqQuestionById(id);

    if (!faqQuestion) {
      throw new NotFoundException("Faq Question not found");
    }

    const updatedFaqQuestion =
      await this.faqQuestionsImplementation.updateFaqQuestion(data);
    return updatedFaqQuestion;
  }
}

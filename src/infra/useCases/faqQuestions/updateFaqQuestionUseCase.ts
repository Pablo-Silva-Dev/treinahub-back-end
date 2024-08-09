import { IUpdateFaqQuestionDTO } from "@/infra/dtos/FaqQuestionDTO";
import { FaqQuestionsImplementation } from "@/infra/repositories/implementations/faqQuestionsImplementation";
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";

@Injectable()
export class UpdateFaqQuestionUseCase {
  constructor(private faqQuestionsImplementation: FaqQuestionsImplementation) {}
  async execute(data: IUpdateFaqQuestionDTO) {
    const { id, question } = data;
    const faqQuestion =
      await this.faqQuestionsImplementation.getFaqQuestionById(id);
    const questionAlreadyExists =
      await this.faqQuestionsImplementation.getFaqQuestionByQuestion(question);

    if (!faqQuestion) {
      throw new NotFoundException("Faq Question not found");
    }

    if (questionAlreadyExists) {
      throw new ConflictException("Already exists a question with this text.");
    }
    const updatedFaqQuestion =
      await this.faqQuestionsImplementation.updateFaqQuestion(data);
    return updatedFaqQuestion;
  }
}

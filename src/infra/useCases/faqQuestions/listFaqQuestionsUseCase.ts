import { FaqQuestionsImplementation } from "@/infra/repositories/implementations/faqQuestionsImplementation";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ListFaqQuestionsUseCase {
  constructor(private faqQuestionsImplementation: FaqQuestionsImplementation) {}
  async execute() {
    const faqQuestions =
      await this.faqQuestionsImplementation.listFaqQuestions();
    return faqQuestions;
  }
}

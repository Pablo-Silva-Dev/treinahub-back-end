import {
  ICreateFaqQuestionDTO,
  IFaqQuestionDTO,
} from "@/infra/dtos/FaqQuestionDTO";
import { FaqQuestionsImplementation } from "@/infra/repositories/implementations/faqQuestionsImplementation";
import { ConflictException, Injectable } from "@nestjs/common";

@Injectable()
export class CreateFaqQuestionUseCase {
  constructor(private faqQuestionsImplementation: FaqQuestionsImplementation) {}

  async execute(data: ICreateFaqQuestionDTO): Promise<IFaqQuestionDTO> {
    const { question } = data;

    const questionAlreadyExists =
      await this.faqQuestionsImplementation.getFaqQuestionByQuestion(question);
    if (questionAlreadyExists) {
      throw new ConflictException(
        "A FAQ question with the same question text already exists."
      );
    }

    const newFaqQuestion =
      await this.faqQuestionsImplementation.createFaqQuestion(data);
    return newFaqQuestion;
  }
}

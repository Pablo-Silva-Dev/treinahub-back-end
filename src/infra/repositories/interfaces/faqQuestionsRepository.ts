import {
    ICreateFaqQuestionDTO,
    IFaqQuestionDTO,
    IUpdateFaqQuestionDTO,
} from "@/infra/dtos/FaqQuestionDTO";

export interface IFaqQuestionsRepository {
  createFaqQuestion(data: ICreateFaqQuestionDTO): Promise<IFaqQuestionDTO>;
  listFaqQuestions(): Promise<IFaqQuestionDTO[]>;
  getFaqQuestionByQuestion(question: string): Promise<IFaqQuestionDTO | void>;
  getFaqQuestionById(id: string): Promise<IFaqQuestionDTO | void>;
  updateFaqQuestion(data: IUpdateFaqQuestionDTO): Promise<IFaqQuestionDTO>;
  deleteFaqQuestion(faqQuestionId: string): Promise<void>;
}

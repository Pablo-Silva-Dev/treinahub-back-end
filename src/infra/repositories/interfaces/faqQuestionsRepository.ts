import {
  ICreateFaqQuestionDTO,
  IFaqQuestionDTO,
  IFaqQuestionSeedDTO,
  IUpdateFaqQuestionDTO,
} from "@/infra/dtos/FaqQuestionDTO";

export interface IFaqQuestionsRepository {
  createFaqQuestion(data: ICreateFaqQuestionDTO): Promise<IFaqQuestionDTO>;
  listFaqQuestions(companyId: string): Promise<IFaqQuestionDTO[]>;
  getFaqQuestionByQuestion(question: string): Promise<IFaqQuestionDTO | void>;
  getFaqQuestionById(id: string): Promise<IFaqQuestionDTO | void>;
  updateFaqQuestion(data: IUpdateFaqQuestionDTO): Promise<IFaqQuestionDTO>;
  deleteFaqQuestion(faqQuestionId: string): Promise<void>;
  plantFaqQuestionsSeeds(
    seeds: IFaqQuestionSeedDTO[],
    companyId: string
  ): Promise<void>;
}

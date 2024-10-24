import { IQuestionOptionDTO } from "@/infra/dtos/QuestionOptionDTO";

export interface IQuestionsOptionsRepository {
  createQuestionOption(data: IQuestionOptionDTO): Promise<IQuestionOptionDTO>;
  listQuestionOptions(quizQuestionId: string): Promise<IQuestionOptionDTO[]>;
  getQuestionOptionById(
    questionOptionId: string
  ): Promise<IQuestionOptionDTO | void>;
  deleteQuestionOption(questionOptionId: string): Promise<void>;
}

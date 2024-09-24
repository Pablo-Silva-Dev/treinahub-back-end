import {
  ICreateQuizQuestionDTO,
  IQuizQuestionDTO,
  IUpdateQuizQuestionDTO,
} from "@/infra/dtos/QuestionDTO";

export interface IQuizQuestionsRepository {
  createQuizQuestion(data: ICreateQuizQuestionDTO): Promise<IQuizQuestionDTO>;
  listQuizQuestions(): Promise<IQuizQuestionDTO[]>;
  getQuizQuestionById(question_id: string): Promise<IQuizQuestionDTO | void>;
  updateQuizQuestion(data: IUpdateQuizQuestionDTO): Promise<IQuizQuestionDTO>;
  deleteQuizQuestion(questionId: string): Promise<void>;
}

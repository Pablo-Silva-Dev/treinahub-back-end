import { ICreateQuizDTO, IQuizDTO } from "@/infra/dtos/QuizDTO";

export interface IQuizzesRepository {
  createQuiz(data: ICreateQuizDTO): Promise<IQuizDTO>;
  listQuizzes(): Promise<IQuizDTO[]>;
  getQuizById(quiz_id: string): Promise<IQuizDTO | void>;
  getQuizByTraining(training_id: string): Promise<IQuizDTO | void>;
  deleteQuiz(quiz_id: string): Promise<void>;
}

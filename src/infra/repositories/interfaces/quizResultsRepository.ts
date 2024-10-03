import {
  ICreateQuizResultDTO,
  IGetQuizResultDTO,
  IQuizResultDTO,
} from "@/infra/dtos/QuizResultDTO";

export interface IQuizResultsRepository {
  createQuizResult(data: ICreateQuizResultDTO): Promise<IQuizResultDTO>;
  getQuizResultByUserAndAttempt(
    data: IGetQuizResultDTO
  ): Promise<IQuizResultDTO>;
  getQuizResultById(quizResultId: string): Promise<IQuizResultDTO>;
  deleteQuizResult(quizResultId: string): Promise<void>;
}

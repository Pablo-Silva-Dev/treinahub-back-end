import {
  ICreateQuizResponseDTO,
  IQuizResponseDTO,
} from "@/infra/dtos/QuizResponseDTO";

export interface IQuizResponseRepository {
  createQuizResponse(data: ICreateQuizResponseDTO): Promise<IQuizResponseDTO>;
  listQuizResponsesByQuizAttempt(
    quizAttemptId: string
  ): Promise<IQuizResponseDTO[]>;
  getQuizResponseById(quizResponseId: string): Promise<IQuizResponseDTO | void>;
  deleteManyQuizzesResponsesByQuizAttempt(attemptId: string): Promise<void>;
}

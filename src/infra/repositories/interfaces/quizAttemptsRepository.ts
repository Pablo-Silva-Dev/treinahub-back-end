import {
  ICreateQuizAttemptDTO,
  IQuizAttemptDTO,
} from "@/infra/dtos/QuizAttemptDTO";

export interface IQuizAttemptRepository {
  createQuizAttempt(data: ICreateQuizAttemptDTO): Promise<IQuizAttemptDTO>;
  getQuizAttemptById(quizAttemptId: string): Promise<IQuizAttemptDTO | void>;
  listQuizAttemptsByUser(userId: string): Promise<IQuizAttemptDTO[]>;
}

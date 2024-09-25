import {
  ICreateQuizQuestionDTO,
  IQuizQuestionDTO,
} from "@/infra/dtos/QuestionDTO";

export interface IQuizQuestionsRepository {
  createQuizQuestion(data: ICreateQuizQuestionDTO): Promise<IQuizQuestionDTO>;
  listQuizQuestionsByQuiz(quizId: string): Promise<IQuizQuestionDTO[]>;
  getQuizQuestionById(question_id: string): Promise<IQuizQuestionDTO | void>;
  deleteQuizQuestion(questionId: string): Promise<void>;
}

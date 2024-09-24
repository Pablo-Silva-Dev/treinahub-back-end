import { IQuizResponseDTO } from "./QuizResponseDTO";

export interface IQuestionOptionDTO {
  id: string;
  question_id: string;
  content: string;
  quiz_responses?: IQuizResponseDTO[];
}

export interface ICreateQuestionOptionDTO {
  question_id: string;
  content: string;
}

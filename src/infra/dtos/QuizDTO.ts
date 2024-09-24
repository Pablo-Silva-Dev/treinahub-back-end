import { IQuestionDTO } from "./QuestionDTO";
import { IQuizAttemptDTO } from "./QuizAttemptDTO";

export interface IQuizDTO {
  id: string;
  training_id: string;
  question?: IQuestionDTO[];
  quiz_attempts?: IQuizAttemptDTO[];
}

export interface ICreateQuizDTO {
  training_id: never;
}

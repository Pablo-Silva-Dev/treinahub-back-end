import { IQuestionOptionDTO } from "./QuestionOptionDTO";
import { IQuizResponseDTO } from "./QuizResponseDTO";

export interface IQuestionDTO {
  id: string;
  quiz_id: string;
  content: string;
  options: IQuestionOptionDTO[];
  correct_option_id: string;
  quiz_responses?: IQuizResponseDTO[];
}

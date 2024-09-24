export interface IQuizResponseDTO {
  id: string;
  quiz_attempt_id: string;
  question_id: string;
  selected_option_id: string;
  is_correct: boolean;
}

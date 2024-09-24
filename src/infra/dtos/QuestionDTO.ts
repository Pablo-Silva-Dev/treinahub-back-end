export interface IQuizQuestionDTO {
  id: string;
  quiz_id: string;
  content: string;
  correct_option_id: string;
}

export interface ICreateQuizQuestionDTO {
  quiz_id: string;
  content: string;
  correct_option_id: string;
}
export interface IUpdateQuizQuestionDTO {
  id: string;
  content?: string;
  correct_option_id?: string;
}

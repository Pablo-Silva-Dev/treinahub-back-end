export interface IQuizQuestionDTO {
  id: string;
  quiz_id: string;
  content: string;
}

export interface ICreateQuizQuestionDTO {
  quiz_id: string;
  content: string;
}

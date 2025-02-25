export interface IQuizQuestionDTO {
  id: string;
  quiz_id: string;
  content: string;
}

export interface ICreateQuizQuestionDTO {
  quiz_id: string;
  content: string;
}

export interface IUpdateQuizQuestionDTO {
  id: string;
  content?: string;
}

export interface IExplainQuestionDTO {
  questionId?: string;
  question: string;
  selectedOptionContent: string;
  correctOptionContent: string;
}

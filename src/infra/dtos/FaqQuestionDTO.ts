import { ICompanyDTO } from "./CompanyDTO";

export interface IFaqQuestionDTO {
  id: string;
  question: string;
  answer: string;
  company_id: string;
  company?: ICompanyDTO;
}

export interface ICreateFaqQuestionDTO {
  question: string;
  answer: string;
  company_id: string;
  company?: ICompanyDTO;
}

export interface IUpdateFaqQuestionDTO {
  id: string;
  question?: string;
  answer?: string;
}

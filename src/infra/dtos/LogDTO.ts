import { ICompanyDTO } from "./CompanyDTO";

export interface ILogDTO {
  id: string;
  user_id: string;
  created_at: Date;
  company_id: string;
  company?: ICompanyDTO;
}

export interface ICreateLogDTO {
  id: string;
  user_id: string;
  created_at: Date;
  company_id: string;
  company?: ICompanyDTO;
}

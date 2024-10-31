import { ICompanyDTO } from "./CompanyDTO";

export interface IContactSupportDTO {
  contact_number: string;
  name: string;
  company?: ICompanyDTO;
  company_id: string;
}

export interface ICreateContactSupportDTO {
  contact_number: string;
  name: string;
  email: string;
  company?: ICompanyDTO;
  company_id: string;
}

export interface IUpdateContactSupportDTO {
  id: string;
  contact_number?: string;
  name?: string;
  email?: string;
}

import { IUserDTO } from "@/infra/dtos/UserDTO";
export type TPlan =
  | "gold_mensal"
  | "silver_mensal"
  | "bronze_mensal"
  | "gold_anual"
  | "silver_anual"
  | "bronze_anual"
  | null;

export interface ICompanyDTO {
  id: string;
  fantasy_name: string;
  cnpj: string;
  social_reason: string;
  email: string;
  phone: string;
  cep: string;
  city: string;
  district: string;
  number_of_employees: string;
  company_sector: string;
  residence_complement: string;
  residence_number: string;
  street: string;
  uf: string;
  current_plan: TPlan;
  logo_url: string;
  users?: IUserDTO[];
  used_storage: number;
  number_of_additional_employees: number;
}

export interface ICreateCompanyDTO {
  fantasy_name: string;
  cnpj: string;
  social_reason: string;
  email: string;
  logo_url: string;
  phone?: string;
  cep: string;
  city: string;
  district: string;
  number_of_employees: string;
  company_sector: string;
  residence_complement: string;
  residence_number: string;
  street: string;
  uf: string;
}

export interface IUpdateCompanyDTO {
  id: string;
  fantasy_name?: string;
  email?: string;
  phone?: string;
  logo_url?: string;
  cep?: string;
  city?: string;
  district?: string;
  number_of_employees?: string;
  company_sector?: string;
  residence_complement?: string;
  residence_number?: string;
  street?: string;
  uf?: string;
}

export interface IUpdateCompanyPlanDTO {
  id: string;
  current_plan: TPlan;
  subscription_id: string;
}

export interface IUpdateCompanyLogoDTO {
  id: string;
  logo_url: string;
}

export interface IUpdateCompanyAdditionalUsers {
  id: string;
  number_of_additional_employees: number;
}

export interface IUpdateCompanyUsedStorage {
  id: string;
  used_storage: number;
}

import { IUserDTO } from "@/infra/dtos/UserDTO";
export type TPlan = "bronze" | "silver" | "gold";

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
  current_plan: TPlan;
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
}

export interface IUpdateCompanyPlanDTO {
  id: string;
  current_plan: TPlan;
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

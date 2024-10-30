import { IUserDTO } from '@/infra/dtos/UserDTO';
export type TPlan = "gold" | "platinum" | "diamond";

export interface ICompanyDTO {
  id: string;
  fantasy_name: string;
  cnpj: string;
  social_reason: string;
  email: string;
  phone: string;
  current_plan: TPlan;
  logo_url: string;
  users?: IUserDTO[];
}

export interface ICreateCompanyDTO {
  fantasy_name: string;
  cnpj: string;
  social_reason: string;
  email: string;
  current_plan: TPlan;
  logo_url: string;
  phone?: string;
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

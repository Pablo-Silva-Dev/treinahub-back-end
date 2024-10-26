import {
  ICompanyDTO,
  ICreateCompanyDTO,
  IUpdateCompanyDTO,
  IUpdateCompanyLogoDTO,
  IUpdateCompanyPlanDTO,
} from "@/infra/dtos/CompanyDTO";

export interface ICompaniesRepository {
  createCompany(data: ICreateCompanyDTO): Promise<ICompanyDTO>;
  getCompany(companyId: string): Promise<ICompanyDTO>;
  listCompanies(): Promise<ICompanyDTO[]>;
  updateCompany(data: IUpdateCompanyDTO): Promise<ICompanyDTO>;
  updateCompanyPlan(plan: IUpdateCompanyPlanDTO): Promise<ICompanyDTO>;
  updateCompanyLogo(logo_url: IUpdateCompanyLogoDTO): Promise<ICompanyDTO>;
  deleteCompany(companyId: string): Promise<void>;
}

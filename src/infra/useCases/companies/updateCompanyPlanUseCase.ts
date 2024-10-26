import { IUpdateCompanyPlanDTO } from "@/infra/dtos/CompanyDTO";
import { CompaniesImplementation } from "@/infra/repositories/implementations/companiesImplementation";
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class UpdateCompanyPlanUseCase {
  constructor(private companiesImplementation: CompaniesImplementation) {}
  async execute(data: IUpdateCompanyPlanDTO) {
    const { id } = data;
    const company = await this.companiesImplementation.getCompany(id);
    if (!company) {
      throw new NotFoundException("Company not found");
    }
    const updatedCompany =
      await this.companiesImplementation.updateCompanyPlan(data);
    return updatedCompany;
  }
}

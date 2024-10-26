import { CompaniesImplementation } from "@/infra/repositories/implementations/companiesImplementation";
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class DeleteCompanyUseCase {
  constructor(private companiesImplementation: CompaniesImplementation) {}
  async execute(companyId: string) {
    const company = await this.companiesImplementation.getCompany(companyId);
    if (!company) {
      throw new NotFoundException("Company not found");
    }
    const { id } = company;
    await this.companiesImplementation.deleteCompany(id);
  }
}

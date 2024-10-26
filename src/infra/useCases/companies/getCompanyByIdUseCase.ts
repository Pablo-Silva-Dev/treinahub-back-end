import { CompaniesImplementation } from "@/infra/repositories/implementations/companiesImplementation";
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class GetCompanyByIdUseCase {
  constructor(private companiesImplementation: CompaniesImplementation) {}
  async execute(companyId: string) {
    const company = await this.companiesImplementation.getCompany(companyId);
    if (!company) {
      throw new NotFoundException("Company not found");
    }
    return company;
  }
}

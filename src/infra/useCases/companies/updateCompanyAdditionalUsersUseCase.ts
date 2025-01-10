import { CompaniesImplementation } from "@/infra/repositories/implementations/companiesImplementation";
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class UpdateCompanyAdditionalUsersUseCase {
  constructor(private companiesImplementation: CompaniesImplementation) {}
  async execute(companyId) {
    const company = await this.companiesImplementation.getCompany(companyId);
    if (!company) {
      throw new NotFoundException("Company not found");
    }
    const updatedCompany =
      await this.companiesImplementation.updateCompanyAdditionalUsers(
        companyId
      );
    return updatedCompany;
  }
}

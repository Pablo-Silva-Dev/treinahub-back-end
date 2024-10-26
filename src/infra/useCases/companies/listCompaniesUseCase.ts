import { CompaniesImplementation } from "@/infra/repositories/implementations/companiesImplementation";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ListCompaniesUseCase {
  constructor(private companiesImplementation: CompaniesImplementation) {}
  async execute() {
    const companies = await this.companiesImplementation.listCompanies();
    return companies;
  }
}

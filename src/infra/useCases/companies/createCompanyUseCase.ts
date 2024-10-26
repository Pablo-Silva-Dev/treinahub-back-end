import { ICreateCompanyDTO } from "@/infra/dtos/CompanyDTO";
import { CompaniesImplementation } from "@/infra/repositories/implementations/companiesImplementation";
import { ConflictException, Injectable } from "@nestjs/common";

@Injectable()
export class CreateCompanyUseCase {
  constructor(private companiesImplementation: CompaniesImplementation) {}
  async execute(data: ICreateCompanyDTO) {
    const newCompany = await this.companiesImplementation.createCompany(data);
    if (!newCompany) {
      throw new ConflictException("A company with this CNPJ already exists.");
    }
    return newCompany;
  }
}

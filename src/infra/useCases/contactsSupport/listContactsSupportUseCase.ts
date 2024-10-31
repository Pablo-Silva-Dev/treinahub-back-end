import { CompaniesImplementation } from "@/infra/repositories/implementations/companiesImplementation";
import { ContactsSupportImplementation } from "@/infra/repositories/implementations/contactsSupportImplementation";
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class ListContactsSupportUseCase {
  constructor(
    private contactsSupportImplementation: ContactsSupportImplementation,
    private companiesImplementation: CompaniesImplementation
  ) {}
  async execute(companyId: string) {
    const company = await this.companiesImplementation.getCompany(companyId);
    if (!company) {
      throw new NotFoundException("Company not found");
    }
    const contactsSupports =
      await this.contactsSupportImplementation.listContactsSupport(companyId);
    return contactsSupports;
  }
}

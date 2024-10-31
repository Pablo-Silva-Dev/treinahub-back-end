import { CompaniesImplementation } from "@/infra/repositories/implementations/companiesImplementation";
import { FaqQuestionsImplementation } from "@/infra/repositories/implementations/faqQuestionsImplementation";
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class ListFaqQuestionsUseCase {
  constructor(
    private faqQuestionsImplementation: FaqQuestionsImplementation,
    private companiesImplementation: CompaniesImplementation
  ) {}
  async execute(companyId: string) {
    const company = await this.companiesImplementation.getCompany(companyId);
    if (!company) {
      throw new NotFoundException("Company not found");
    }
    const faqQuestions =
      await this.faqQuestionsImplementation.listFaqQuestions(companyId);
    return faqQuestions;
  }
}

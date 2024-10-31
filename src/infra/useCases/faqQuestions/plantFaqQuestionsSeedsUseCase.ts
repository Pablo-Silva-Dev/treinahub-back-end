import { IFaqQuestionSeedDTO } from "@/infra/dtos/FaqQuestionDTO";
import { CompaniesImplementation } from "@/infra/repositories/implementations/companiesImplementation";
import { FaqQuestionsImplementation } from "@/infra/repositories/implementations/faqQuestionsImplementation";
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class PlantFaqQuestionsUseCase {
  constructor(
    private faqQuestionsImplementation: FaqQuestionsImplementation,
    private companiesImplementation: CompaniesImplementation
  ) {}
  async execute(seeds: IFaqQuestionSeedDTO[], companyId: string) {
    const company = await this.companiesImplementation.getCompany(companyId);

    if (!company) {
      throw new NotFoundException("Company not found.");
    }

    await this.faqQuestionsImplementation.plantFaqQuestionsSeeds(
      seeds,
      companyId
    );
  }
}

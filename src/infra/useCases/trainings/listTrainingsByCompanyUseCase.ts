import { CompaniesImplementation } from "@/infra/repositories/implementations/companiesImplementation";
import { TrainingsImplementation } from "@/infra/repositories/implementations/trainingsImplementation";
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class ListTrainingsByCompanyUseCase {
  constructor(
    private trainingsImplementation: TrainingsImplementation,
    private companiesImplementation: CompaniesImplementation
  ) {}
  async execute(companyId: string) {
    const company = await this.companiesImplementation.getCompany(companyId);
    if (!company) {
      throw new NotFoundException("Not found a company for the provided id.");
    }

    const trainings =
      await this.trainingsImplementation.listTrainings(companyId);

    return trainings;
  }
}

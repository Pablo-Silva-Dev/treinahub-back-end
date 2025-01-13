import { CompaniesImplementation } from "@/infra/repositories/implementations/companiesImplementation";
import { VideoClassesImplementation } from "@/infra/repositories/implementations/videoClassesImplementation";
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class ListVideoClassesByCompanyUseCase {
  constructor(
    private videoClassesImplementation: VideoClassesImplementation,
    private companiesImplementation: CompaniesImplementation
  ) {}
  async execute(companyId: string) {
    const company =
      await this.companiesImplementation.getCompany(companyId);

    if (!company) {
      throw new NotFoundException("Company not found");
    }

    const videoClasses =
      await this.videoClassesImplementation.listVideoClassesByCompany(
        companyId
      );
    return videoClasses;
  }
}

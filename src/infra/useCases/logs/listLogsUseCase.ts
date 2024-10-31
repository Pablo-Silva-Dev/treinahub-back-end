import { CompaniesImplementation } from "@/infra/repositories/implementations/companiesImplementation";
import { LogsImplementation } from "@/infra/repositories/implementations/logsImplementation";
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class ListLogsUseCase {
  constructor(
    private logsImplementation: LogsImplementation,
    private companiesImplementation: CompaniesImplementation
  ) {}
  async execute(companyId: string) {
    const company = await this.companiesImplementation.getCompany(companyId);
    if (!company) {
      throw new NotFoundException("Company not found");
    }
    const logs = await this.logsImplementation.listLogs(companyId);
    return logs;
  }
}

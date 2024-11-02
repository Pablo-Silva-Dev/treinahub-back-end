import { CompaniesImplementation } from "@/infra/repositories/implementations/companiesImplementation";
import { UsersImplementation } from "@/infra/repositories/implementations/usersImplementation";
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class ListUsersUseCase {
  constructor(
    private usersImplementation: UsersImplementation,
    private companiesImplementation: CompaniesImplementation
  ) {}
  async execute(companyId: string) {
    const company = await this.companiesImplementation.getCompany(companyId);
    if (!company) {
      throw new NotFoundException("Company not found.");
    }
    const users = await this.usersImplementation.listUsers(companyId);
    return users;
  }
}

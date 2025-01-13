import {
  ICompanyDTO,
  ICreateCompanyDTO,
  IUpdateCompanyDTO,
  IUpdateCompanyLogoDTO,
  IUpdateCompanyPlanDTO,
  IUpdateCompanyUsedStorage,
} from "@/infra/dtos/CompanyDTO";
import { PrismaService } from "@/infra/services/prisma";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TEnvSchema } from "env";
import { ICompaniesRepository } from "../interfaces/companiesRepository";

@Injectable()
export class CompaniesImplementation implements ICompaniesRepository {
  constructor(
    private prisma: PrismaService,
    private configService: ConfigService<TEnvSchema>
  ) {}
  async createCompany(data: ICreateCompanyDTO): Promise<ICompanyDTO> {
    const { cnpj } = data;

    const companyAlreadyExists = await this.prisma.company.findFirst({
      where: {
        cnpj,
      },
    });

    if (companyAlreadyExists) {
      return null;
    }

    const newCompany = await this.prisma.company.create({ data });
    return newCompany;
  }

  async listCompanies(): Promise<ICompanyDTO[]> {
    const companies = this.prisma.company.findMany();
    return companies;
  }

  async getCompany(companyId: string): Promise<ICompanyDTO> {
    const company = await this.prisma.company.findUnique({
      where: {
        id: companyId,
      },
      include: {
        users: {
          select: {
            name: true,
            is_admin: true,
          },
        },
        trainings: true,
      },
    });

    if (!company) {
      return null;
    }

    return company as never;
  }
  async updateCompany(data: IUpdateCompanyDTO): Promise<ICompanyDTO> {
    const { id } = data;

    const companyExists = await this.prisma.company.findUnique({
      where: {
        id,
      },
    });

    if (!companyExists) {
      return null;
    }

    const updatedCompany = await this.prisma.company.update({
      where: {
        id,
      },
      data,
    });

    return updatedCompany;
  }
  async updateCompanyPlan(data: IUpdateCompanyPlanDTO): Promise<ICompanyDTO> {
    const { id } = data;

    const companyExists = await this.prisma.company.findUnique({
      where: {
        id,
      },
    });

    if (!companyExists) {
      return null;
    }

    const updatedCompany = await this.prisma.company.update({
      where: {
        id,
      },
      data,
    });

    return updatedCompany;
  }
  async updateCompanyLogo(data: IUpdateCompanyLogoDTO): Promise<ICompanyDTO> {
    const { id } = data;

    const companyExists = await this.prisma.company.findUnique({
      where: {
        id,
      },
    });

    if (!companyExists) {
      return null;
    }

    const updatedCompany = await this.prisma.company.update({
      where: {
        id,
      },
      data,
    });

    return updatedCompany;
  }
  async deleteCompany(companyId: string): Promise<void> {
    const companyExists = await this.prisma.company.findUnique({
      where: {
        id: companyId,
      },
    });

    if (!companyExists) {
      return null;
    }

    await this.prisma.company.delete({ where: { id: companyId } });
  }

  async updateCompanyAdditionalUsers(companyId: string): Promise<ICompanyDTO> {
    const company = await this.getCompany(companyId);
    if (!company) {
      return null;
    }

    const currentPlan = company.current_plan;
    const employees = company.users.filter((user) => !user.is_admin).length;

    const maxAllowedFreeUsersBronzePlan = this.configService.get(
      "VITE_FREE_EMPLOYEES_LIMIT_BRONZE_PLAN"
    );
    const maxAllowedFreeUsersSilverPlan = this.configService.get(
      "VITE_FREE_EMPLOYEES_LIMIT_SILVER_PLAN"
    );
    const maxAllowedFreeUsersGoldPlan = this.configService.get(
      "VITE_FREE_EMPLOYEES_LIMIT_GOLD_PLAN"
    );

    if (
      (currentPlan === "bronze" &&
        employees >= maxAllowedFreeUsersBronzePlan) ||
      (currentPlan === "silver" &&
        employees >= maxAllowedFreeUsersSilverPlan) ||
      (currentPlan === "gold" && employees >= maxAllowedFreeUsersGoldPlan)
    ) {
      const updatedCompany = await this.prisma.company.update({
        where: {
          id: companyId,
        },
        data: {
          number_of_additional_employees:
            company.number_of_additional_employees + 1,
        },
      });

      return updatedCompany;
    }
  }

  async updateCompanyUsedStorage(
    data: IUpdateCompanyUsedStorage
  ): Promise<ICompanyDTO> {
    const company = await this.prisma.company.findUnique({
      where: {
        id: data.id,
      },
    });

    if (!company) {
      return null;
    }

    const updatedCompany = await this.prisma.company.update({
      where: {
        id: data.id,
      },
      data: {
        used_storage: data.used_storage,
      },
    });

    return updatedCompany;
  }
}

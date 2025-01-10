import {
  ICompanyDTO,
  ICreateCompanyDTO,
  IUpdateCompanyDTO,
  IUpdateCompanyLogoDTO,
  IUpdateCompanyPlanDTO,
} from "@/infra/dtos/CompanyDTO";
import { PrismaService } from "@/infra/services/prisma";
import { Injectable } from "@nestjs/common";
import { ICompaniesRepository } from "../interfaces/companiesRepository";

@Injectable()
export class CompaniesImplementation implements ICompaniesRepository {
  constructor(private prisma: PrismaService) {}
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
            is_admin: true
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
}

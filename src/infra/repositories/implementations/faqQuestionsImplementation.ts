import {
  ICreateFaqQuestionDTO,
  IFaqQuestionDTO,
  IFaqQuestionSeedDTO,
  IUpdateFaqQuestionDTO,
} from "@/infra/dtos/FaqQuestionDTO";
import { PrismaService } from "@/infra/services/prisma";
import { Injectable } from "@nestjs/common";
import { IFaqQuestionsRepository } from "../interfaces/faqQuestionsRepository";

@Injectable()
export class FaqQuestionsImplementation implements IFaqQuestionsRepository {
  constructor(private prisma: PrismaService) {}

  async createFaqQuestion(
    data: ICreateFaqQuestionDTO
  ): Promise<IFaqQuestionDTO> {
    const { question } = data;
    const questionAlreadyExists = await this.prisma.faqQuestion.findFirst({
      where: {
        question,
      },
    });
    if (questionAlreadyExists) {
      return;
    }
    const newFaqQuestion = await this.prisma.faqQuestion.create({
      data,
    } as never);
    return newFaqQuestion;
  }
  async listFaqQuestions(companyId: string): Promise<IFaqQuestionDTO[]> {
    const company = await this.prisma.company.findUnique({
      where: {
        id: companyId,
      },
    });

    if (!company) {
      return null;
    }

    const faqQuestions = await this.prisma.faqQuestion.findMany({
      where: {
        company_id: companyId,
      },
    });
    return faqQuestions;
  }

  async getFaqQuestionByQuestion(
    question: string
  ): Promise<IFaqQuestionDTO | void> {
    const faqQuestion = await this.prisma.faqQuestion.findFirst({
      where: {
        question,
      },
    });
    return faqQuestion;
  }

  async getFaqQuestionById(id: string): Promise<IFaqQuestionDTO | void> {
    const faqQuestion = await this.prisma.faqQuestion.findFirst({
      where: {
        id,
      },
    });
    return faqQuestion;
  }

  async updateFaqQuestion(
    data: IUpdateFaqQuestionDTO
  ): Promise<IFaqQuestionDTO> {
    const { id } = data;
    const faqQuestion = await this.prisma.faqQuestion.findUnique({
      where: {
        id,
      },
    });

    if (!faqQuestion) {
      return;
    }
    const updatedFaqQuestion = await this.prisma.faqQuestion.update({
      where: {
        id,
      },
      data,
    });
    return updatedFaqQuestion;
  }
  async deleteFaqQuestion(faqQuestionId: string): Promise<void> {
    const faqQuestion = await this.prisma.faqQuestion.findUnique({
      where: {
        id: faqQuestionId,
      },
    });

    if (!faqQuestion) {
      return;
    }
    await this.prisma.faqQuestion.delete({
      where: {
        id: faqQuestionId,
      },
    });
  }

  async plantFaqQuestionsSeeds(
    seeds: IFaqQuestionSeedDTO[],
    companyId: string
  ) {
    for (const seed of seeds) {
      try {
        const plantedSeed = await this.prisma.faqQuestion.create({
          data: { ...seed, company_id: companyId },
        });
        console.log("Seeds planted: ", plantedSeed);
      } catch (error) {
        console.log("Error at planting seed: ", error);
      }
    }
  }
}

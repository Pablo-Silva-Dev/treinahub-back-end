import {
  ICreateQuestionOptionDTO,
  IQuestionOptionDTO,
} from "@/infra/dtos/QuestionOptionDTO";
import { PrismaService } from "@/infra/services/prisma";
import { Injectable } from "@nestjs/common";
import { IQuestionsOptionsRepository } from "../interfaces/questionsOptionsRepository";

@Injectable()
export class QuestionsOptionsImplementation
  implements IQuestionsOptionsRepository
{
  constructor(private prisma: PrismaService) {}
  async createQuestionOption(
    data: ICreateQuestionOptionDTO
  ): Promise<IQuestionOptionDTO> {
    const { question_id } = data;
    const question = await this.prisma.question.findUnique({
      where: {
        id: question_id,
      },
    });
    if (!question) {
      return null;
    }
    const newQuestionOption = await this.prisma.option.create({ data });
    return newQuestionOption;
  }
  async listQuestionOptions(
    quizQuestionId: string
  ): Promise<IQuestionOptionDTO[]> {
    const question = await this.prisma.question.findUnique({
      where: {
        id: quizQuestionId,
      },
    });
    if (!question) {
      return null;
    }

    const options = await this.prisma.option.findMany({
      where: {
        question_id: quizQuestionId,
      },
    });
    return options;
  }
  async getQuestionOptionById(
    questionOptionId: string
  ): Promise<IQuestionOptionDTO | void> {
    const option = await this.prisma.option.findFirst({
      where: {
        id: questionOptionId,
      },
    });
    if (!option) {
      return null;
    }
    return option;
  }
  async deleteQuestionOption(questionOptionId: string): Promise<void> {
    const option = await this.prisma.option.findUnique({
      where: {
        id: questionOptionId,
      },
    });
    if (!option) {
      return null;
    }
    await this.prisma.option.delete({
      where: {
        id: questionOptionId,
      },
    });
  }
}

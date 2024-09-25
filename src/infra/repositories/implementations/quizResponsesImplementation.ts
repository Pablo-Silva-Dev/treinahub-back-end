import {
  ICreateQuizResponseDTO,
  IQuizResponseDTO,
} from "@/infra/dtos/QuizResponseDTO";
import { PrismaService } from "@/infra/services/prisma";
import { Injectable } from "@nestjs/common";
import { IQuizResponseRepository } from "../interfaces/quizResponsesRepository";

@Injectable()
export class QuizResponsesImplementation implements IQuizResponseRepository {
  constructor(private prisma: PrismaService) {}

  async createQuizResponse(
    data: ICreateQuizResponseDTO
  ): Promise<IQuizResponseDTO> {
    const { question_id, quiz_attempt_id, selected_option_id } = data;

    const quizAttempt = await this.prisma.quizAttempt.findUnique({
      where: {
        id: quiz_attempt_id,
      },
    });

    const question = await this.prisma.question.findUnique({
      where: {
        id: question_id,
      },
    });

    const option = await this.prisma.option.findUnique({
      where: {
        id: selected_option_id,
      },
    });

    if (!quizAttempt || !question || !option) {
      return null;
    }

    const newQuizResponse = await this.prisma.quizResponse.create({
      data,
    });

    return newQuizResponse;
  }

  async listQuizResponsesByQuizAttempt(
    quizAttemptId: string
  ): Promise<IQuizResponseDTO[]> {
    const quizAttempt = await this.prisma.quizAttempt.findUnique({
      where: {
        id: quizAttemptId,
      },
    });

    if (!quizAttempt) {
      return null;
    }

    const quizResponses = await this.prisma.quizResponse.findMany({
      where: { quiz_attempt_id: quizAttemptId },
      include: {
        selected_option: true,
        question: true,
      },
    });

    return quizResponses;
  }

  async getQuizResponseById(
    quizResponseId: string
  ): Promise<IQuizResponseDTO | void> {
    const quizResponse = await this.prisma.quizResponse.findUnique({
      where: { id: quizResponseId },
      include: {
        selected_option: true,
        question: true,
      },
    });

    return quizResponse || null;
  }
}

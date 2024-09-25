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
      include: {
        options: true,
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

    const correctOption = question.options.find((option) => option.is_correct);

    return { ...newQuizResponse, correct_option: correctOption };
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
        question: {
          include: {
            options: true,
          },
        },
      },
    });

    quizResponses;

    return quizResponses.map((qr) => {
      const correctOption = qr.question.options.find(
        (option) => option.is_correct
      );
      return { ...qr, correct_option: correctOption };
    });
  }

  async getQuizResponseById(
    quizResponseId: string
  ): Promise<IQuizResponseDTO | void> {
    const quizResponse = await this.prisma.quizResponse.findUnique({
      where: { id: quizResponseId },
      include: {
        selected_option: true,
        question: {
          include: {
            options: true,
          },
        },
      },
    });

    if (!quizResponse) {
      return null;
    }
    const correctOption = quizResponse.question.options.find(
      (option) => option.is_correct
    );

    return { ...quizResponse, correct_option: correctOption } || null;
  }
}

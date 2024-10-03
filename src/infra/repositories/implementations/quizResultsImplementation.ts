import {
  ICreateQuizResultDTO,
  IGetQuizResultDTO,
  IQuizResultDTO,
} from "@/infra/dtos/QuizResultDTO";
import { PrismaService } from "@/infra/services/prisma";
import { Injectable } from "@nestjs/common";
import { IQuizResultsRepository } from "../interfaces/quizResultsRepository";

@Injectable()
export class QuizResultsImplementation implements IQuizResultsRepository {
  constructor(private prisma: PrismaService) {}
  async createQuizResult(data: ICreateQuizResultDTO): Promise<IQuizResultDTO> {
    const { quiz_attempt_id, quiz_id, user_id } = data;

    const user = await this.prisma.user.findUnique({
      where: {
        id: user_id,
      },
    });

    const quiz = await this.prisma.quiz.findUnique({
      where: {
        id: quiz_id,
      },
    });

    const quizAttempt = await this.prisma.quizAttempt.findUnique({
      where: {
        id: quiz_attempt_id,
      },
    });

    if (!user || !quiz || !quizAttempt) {
      return null;
    }

    const quizResponses = await this.prisma.quizResponse.findMany({
      where: {
        quiz_attempt_id,
        quiz_attempt: {
          user_id,
        },
      },
      include: {
        selected_option: true,
      },
    });

    const quizQuestions = await this.prisma.question.findMany({
      where: {
        quiz_id,
      },
    });

    const quizResultAlreadyExists = await this.prisma.quizResult.findFirst({
      where: {
        user_id,
        quiz_attempt_id,
      },
    });

    if (quizResultAlreadyExists) {
      return null;
    }

    const totalQuizQuestions = quizQuestions.length;
    const totalQuizCorrectQuestions = quizResponses.filter(
      (r) => r.selected_option.is_correct
    ).length;
    const totalQuizCorrectQuestionsPercentage =
      (totalQuizCorrectQuestions / totalQuizQuestions) * 100;

    const quizResult = {
      ...data,
      total_quiz_questions: totalQuizQuestions,
      total_correct_questions: totalQuizCorrectQuestions,
      total_correct_questions_percentage: totalQuizCorrectQuestionsPercentage,
    };

    const newQuizResult = await this.prisma.quizResult.create({
      data: quizResult,
    });

    return newQuizResult;
  }
  async getQuizResultByUserAndAttempt(
    data: IGetQuizResultDTO
  ): Promise<IQuizResultDTO> {
    const { quiz_attempt_id, user_id } = data;

    const user = await this.prisma.user.findUnique({
      where: {
        id: user_id,
      },
    });

    const quizAttempt = await this.prisma.quizAttempt.findUnique({
      where: {
        id: quiz_attempt_id,
      },
    });

    if (!user || !quizAttempt) {
      return null;
    }

    const quizResult = await this.prisma.quizResult.findFirst({
      where: {
        quiz_attempt_id,
        user_id,
      },
    });
    return quizResult;
  }

  async getQuizResultById(quizResultId: string) {
    const quizResult = await this.prisma.quizResult.findUnique({
      where: {
        id: quizResultId,
      },
    });

    if (!quizResult) {
      return null;
    }

    return quizResult;
  }

  async deleteQuizResult(quizResultId: string) {
    const quizResult = await this.prisma.quizResult.findUnique({
      where: {
        id: quizResultId,
      },
    });

    if (!quizResult) {
      return null;
    }

    await this.prisma.quizResult.delete({
      where: {
        id: quizResultId,
      },
    });
  }
}

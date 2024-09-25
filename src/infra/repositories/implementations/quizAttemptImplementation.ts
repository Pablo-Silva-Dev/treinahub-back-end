import {
  ICreateQuizAttemptDTO,
  IQuizAttemptDTO,
} from "@/infra/dtos/QuizAttemptDTO";
import { PrismaService } from "@/infra/services/prisma";
import { Injectable } from "@nestjs/common";
import { IQuizAttemptRepository } from "../interfaces/quizAttemptsRepository";

@Injectable()
export class QuizAttemptRepositoryImplementation
  implements IQuizAttemptRepository
{
  constructor(private prisma: PrismaService) {}

  async createQuizAttempt(
    data: ICreateQuizAttemptDTO
  ): Promise<IQuizAttemptDTO> {
    const { quiz_id, user_id } = data;

    const quiz = await this.prisma.quiz.findFirst({
      where: { id: quiz_id },
    });

    if (!quiz) {
      return null;
    }

    const user = await this.prisma.user.findFirst({
      where: { id: user_id },
    });

    if (!user) {
      return null;
    }

    const newQuizAttempt = await this.prisma.quizAttempt.create({ data });
    return newQuizAttempt;
  }

  async getQuizAttemptById(
    quizAttemptId: string
  ): Promise<IQuizAttemptDTO | void> {
    const quizAttempt = await this.prisma.quizAttempt.findUnique({
      where: { id: quizAttemptId },
      include: {
        quiz_responses: true,
        quiz: true,
      },
    });
    return quizAttempt;
  }

  async listQuizAttemptsByUser(userId: string): Promise<IQuizAttemptDTO[]> {
    const quizAttempts = await this.prisma.quizAttempt.findMany({
      where: { user_id: userId },
      include: {
        quiz_responses: true,
        quiz: true,
      },
    });
    return quizAttempts;
  }
}

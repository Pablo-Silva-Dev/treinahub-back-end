import { ICreateQuizDTO, IQuizDTO } from "@/infra/dtos/QuizDTO";
import { IQuizzesRepository } from "@/infra/repositories/interfaces/quizzesRepository";
import { PrismaService } from "@/infra/services/prisma";
import { Injectable } from "@nestjs/common";

@Injectable()
export class QuizzesImplementation implements IQuizzesRepository {
  constructor(private prisma: PrismaService) {}

  async createQuiz(data: ICreateQuizDTO): Promise<IQuizDTO> {
    const { training_id } = data;

    const trainingExists = await this.prisma.training.findUnique({
      where: {
        id: training_id,
      },
    });

    if (!trainingExists) {
      return null;
    }

    const quizAlreadyExistsForTraining = await this.prisma.quiz.findFirst({
      where: {
        training_id,
      },
    });

    if (quizAlreadyExistsForTraining) {
      return null;
    }

    const newQuiz = await this.prisma.quiz.create({
      data,
      include: { training: true },
    });
    return newQuiz;
  }
  async listQuizzes(): Promise<IQuizDTO[]> {
    const quizzes = await this.prisma.quiz.findMany({
      include: {
        questions: {
          include: {
            options: true,
            quiz: {
              include: {
                training: true,
              },
            },
          },
        },
        quiz_attempts: true,
        training: true,
      },
    });
    return quizzes;
  }

  async getQuizById(quiz_id: string): Promise<IQuizDTO | void> {
    const quiz = await this.prisma.quiz.findUnique({
      where: {
        id: quiz_id,
      },
    });
    if (!quiz) {
      return null;
    }
    return quiz;
  }

  async getQuizByTraining(training_id: string): Promise<IQuizDTO | void> {
    const training = await this.prisma.training.findUnique({
      where: {
        id: training_id,
      },
    });
    if (!training) {
      return null;
    }

    const quiz = await this.prisma.quiz.findFirst({
      where: {
        training_id,
      },
      include: {
        training: true,
        questions: {
          include: {
            options: true,
          },
        },
      },
    });

    return quiz;
  }

  async deleteQuiz(quiz_id: string): Promise<void> {
    const quiz = await this.prisma.quiz.findUnique({
      where: {
        id: quiz_id,
      },
    });
    if (!quiz) {
      return null;
    }
    await this.prisma.quiz.delete({
      where: {
        id: quiz_id,
      },
    });
  }
}

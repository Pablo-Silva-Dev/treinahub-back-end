import {
  ICreateQuizQuestionDTO,
  IQuizQuestionDTO,
  IUpdateQuizQuestionDTO,
} from "@/infra/dtos/QuestionDTO";
import { PrismaService } from "@/infra/services/prisma";
import { Injectable } from "@nestjs/common";
import { IQuizQuestionsRepository } from "../interfaces/quizQuestionsRepository";

@Injectable()
export class QuizQuestionsImplementation implements IQuizQuestionsRepository {
  constructor(private prisma: PrismaService) {}
  async createQuizQuestion(
    data: ICreateQuizQuestionDTO
  ): Promise<IQuizQuestionDTO> {
    const { quiz_id } = data;

    const quiz = await this.prisma.quiz.findFirst({
      where: {
        id: quiz_id,
      },
    });

    if (!quiz) {
      return null;
    }

    const newQuizQuestion = await this.prisma.question.create({ data });
    return newQuizQuestion;
  }
  async listQuizQuestionsByQuiz(quizId: string): Promise<IQuizQuestionDTO[]> {
    const quiz = await this.prisma.quiz.findUnique({
      where: {
        id: quizId,
      },
    });
    if (!quiz) {
      return null;
    }

    const questions = await this.prisma.question.findMany({
      where: {
        quiz_id: quizId,
      },
      include: {
        options: true,
        quiz: {
          include: {
            training: true,
          },
        },
      },
    });
    return questions;
  }
  async getQuizQuestionById(
    question_id: string
  ): Promise<IQuizQuestionDTO | void> {
    const question = await this.prisma.question.findUnique({
      where: { id: question_id },
    });
    return question;
  }

  async updateQuizQuestion(
    data: IUpdateQuizQuestionDTO
  ): Promise<IQuizQuestionDTO> {
    const { id } = data;
    const quizQuestion = await this.prisma.question.findUnique({
      where: { id },
    });
    if (!quizQuestion) {
      return null;
    }
    const updatedQuestion = await this.prisma.question.update({
      where: {
        id,
      },
      data,
    });
    return updatedQuestion;
  }

  async deleteQuizQuestion(questionId: string): Promise<void> {
    const quiz = await this.prisma.question.findUnique({
      where: {
        id: questionId,
      },
    });
    if (!quiz) {
      return null;
    }
    await this.prisma.question.delete({
      where: {
        id: questionId,
      },
    });
  }
}

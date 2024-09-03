import {
  ICreateITrainingMetricsDTO,
  ITrainingMetricsDTO,
  IUpdateITrainingMetricsDTO,
} from "@/infra/dtos/TrainingMetricDTO";
import { PrismaService } from "@/infra/services/prisma";
import { Injectable } from "@nestjs/common";
import { ITrainingMetricsRepository } from "../interfaces/trainingMetricsRepository";

@Injectable()
export class TrainingMetricsImplementation
  implements ITrainingMetricsRepository
{
  constructor(private prisma: PrismaService) {}

  async createTrainingMetrics(
    data: ICreateITrainingMetricsDTO
  ): Promise<ITrainingMetricsDTO> {
    const { user_id, training_id } = data;
    const user = await this.prisma.user.findUnique({
      where: {
        id: user_id,
      },
    });
    const training = await this.prisma.training.findUnique({
      where: {
        id: training_id,
      },
    });
    const trainingMetricsAlreadyExists =
      await this.prisma.trainingMetrics.findFirst({
        where: {
          user_id,
          training_id,
        },
      });

    if (!user || !training) {
      return;
    }

    if (trainingMetricsAlreadyExists) {
      return;
    }
    const newTrainingMetrics = await this.prisma.trainingMetrics.create({
      data,
    });
    return newTrainingMetrics;
  }
  async listTrainingMetrics(): Promise<ITrainingMetricsDTO[]> {
    const trainingMetrics = await this.prisma.trainingMetrics.findMany({
      include: { user: true, training: true },
    });
    return trainingMetrics;
  }
  async listTrainingMetricsByUser(
    user_id: string
  ): Promise<ITrainingMetricsDTO[]> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: user_id,
      },
    });

    if (!user) {
      return;
    }

    const trainingMetrics = await this.prisma.trainingMetrics.findMany({
      where: {
        user_id: user.id,
      },
      include: { user: true, training: true },
    });
    return trainingMetrics;
  }
  async getTrainingMetricsByTrainingAndUser(
    user_id: string,
    training_id: string
  ): Promise<ITrainingMetricsDTO | void> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: user_id,
      },
    });
    const training = await this.prisma.training.findUnique({
      where: {
        id: training_id,
      },
    });
    if (!user || !training) {
      return;
    }
    const trainingMetrics = await this.prisma.trainingMetrics.findFirst({
      where: {
        user_id,
        training_id,
      },
      include: { user: true, training: true },
    });
    return trainingMetrics;
  }

  async getTrainingMetricsById(
    id: string
  ): Promise<ITrainingMetricsDTO | void> {
    const trainingMetrics = await this.prisma.trainingMetrics.findUnique({
      where: {
        id,
      },
      include: { user: true, training: true },
    });

    if (!trainingMetrics) {
      return;
    }
    return trainingMetrics;
  }

  async updateTrainingMetrics(data: IUpdateITrainingMetricsDTO) {
    const { id } = data;

    const trainingMetrics = await this.prisma.trainingMetrics.findUnique({
      where: {
        id,
      },
    });

    if (!trainingMetrics) {
      return;
    }

    const updatedTrainingMetrics = await this.prisma.trainingMetrics.update({
      where: {
        id,
      },
      data,
    });
    return updatedTrainingMetrics;
  }
}

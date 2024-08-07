import {
  ICreateTrainingDTO,
  ITrainingDTO,
  IUpdateTrainingDTO,
} from "@/infra/dtos/TrainingDTO";
import { PrismaService } from "@/infra/services/prisma";
import { Injectable } from "@nestjs/common";
import { ITrainingsRepository } from "../interfaces/trainingsRepository";

@Injectable()
export class TrainingsImplementation implements ITrainingsRepository {
  constructor(private prisma: PrismaService) {}

  async createTraining(data: ICreateTrainingDTO): Promise<ITrainingDTO> {
    const newTraining = await this.prisma.training.create({
      data,
    });
    return newTraining;
  }

  async listTrainings(): Promise<ITrainingDTO[] | []> {
    const trainings = await this.prisma.training.findMany({
      include: {
        video_classes: true,
      },
    });
    return trainings;
  }

  async getTrainingById(id: string): Promise<ITrainingDTO | void> {
    const training = await this.prisma.training.findUnique({
      where: { id },
      include: {
        video_classes: true,
      },
    });
    if (training) {
      return training;
    }
  }

  async getTrainingByName(name: string): Promise<ITrainingDTO | void> {
    const training = await this.prisma.training.findUnique({
      where: { name },
      include: {
        video_classes: true,
      },
    });
    if (training) {
      return training;
    }
  }

  async updateTraining(data: IUpdateTrainingDTO): Promise<ITrainingDTO | void> {
    const { id, ...updateData } = data;
    const training = await this.prisma.training.findUnique({
      where: { id },
    });

    if (training) {
      const updatedTraining = await this.prisma.training.update({
        where: { id },
        data: updateData,
      });
      return updatedTraining;
    }
  }

  async deleteTraining(id: string): Promise<void> {
    const training = await this.prisma.training.findUnique({
      where: { id },
    });

    if (training) {
      await this.prisma.training.delete({
        where: { id },
      });
    }
  }
}

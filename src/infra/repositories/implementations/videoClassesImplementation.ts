import {
  ICreateVideoClassDTO,
  IUpdateVideoClassDTO,
  IVideoClassDTO,
} from "@/infra/dtos/VideoClassDTO";
import { PrismaService } from "@/infra/services/prisma";
import { Injectable } from "@nestjs/common";
import { IVideoClassesRepository } from "../interfaces/videoClassesRepository";

@Injectable()
export class VideoClassesImplementation implements IVideoClassesRepository {
  constructor(private prisma: PrismaService) {}
  async createVideoClass(data: ICreateVideoClassDTO): Promise<IVideoClassDTO> {
    const { name, training_id, url } = data;
    const videoClassNameForTrainingAlreadyExists =
      await this.prisma.videoClass.findFirst({
        where: {
          name,
          training_id,
        },
      });

    const videoClassUrlForTrainingAlreadyExists =
      await this.prisma.videoClass.findFirst({
        where: {
          url,
          training_id,
        },
      });

    const training = await this.prisma.training.findUnique({
      where: {
        id: training_id,
      },
    });

    if (
      videoClassNameForTrainingAlreadyExists ||
      videoClassUrlForTrainingAlreadyExists
    ) {
      return;
    }
    if (!training) {
      return;
    }
    const newVideoClass = await this.prisma.videoClass.create({
      data,
    });
    return newVideoClass;
  }
  async listVideoClasses(): Promise<IVideoClassDTO[]> {
    const videoClasses = await this.prisma.videoClass.findMany();
    return videoClasses;
  }
  async listVideoClassesByTraining(
    trainingId: string
  ): Promise<IVideoClassDTO[]> {
    const training = await this.prisma.training.findUnique({
      where: {
        id: trainingId,
      },
    });

    if (!training) {
      return;
    }
    const videoClasses = await this.prisma.videoClass.findMany({
      where: {
        training_id: trainingId,
      },
    });
    return videoClasses;
  }
  async getVideoClassById(
    videoClassId: string
  ): Promise<IVideoClassDTO | void> {
    const videoClass = await this.prisma.videoClass.findUnique({
      where: {
        id: videoClassId,
      },
    });
    return videoClass;
  }

  async getVideoClassByNameAndTrainingId(
    name: string,
    trainingId: string
  ): Promise<IVideoClassDTO | void> {
    const videoClass = await this.prisma.videoClass.findFirst({
      where: {
        training_id: trainingId,
        name,
      },
    });
    if (!videoClass) {
      return;
    }
    return videoClass;
  }
  async getVideoClassByUrlAndTrainingId(
    url: string,
    trainingId: string
  ): Promise<IVideoClassDTO | void> {
    const videoClass = await this.prisma.videoClass.findFirst({
      where: {
        training_id: trainingId,
        url,
      },
    });
    if (!videoClass) {
      return;
    }
    return videoClass;
  }

  async updateVideoClass(data: IUpdateVideoClassDTO): Promise<IVideoClassDTO> {
    const { id } = data;

    const videoClass = await this.prisma.videoClass.findUnique({
      where: {
        id,
      },
    });

    if (!videoClass) {
      return;
    }

    const updatedVideoClass = await this.prisma.videoClass.update({
      where: {
        id,
      },
      data,
    });
    return updatedVideoClass;
  }
  async deleteVideoClass(videoClassId: string): Promise<void> {
    const videoClass = await this.prisma.videoClass.findUnique({
      where: {
        id: videoClassId,
      },
    });

    if (!videoClass) {
      return;
    }

    await this.prisma.videoClass.delete({
      where: {
        id: videoClassId,
      },
    });
  }
}

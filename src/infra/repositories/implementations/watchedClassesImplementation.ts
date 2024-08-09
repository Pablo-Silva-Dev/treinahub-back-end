import {
  ICreateWatchedClassesDTO,
  IWatchedClassesDTO,
} from "@/infra/dtos/WatchedClassDTO";
import { PrismaService } from "@/infra/services/prisma";
import { Injectable } from "@nestjs/common";
import { IWatchedClassesRepository } from "../interfaces/watchedClassesRepository";

@Injectable()
export class WatchedClassesImplementation implements IWatchedClassesRepository {
  constructor(private prisma: PrismaService) {}

  async createWatchedClass(
    data: ICreateWatchedClassesDTO
  ): Promise<IWatchedClassesDTO> {
    const { user_id, videoclass_id, training_id } = data;

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

    const videoClass = await this.prisma.videoClass.findUnique({
      where: {
        id: videoclass_id,
      },
    });

    const classWasWatchedAlready = await this.prisma.watchedClasses.findFirst({
      where: {
        user_id,
        videoclass_id,
      },
    });

    if (!user || !training || !videoClass) {
      return;
    }
    if (classWasWatchedAlready) {
      return;
    }
    const newWatchedClass = await this.prisma.watchedClasses.create({ data });
    return newWatchedClass;
  }
  async listWatchedClasses(): Promise<IWatchedClassesDTO[]> {
    const watchedClasses = await this.prisma.watchedClasses.findMany();
    return watchedClasses;
  }

  async listWatchedClassesByUserIdAndTrainingId(
    user_id: string,
    training_id: string
  ): Promise<IWatchedClassesDTO[]> {
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

    const watchedClasses = await this.prisma.watchedClasses.findFirst({
      where: {
        user_id,
        training_id,
      },
    });
    return watchedClasses as never;
  }

  async getUniqueWatchedClass(
    userId: string,
    videoClassId: string
  ): Promise<IWatchedClassesDTO | void> {
    const watchedClass = await this.prisma.watchedClasses.findFirst({
      where: {
        user_id: userId,
        videoclass_id: videoClassId,
      },
    });
    if (!watchedClass) {
      return;
    }
    return watchedClass;
  }
}

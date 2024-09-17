import {
  ICreateWatchedClassesDTO,
  IGetWatchedClassByUserAndVideoDTO,
  IRemoveWatchedClassDTO,
  IUpdateVideoClassExecutionStatusDTO,
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
    const watchedClasses = await this.prisma.watchedClasses.findMany({
      include: { user: true, videoclass: true },
    });
    return watchedClasses;
  }
  async listWatchedClassesByUser(
    userId: string
  ): Promise<IWatchedClassesDTO[]> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return null;
    }

    const watchedClasses = await this.prisma.watchedClasses.findMany({
      include: { user: true, videoclass: true },
      where: {
        user_id: userId,
      },
    });
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

    const watchedClasses = await this.prisma.watchedClasses.findMany({
      where: {
        user_id,
        training_id,
      },
      include: { videoclass: true },
    });
    return watchedClasses;
  }

  async getUniqueWatchedClass(
    data: IGetWatchedClassByUserAndVideoDTO
  ): Promise<IWatchedClassesDTO | void> {
    const { user_id, videoclass_id } = data;

    const user = await this.prisma.user.findUnique({
      where: {
        id: user_id,
      },
    });

    if (!user) {
      return null;
    }

    const watchedClass = await this.prisma.watchedClasses.findFirst({
      where: {
        user_id,
        videoclass_id,
      },
    });
    if (!watchedClass) {
      return null;
    }

    return watchedClass;
  }
  async removeWatchedClass(data: IRemoveWatchedClassDTO): Promise<void> {
    const { user_id, videoclass_id } = data;

    const user = await this.prisma.user.findUnique({
      where: {
        id: user_id,
      },
    });

    const watchedClass = await this.prisma.watchedClasses.findFirst({
      where: {
        videoclass_id,
      },
    });

    if (!user || !watchedClass) {
      return null;
    }

    await this.prisma.watchedClasses.delete({
      where: {
        id: watchedClass.id,
      },
    });
  }

  async updateVideoClassExecutionStatus(
    data: IUpdateVideoClassExecutionStatusDTO
  ): Promise<IWatchedClassesDTO> {
    const { user_id, videoclass_id, execution_time, completely_watched } = data;

    const watchedClass = await this.prisma.watchedClasses.findFirst({
      where: {
        user_id,
        videoclass_id,
      },
    });

    if (!watchedClass) {
      return null;
    }

    const updatedWatchedClass = await this.prisma.watchedClasses.update({
      where: {
        id: watchedClass.id,
      },
      data: {
        completely_watched,
        execution_time,
      },
    });
    return updatedWatchedClass;
  }
}

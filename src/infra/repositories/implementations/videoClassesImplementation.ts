import {
  ICreateVideoClassDTO,
  IUpdateVideoClassDTO,
  IVideoClassDTO,
} from "@/infra/dtos/VideoClassDTO";
import { PrismaService } from "@/infra/services/prisma";
import { secondsToFullTimeString } from "@/utils/convertTime";
import { Injectable } from "@nestjs/common";
import { IVideoClassesRepository } from "../interfaces/videoClassesRepository";

@Injectable()
export class VideoClassesImplementation implements IVideoClassesRepository {
  constructor(private prisma: PrismaService) {}
  async createVideoClass(data: ICreateVideoClassDTO): Promise<IVideoClassDTO> {
    const { name, training_id } = data;
    const videoClassNameForTrainingAlreadyExists =
      await this.prisma.videoClass.findFirst({
        where: {
          name,
          training_id,
        },
      });

    const training = await this.prisma.training.findUnique({
      where: {
        id: training_id,
      },
    });

    if (videoClassNameForTrainingAlreadyExists) {
      return null;
    }
    if (!training) {
      return null;
    }
    const newVideoClass = await this.prisma.videoClass.create({
      data: {
        ...data,
        status: "CONVERTING",
      },
    });
    return newVideoClass;
  }
  async listVideoClasses(): Promise<IVideoClassDTO[]> {
    const videoClasses = await this.prisma.videoClass.findMany({
      include: {
        training: true,
      },
    });
    const videoClassWithDuration = videoClasses.map((vc) => ({
      ...vc,
      formatted_duration: secondsToFullTimeString(vc.duration),
    }));

    return videoClassWithDuration;
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
      include: {
        training: true,
      },
    });

    const videoClassWithDuration = videoClasses.map((vc) => ({
      ...vc,
      formatted_duration: secondsToFullTimeString(vc.duration),
    }));

    return videoClassWithDuration;
  }

  async listVideoClassesByCompany(
    companyId: string
  ): Promise<IVideoClassDTO[]> {
    const company = await this.prisma.company.findUnique({
      where: {
        id: companyId,
      },
    });

    if (!company) {
      return;
    }
    const videoClasses = await this.prisma.videoClass.findMany({
      where: {
        training: {
          company_id: companyId,
        },
      },
      include: {
        training: true,
      },
    });

    const videoClassWithDuration = videoClasses.map((vc) => ({
      ...vc,
      formatted_duration: secondsToFullTimeString(vc.duration),
    }));

    return videoClassWithDuration;
  }

  async getVideoClassById(
    videoClassId: string
  ): Promise<IVideoClassDTO | void> {
    const videoClass = await this.prisma.videoClass.findUnique({
      where: {
        id: videoClassId,
      },
      include: {
        training: true,
      },
    });

    if (!videoClass) {
      return null;
    }

    const formatted_duration = secondsToFullTimeString(videoClass.duration);

    const videoClassWithDuration = {
      ...videoClass,
      formatted_duration,
    };

    return videoClassWithDuration;
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
      return null;
    }
    const formatted_duration = secondsToFullTimeString(videoClass.duration);

    const videoClassWithDuration = {
      ...videoClass,
      formatted_duration,
    };

    return videoClassWithDuration;
  }

  async updateVideoClass(data: IUpdateVideoClassDTO): Promise<IVideoClassDTO> {
    const { id } = data;

    const videoClass = await this.prisma.videoClass.findUnique({
      where: {
        id,
      },
    });

    if (!videoClass) {
      return null;
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

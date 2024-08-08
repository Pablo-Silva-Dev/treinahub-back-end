import {
  IAvatarDTO,
  ICreateAvatarDTO,
  IUpdateAvatarDTO,
} from "@/infra/dtos/AvatarDTO";
import { IAvatarsRepository } from "@/infra/repositories/interfaces/avatarsRepository";
import { PrismaService } from "@/infra/services/prisma";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AvatarsImplementation implements IAvatarsRepository {
  constructor(private prisma: PrismaService) {}

  async createAvatar(data: ICreateAvatarDTO): Promise<IAvatarDTO> {
    const { user_id } = data;

    const user = await this.prisma.user.findFirst({
      where: {
        id: user_id,
      },
    });

    if (!user) {
      return;
    }

    const userAlreadyHasAvatar = await this.prisma.avatar.findFirst({
      where: {
        user_id: user_id,
      },
    });

    if (userAlreadyHasAvatar) {
      return;
    }

    const newAvatar = await this.prisma.avatar.create({
      data,
    });
    return newAvatar;
  }

  async getAvatarByUserId(userId: string): Promise<IAvatarDTO | void> {
    const avatar = await this.prisma.avatar.findFirst({
      where: {
        user_id: userId,
      },
    });
    if (!avatar) {
      return;
    }
    return avatar;
  }

  async getAvatarById(id: string): Promise<IAvatarDTO | void> {
    const avatar = await this.prisma.avatar.findFirst({
      where: {
        id,
      },
    });
    if (!avatar) {
      return;
    }
    return avatar;
  }

  async updateAvatar(data: IUpdateAvatarDTO): Promise<IAvatarDTO | void> {
    const { id } = data;
    const avatar = await this.prisma.avatar.findFirst({
      where: {
        id,
      },
    });
    if (!avatar) {
      return;
    }
    const updatedAvatar = await this.prisma.avatar.update({
      where: {
        id,
      },
      data,
    });
    return updatedAvatar;
  }
}

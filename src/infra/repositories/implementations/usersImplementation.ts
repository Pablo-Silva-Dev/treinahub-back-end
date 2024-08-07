import {
  ICreateUserDTO,
  IUpdateUserDTO,
  IUserDTO,
} from "@/infra/dtos/UserDTO";
import { PrismaService } from "@/infra/services/prisma";
import { Injectable } from "@nestjs/common";
import { IUsersRepository } from "../interfaces/usersRepository";

@Injectable()
export class UsersImplementation implements IUsersRepository {
  constructor(private prisma: PrismaService) {}
  async createUser(data: ICreateUserDTO): Promise<IUserDTO> {
    const { email, cpf, phone } = data;

    const emailAlreadyExists = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    const phoneAlreadyExists = await this.prisma.user.findUnique({
      where: {
        phone,
      },
    });

    const cpfAlreadyExists = await this.prisma.user.findUnique({
      where: {
        cpf,
      },
    });

    if (!emailAlreadyExists && !phoneAlreadyExists && !cpfAlreadyExists) {
      const newUser = await this.prisma.user.create({
        data,
      });
      return newUser;
    }
  }
  async listUsers(): Promise<IUserDTO[] | []> {
    const users = await this.prisma.user.findMany({
      include: {
        certificates: true,
        training_metrics: true,
        trainings: true,
        watched_classes: true,
      },
    });
    return users;
  }
  async getUserByEmail(email: string): Promise<IUserDTO | void> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (user) {
      return user;
    }
  }
  async getUserByCpf(cpf: string): Promise<IUserDTO | void> {
    const user = await this.prisma.user.findUnique({
      where: {
        cpf,
      },
    });
    if (user) {
      return user;
    }
  }
  async getUserById(id: string): Promise<IUserDTO | void> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (user) {
      return user;
    }
  }
  async updateUser(data: IUpdateUserDTO): Promise<IUserDTO | void> {
    const { id } = data;
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (user) {
      const updatedUser = await this.prisma.user.update({
        where: {
          id,
        },
        data,
      });
      return updatedUser;
    }
  }
  async deleteUser(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}

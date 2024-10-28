import { IAuthTokenDTO } from "@/infra/dtos/AuthTokenDTO";
import { IRecoveryCodeDTO } from "@/infra/dtos/RecoveryCodeDTO";
import {
  IAuthenticateUserDTO,
  ICreateUserDTO,
  IGetRecoveryPasswordCodeByEmailDTO,
  IGetRecoveryPasswordCodeBySMSDTO,
  IUpdateUserDTO,
  IUserDTO,
} from "@/infra/dtos/UserDTO";
import { PrismaService } from "@/infra/services/prisma";
import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compare } from "bcryptjs";
import { randomInt } from "crypto";
import { addMinutes } from "date-fns";
import { IUsersRepository } from "../interfaces/usersRepository";

@Injectable()
export class UsersImplementation implements IUsersRepository {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService
  ) {}
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

    if (emailAlreadyExists && phoneAlreadyExists && cpfAlreadyExists) {
      return null;
    }

    const newUser = await this.prisma.user.create({
      data,
    });

    return newUser;
  }
  async listUsers(): Promise<IUserDTO[] | []> {
    const users = await this.prisma.user.findMany({
      include: {
        certificates: true,
        training_metrics: true,
        trainings: true,
        watched_classes: true,
        avatars: true
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

  async getUserByPhone(phone: string): Promise<IUserDTO | void> {
    const user = await this.prisma.user.findUnique({
      where: {
        phone,
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
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (user) {
      await this.prisma.user.delete({
        where: {
          id,
        },
      });
    }
  }
  async getRecoveryPasswordCodeByEmail(
    data: IGetRecoveryPasswordCodeByEmailDTO
  ): Promise<IRecoveryCodeDTO> {
    const { email, cpf } = data;

    const user = await this.prisma.user.findFirst({
      where: {
        email,
        cpf,
      },
    });

    if (!user) {
      return null;
    }

    const MIN_RANDOM_CODE = 100000;
    const MAX_RANDOM_CODE = 900000;

    const recoveryCode = randomInt(MIN_RANDOM_CODE, MAX_RANDOM_CODE).toString();

    const nowUTC = new Date(new Date().toISOString());

    const expirationDate = addMinutes(nowUTC, 15);

    const newRecoveryCode = await this.prisma.recoveryCode.create({
      data: {
        code: recoveryCode,
        user_id: user.id,
        expiration_date: expirationDate,
      },
    });

    return newRecoveryCode;
  }

  async getRecoveryPasswordCodeBySMS(
    data: IGetRecoveryPasswordCodeBySMSDTO
  ): Promise<IRecoveryCodeDTO> {
    const { phone } = data;

    const user = await this.prisma.user.findFirst({
      where: {
        phone,
      },
    });

    if (!user) {
      return null;
    }

    const MIN_RANDOM_CODE = 100000;
    const MAX_RANDOM_CODE = 900000;

    const recoveryCode = randomInt(MIN_RANDOM_CODE, MAX_RANDOM_CODE).toString();

    const nowUTC = new Date(new Date().toISOString());

    const expirationDate = addMinutes(nowUTC, 15);

    const newRecoveryCode = await this.prisma.recoveryCode.create({
      data: {
        code: recoveryCode,
        user_id: user.id,
        expiration_date: expirationDate,
      },
    });
    return newRecoveryCode;
  }
  async authenticateUser(data: IAuthenticateUserDTO): Promise<IAuthTokenDTO> {
    const { email, password } = data;

    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return null;
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      return null;
    }

    const token = this.jwt.sign(
      { sub: user.id, isAdmin: user.is_admin },
      { expiresIn: "30d" }
    );

    return {
      token,
      id: user.id,
      email: user.email,
      name: user.name,
    };
  }
}

import {
  IRecoveryCodeDTO,
  IValidateRecoveryCodeDTO,
} from "@/infra/dtos/RecoveryCodeDTO";
import { PrismaService } from "@/infra/services/prisma";
import { Injectable } from "@nestjs/common";
import { IRecoveriesCodeRepository } from "../interfaces/recoveriesCodeRepository";

@Injectable()
export class RecoveriesCodeImplementation implements IRecoveriesCodeRepository {
  constructor(private prisma: PrismaService) {}
  async validateRecoveryCode(data: IValidateRecoveryCodeDTO): Promise<boolean> {
    const { user_id, code } = data;

    const user = await this.prisma.user.findUnique({
      where: {
        id: user_id,
      },
    });

    if (!user) {
      return null;
    }

    let isCodeValid = false;

    const recoveryCode = await this.prisma.recoveryCode.findFirst({
      where: {
        code,
      },
    });

    const currentTimeUTC = new Date(new Date().toISOString());

    if (
      recoveryCode &&
      currentTimeUTC <= new Date(recoveryCode.expiration_date)
    ) {
      isCodeValid = true;
    }

    return isCodeValid;
  }
  async getRecoveryCodeByCode(code: string): Promise<IRecoveryCodeDTO> {
    const recoveryCode = await this.prisma.recoveryCode.findFirst({
      where: {
        code,
      },
    });
    if (!recoveryCode) {
      return null;
    }
    return recoveryCode;
  }
}

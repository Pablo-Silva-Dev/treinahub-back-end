import { IValidateRecoveryCodeDTO } from "@/infra/dtos/RecoveryCodeDTO";
import { UsersImplementation } from "@/infra/repositories/implementations/usersImplementation";
import { Injectable, NotFoundException } from "@nestjs/common";
import { RecoveriesCodeImplementation } from "./../../repositories/implementations/recoveriesCodeImplementation";

@Injectable()
export class ValidateRecoveryCodeUseCase {
  constructor(
    private recoveriesCodeImplementation: RecoveriesCodeImplementation,
    private usersImplementation: UsersImplementation
  ) {}
  async execute(data: IValidateRecoveryCodeDTO) {
    const { user_id, code } = data;

    const user = await this.usersImplementation.getUserById(user_id);

    const recoveryCode =
      await this.recoveriesCodeImplementation.getRecoveryCodeByCode(code);

    if (!user) {
      throw new NotFoundException("User not found");
    }

    if (!recoveryCode) {
      throw new NotFoundException("Code invalid");
    }

    const isRecoveryCodeValid =
      await this.recoveriesCodeImplementation.validateRecoveryCode(data);
    return isRecoveryCodeValid;
  }
}

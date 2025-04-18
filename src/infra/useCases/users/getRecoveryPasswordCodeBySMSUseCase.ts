import { IGetRecoveryPasswordCodeBySMSDTO } from "@/infra/dtos/UserDTO";
import { UsersImplementation } from "@/infra/repositories/implementations/usersImplementation";
import { Injectable, NotFoundException } from "@nestjs/common";
import { TwilioService } from "../../services/twilio";

@Injectable()
export class GetRecoveryPasswordCodeBySMSUseCase {
  constructor(
    private usersImplementation: UsersImplementation,
    private twilioService: TwilioService
  ) {}
  async execute(data: IGetRecoveryPasswordCodeBySMSDTO) {
    const { phone } = data;

    const recoveryCode =
      await this.usersImplementation.getRecoveryPasswordCodeBySMS(data);

    const { code } = recoveryCode;

    const user = await this.usersImplementation.getUserByPhone(phone);

    if (!user) {
      throw new NotFoundException("User not found");
    }

    await this.twilioService.sendSMSRecoveryCode({
      to: phone,
      recoveryCode: code,
    });

    return code;
  }
}

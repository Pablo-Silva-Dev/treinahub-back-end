import { IGetRecoveryPasswordCodeByEmailDTO } from "@/infra/dtos/UserDTO";
import { UsersImplementation } from "@/infra/repositories/implementations/usersImplementation";
import { SendGridEmailSenderService } from "@/infra/services/sendGrid";
import { Injectable, NotFoundException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TEnvSchema } from "env";

@Injectable()
export class GetRecoveryPasswordCodeByEmailUseCase {
  constructor(
    private usersImplementation: UsersImplementation,
    private sendGridService: SendGridEmailSenderService,
    private configService: ConfigService<TEnvSchema, true>
  ) {}
  async execute(data: IGetRecoveryPasswordCodeByEmailDTO) {
    const { email, cpf } = data;

    const recoveryCode =
      await this.usersImplementation.getRecoveryPasswordCodeByEmail(data);

    const user =
      (await this.usersImplementation.getUserByEmail(email)) &&
      (await this.usersImplementation.getUserByCpf(cpf));

    if (!user) {
      throw new NotFoundException("User not found");
    }

    await this.sendGridService.sendRecoveryPasswordEmail({
      from: this.configService.get("SEND_GRID_EMAIL_SENDER_ADDRESS"),
      to: email,
      recoveryCode,
    });

    const sendCodeMessage = `O código de recuperação de senha foi enviado para ${email}`;

    return sendCodeMessage;
  }
}

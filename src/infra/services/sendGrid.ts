import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TEnvSchema } from "env";

const emailSender = require("@sendgrid/mail");

interface IRecoveryPasswordEmail {
  to: string;
  from: string;
  recoveryCode: string;
}

@Injectable()
export class SendGridEmailSenderService {
  constructor(private configService: ConfigService<TEnvSchema, true>) {}

  async sendRecoveryPasswordEmail(data: IRecoveryPasswordEmail) {
    const sendGridApiKey = this.configService.get(
      "SEND_GRID_EMAIL_SENDER_API_KEY"
    );

    const htmlContent = `
    <div style="display: flex; flex-direction: column;">
        <span>
         Seu código de recuperação de senha é <strong>${data.recoveryCode}</strong>.
        </span>
        <br />
        <br />
        <span>
          Você está recebendo este email porque solicitou a redefinição de sua senha.
        </span>
        <span>
          Caso você não tenha solicitado a redefinição de sua senha, pedimos que
          ignore e apague este email.
        </span>
    </div>`;

    emailSender.setApiKey(sendGridApiKey);

    const msg = {
      to: data.to,
      from: data.from,
      subject: "Código de recuperação de senha",
      html: htmlContent,
    };

    emailSender
      .send(msg)
      .then(() => {
        console.log("Email sent");
      })
      .catch((error) => {
        console.error(error.toString());
      });
  }
}

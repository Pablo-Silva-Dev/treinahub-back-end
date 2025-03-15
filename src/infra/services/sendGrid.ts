import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TEnvSchema } from "env";
import * as fs from "fs";
import * as path from "path";

const emailSender = require("@sendgrid/mail");

interface IRecoveryPasswordEmail {
  to: string;
  from: string;
  recoveryCode: string;
}

interface IGetCompanyIdEmail {
  to: string;
  companyIdCode: string;
}

const emailSignaturePath = path.join(
  __dirname,
  "../../../src/assets/images/email-signature.png"
);
@Injectable()
export class SendGridEmailSenderService {
  constructor(private configService: ConfigService<TEnvSchema, true>) {}

  async sendCompanyIdEmail(data: IGetCompanyIdEmail) {
    const sendGridApiKey = this.configService.get(
      "SEND_GRID_EMAIL_SENDER_API_KEY"
    );

    const htmlContent = `
    <div style="display: flex; flex-direction: column;">
        <span>
         Seu código de indentificador da empresa é <strong>${data.companyIdCode}</strong>.
        </span>
        <br />
        <span>
         É necessário informar esse código para cadastrar um novo usuário na empresa. Apenas compartilhe esse código com pessoas autorizadas, pois esse código habilita o registro de novos usuários à empresa.
        </span>
        <br />
        <span>
          Você está recebendo este email porque você fez um novo cadastro na nossa plataforma.
        </span>
        <span>
          Caso você não tenha solicitado a redefinição de sua senha, pedimos que
          ignore e apague este email.
        </span>
        <br />
    </div>`;

    emailSender.setApiKey(sendGridApiKey);

    const sender = this.configService.get("SEND_GRID_EMAIL_SENDER_ADDRESS");

    const msg = {
      to: data.to,
      from: sender,
      subject: "Código de identificador da empresa",
      html: htmlContent,
      attachments: [
        {
          content: fs.readFileSync(emailSignaturePath).toString("base64"),
          filename: "email-signature.png",
          type: "image/png",
          content_id: "email-signature",
        },
      ],
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
        <span>
          Você está recebendo este email porque solicitou a redefinição de sua senha.
        </span>
        <span>
          Caso você não tenha solicitado a redefinição de sua senha, pedimos que
          ignore e apague este email.
        </span>
        <br />
    </div>`;

    emailSender.setApiKey(sendGridApiKey);

    const msg = {
      to: data.to,
      from: data.from,
      subject: "Código de recuperação de senha",
      html: htmlContent,
      attachments: [
        {
          content: fs.readFileSync(emailSignaturePath).toString("base64"),
          filename: "email-signature.png",
          type: "image/png",
          content_id: "email-signature",
        },
      ],
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

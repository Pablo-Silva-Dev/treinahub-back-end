import { buildEmailHtml } from "@/utils/formatTableEmail";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TEnvSchema } from "env";
import { Resend } from "resend";
interface IRecoveryPasswordEmail {
  to: string;
  from: string;
  recoveryCode: string;
}

interface IGetCompanyIdEmail {
  to: string;
  companyIdCode: string;
}

@Injectable()
export class ResendEmailSenderService {
  private resendApiKey: string;
  private senderEmailAddress: string;
  private signatureImageUrl =
    "https://i.ibb.co/HfRg8bGk/Logo-Text-Container.png";
  constructor(private configService: ConfigService<TEnvSchema, true>) {
    this.resendApiKey = this.configService.get("RESEND_EMAIL_SENDER_API_KEY");
    this.senderEmailAddress = this.configService.get(
      "RESEND_EMAIL_SENDER_ADDRESS"
    );
  }

  async sendCompanyIdEmail(data: IGetCompanyIdEmail) {
    const resendEmailSender = new Resend(this.resendApiKey);

    const htmlContent = buildEmailHtml({
      title: "Código de identificador da empresa",
      paragraphs: [
        `Seu código de identificador da empresa é <strong>${data.companyIdCode}</strong>.`,
        `É necessário informar esse código para cadastrar um novo usuário na empresa. Apenas compartilhe esse código com pessoas autorizadas, pois ele habilita o registro de novos usuários.`,
        `Você está recebendo este email porque você fez um novo cadastro na nossa plataforma.`,
        `Caso você não tenha solicitado, ignore e apague este email.`,
      ],
      signatureDataUrl: this.signatureImageUrl,
    });

    try {
      await resendEmailSender.emails.send({
        to: data.to,
        from: this.senderEmailAddress,
        subject: "Código de identificador da empresa",
        html: htmlContent,
      });
      console.log(`Company ID email sent to ${data.to}`);
    } catch (error) {
      console.error(`Error at trying to send email: ${error}`);
    }
  }

  async sendRecoveryPasswordEmail(data: IRecoveryPasswordEmail) {
    const resendEmailSender = new Resend(this.resendApiKey);

    const htmlContent = buildEmailHtml({
      title: "Código de recuperação de senha",
      paragraphs: [
        `Seu código de recuperação de senha é <strong>${data.recoveryCode}</strong>.`,
        `Você está recebendo este email porque solicitou a redefinição de sua senha.`,
        `Caso não tenha solicitado, ignore e apague este email.`,
      ],
      signatureDataUrl: this.signatureImageUrl,
    });

    try {
      await resendEmailSender.emails.send({
        to: data.to,
        from: this.senderEmailAddress,
        subject: "Código de recuperação de senha",
        html: htmlContent,
      });
      console.log(`Recovery password email sent to ${data.to}`);
    } catch (error) {
      console.error(`Error at trying to send email: ${error}`);
    }
  }
}

import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TEnvSchema } from "env";

const twilio = require("twilio");

interface IRecoveryPasswordSMS {
  to?: string;
  recoveryCode: string;
}

@Injectable()
export class TwilioService {
  constructor(private configService: ConfigService<TEnvSchema, true>) {}
  async sendSMSRecoveryCode(data: IRecoveryPasswordSMS) {
    const accountSid = this.configService.get("TWILIO_ACCOUNT_SID");
    const authToken = this.configService.get("TWILIO_AUTH_TOKEN");
    const twilioPhoneNumber = this.configService.get("TWILIO_PHONE_NUMBER");
    const client = twilio(accountSid, authToken);
    client.messages
      .create({
        body: `Seu código de recuperação de senha é ${data.recoveryCode}`,
        to: data.to,
        from: twilioPhoneNumber,
      })
      .then((message) => console.log("Message sent", message.sid));
  }
}

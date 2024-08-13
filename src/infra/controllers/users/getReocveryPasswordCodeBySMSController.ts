import { IGetRecoveryPasswordCodeBySMSDTO } from "@/infra/dtos/UserDTO";
import { GetRecoveryPasswordCodeBySMSUseCase } from "@/infra/useCases/users/getRecoveryPasswordCodeBySMSUseCase";
import { phoneValidationRegex } from "@/utils/regex";
import {
    Body,
    ConflictException,
    Controller,
    HttpCode,
    Post,
} from "@nestjs/common";
import { z } from "zod";

const getRecoveryPasswordCodeBodySchema = z.object({
  phone: z.string().regex(phoneValidationRegex),
});

@Controller("/users/get-recovery-password-code-by-phone")
export class GetRecoveryPasswordCodeBySMSController {
  constructor(
    private getRecoveryPasswordCode: GetRecoveryPasswordCodeBySMSUseCase
  ) {}
  @Post()
  @HttpCode(200)
  async handle(@Body() body: IGetRecoveryPasswordCodeBySMSDTO) {
    const isBodyValidated = getRecoveryPasswordCodeBodySchema.safeParse(body);

    if (!isBodyValidated.success) {
      throw new ConflictException({
        message: "The body format is invalid. Check the fields below:",
        error: isBodyValidated.error.issues,
      });
    }

    try {
      const recoveryCode = await this.getRecoveryPasswordCode.execute(body);
      return recoveryCode;
    } catch (error) {
      console.log("[INTERNAL ERROR]", error.message);
      throw new ConflictException({
        message:
          "An error occurred. Check all request body fields for possible mismatching.",
        error: error.message,
      });
    }
  }
}

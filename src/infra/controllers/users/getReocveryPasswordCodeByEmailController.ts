import { IGetRecoveryPasswordCodeByEmailDTO } from "@/infra/dtos/UserDTO";
import { GetRecoveryPasswordCodeByEmailUseCase } from "@/infra/useCases/users/getRecoveryPasswordCodeByEmailUseCase";
import { cpfValidationRegex } from "@/utils/regex";
import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
} from "@nestjs/common";
import { z } from "zod";

const getRecoveryPasswordCodeBodySchema = z.object({
  email: z.string().email(),
  cpf: z.string().regex(cpfValidationRegex),
});

@Controller("/users/get-recovery-password-code-by-email")
export class GetRecoveryPasswordCodeByEmailController {
  constructor(
    private getRecoveryPasswordCode: GetRecoveryPasswordCodeByEmailUseCase
  ) {}
  @Post()
  @HttpCode(200)
  async handle(@Body() body: IGetRecoveryPasswordCodeByEmailDTO) {
    const isBodyValidated = getRecoveryPasswordCodeBodySchema.safeParse(body);

    if (!isBodyValidated.success) {
      throw new BadRequestException({
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

import { IValidateRecoveryCodeDTO } from "@/infra/dtos/RecoveryCodeDTO";
import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
} from "@nestjs/common";
import { z } from "zod";
import { ValidateRecoveryCodeUseCase } from "./../../useCases/recoveriesCodes/validateRecoveryCodeUseCase";

const validateRecoveriesCodeValidationSchema = z.object({
  user_id: z.string(),
  code: z.string(),
});

@Controller("/recovery-code/validate")
export class ValidateRecoveryCodeController {
  constructor(
    private validateRecoveryCodeUseCase: ValidateRecoveryCodeUseCase
  ) {}
  @Post()
  @HttpCode(200)
  async handle(@Body() body: IValidateRecoveryCodeDTO) {
    const isBodyValidated =
      validateRecoveriesCodeValidationSchema.safeParse(body);

    if (!isBodyValidated.success) {
      throw new BadRequestException({
        message: "Invalid request body. Please check the input fields.",
        error: isBodyValidated.error.issues,
      });
    }

    try {
      const newRecoveriesCode =
        await this.validateRecoveryCodeUseCase.execute(body);
      return newRecoveriesCode;
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

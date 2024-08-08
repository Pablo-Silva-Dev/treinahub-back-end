import { IUpdateUserDTO } from "@/infra/dtos/UserDTO";
import { UpdateUserUseCase } from "@/infra/useCases/users/updateUserUseCase";
import { cepValidationRegex, phoneValidationRegex } from "@/utils/regex";
import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  InternalServerErrorException,
  Put,
} from "@nestjs/common";

import { z } from "zod";

const updateUserBodySchema = z.object({
  id: z.string(),
  password: z.string().min(8).optional(),
  cep: z.string().regex(cepValidationRegex).optional(),
  street: z.string().optional(),
  district: z.string().optional(),
  city: z.string().optional(),
  uf: z.string().optional(),
  residence_number: z.string().optional(),
  phone: z.string().regex(phoneValidationRegex).optional(),
});
@Controller("/user/update")
export class UpdateUserController {
  constructor(private updateUserUseCase: UpdateUserUseCase) {}
  @Put()
  @HttpCode(203)
  async handle(@Body() body: IUpdateUserDTO) {
    const isBodyValidated = updateUserBodySchema.safeParse(body);

    if (!isBodyValidated.success) {
      throw new BadRequestException({
        message: "The body format is invalid. Check the fields below:",
        error: isBodyValidated.error.issues,
      });
    }
    try {
      const updatedUser = await this.updateUserUseCase.execute(body);
      return updatedUser;
    } catch (error) {
      console.log("[INTERNAL ERROR]", error.message);
      throw new InternalServerErrorException({
        message:
          "An error occurred. Check all request body fields for possible mismatching.",
        error: error.message,
      });
    }
  }
}

import { IUpdateUserDTO } from "@/infra/dtos/UserDTO";
import { UpdateUserUseCase } from "@/infra/useCases/users/updateUserUseCase";
import { cepValidationRegex, phoneValidationRegex } from "@/utils/regex";
import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  NotFoundException,
  Put,
} from "@nestjs/common";
import { GetUserByIdUseCase } from "./../../useCases/users/getUserByIdUseCase";

import { z } from "zod";

const updateUserBodySchema = z.object({
  id: z.string(),
  password: z.string().optional(),
  cep: z.string().optional().nullable(),
  street: z.string().optional().nullable(),
  district: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  uf: z.string().optional().nullable(),
  residence_number: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
});
@Controller("/users/update")
export class UpdateUserController {
  constructor(
    private updateUserUseCase: UpdateUserUseCase,
    private getUserByIdUseCase: GetUserByIdUseCase
  ) {}
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

    const user = await this.getUserByIdUseCase.execute(body.id);

    if (!user) {
      throw new NotFoundException({
        message: "User not found",
      });
    }

    try {
      const updatedUser = await this.updateUserUseCase.execute(body);
      return updatedUser;
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

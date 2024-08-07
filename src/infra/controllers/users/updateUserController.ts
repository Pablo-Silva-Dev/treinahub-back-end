import { IUpdateUserDTO } from "@/infra/dtos/UserDTO";
import { UpdateUserUseCase } from "@/infra/useCases/users/updateUserUseCase";
import { cepValidationRegex, phoneValidationRegex } from "@/utils/regex";
import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Param,
  Put,
} from "@nestjs/common";

import { z } from "zod";

const updateUserBodySchema = z.object({
  password: z.string().min(8).optional(),
  cep: z.string().regex(cepValidationRegex).optional(),
  street: z.string().optional(),
  district: z.string().optional(),
  city: z.string().optional(),
  uf: z.string().optional(),
  residence_number: z.string().optional(),
  phone: z.string().regex(phoneValidationRegex).optional(),
});
@Controller("user/update")
export class UpdateUserController {
  constructor(private updateUserUseCase: UpdateUserUseCase) {}
  @Put(":userId")
  @HttpCode(203)
  async handle(@Param("userId") userId: string, @Body() data: IUpdateUserDTO) {

    if (!userId) {
      throw new ConflictException("userId is required");
    }

    const isBodyValidated = updateUserBodySchema.safeParse(data);

    if (!isBodyValidated.success) {
      throw new ConflictException({
        message: "The body format is invalid. Check the fields below:",
        error: isBodyValidated.error.issues,
      });
    }
    const updatedUser = await this.updateUserUseCase.execute({
      ...data,
      id: userId,
    });
    return updatedUser;
  }
}

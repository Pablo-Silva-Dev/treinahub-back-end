import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
} from "@nestjs/common";
import { cpfValidationRegex, phoneValidationRegex } from "src/utils/regex";
import { z } from "zod";
import { ICreateUserDTO } from "../dtos/UserDTO";
import { CreateUserUseCase } from "../useCases/users/createUserUseCase";

const createUserBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  cpf: z.string().regex(cpfValidationRegex),
  phone: z.string().regex(phoneValidationRegex),
  birth_date: z.string(),
  password: z.string().min(8),
});

@Controller("users/create")
export class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}
  @Post()
  @HttpCode(201)
  async handle(@Body() body: ICreateUserDTO) {
    const isBodyValidated = createUserBodySchema.safeParse(body);

    if (!isBodyValidated.success) {
      throw new ConflictException({
        message: "The body format is invalid. Check the fields below:",
        error: isBodyValidated.error.issues,
      });
    }

    const user = await this.createUserUseCase.execute(body);
    return user;
  }
}

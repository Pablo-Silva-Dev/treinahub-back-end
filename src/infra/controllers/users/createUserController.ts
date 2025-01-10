import { ICreateUserDTO } from "@/infra/dtos/UserDTO";
import { CreateUserUseCase } from "@/infra/useCases/users/createUserUseCase";
import { cpfValidationRegex, phoneValidationRegex } from "@/utils/regex";
import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
} from "@nestjs/common";
import { z } from "zod";
import { UpdateCompanyAdditionalUsersUseCase } from "./../../useCases/companies/updateCompanyAdditionalUsersUseCase";

const createUserBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  cpf: z.string().regex(cpfValidationRegex),
  phone: z.string().regex(phoneValidationRegex),
  birth_date: z.string(),
  password: z.string().min(8),
});

@Controller("/users/create")
export class CreateUserController {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private updateCompanyAdditionalUsersUseCase: UpdateCompanyAdditionalUsersUseCase
  ) {}
  @Post()
  @HttpCode(201)
  async handle(@Body() body: ICreateUserDTO) {
    const isBodyValidated = createUserBodySchema.safeParse(body);

    if (!isBodyValidated.success) {
      throw new BadRequestException({
        message: "The body format is invalid. Check the fields below:",
        error: isBodyValidated.error.issues,
      });
    }

    try {
      const createdUser = await this.createUserUseCase.execute(body);

      await this.updateCompanyAdditionalUsersUseCase.execute(
        createdUser.company_id
      );

      //TODO-Pablo: Call stripe method to purchase new additional user based on plan

      return createdUser;
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

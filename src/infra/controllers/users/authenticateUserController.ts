import { IAuthenticateUserDTO } from "@/infra/dtos/UserDTO";
import { AuthenticateUserUseCase } from "@/infra/useCases/users/authenticateUserUseCase";
import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  NotAcceptableException,
  NotFoundException,
  Post,
} from "@nestjs/common";
import { z } from "zod";

const authenticateUserBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

@Controller("/users/auth")
export class AuthenticateUserController {
  constructor(private authenticateUserUseCase: AuthenticateUserUseCase) {}
  @Post()
  @HttpCode(200)
  async handle(@Body() body: IAuthenticateUserDTO) {
    const isBodyValidated = authenticateUserBodySchema.safeParse(body);

    if (!isBodyValidated.success) {
      throw new BadRequestException({
        message: "The body format is invalid. Check the fields below:",
        error: isBodyValidated.error.issues,
      });
    }

    try {
      const token = await this.authenticateUserUseCase.execute(body);
      return token;
    } catch (error) {
      console.log("[INTERNAL ERROR]", error.message);

      if (error.status === 409) {
        throw new ConflictException({
          message: "User not found or credentials does not match",
          error: error.message,
        });
      }

      if (error.status === 406) {
        throw new NotAcceptableException({
          message: "User already authenticated",
          error: error.message,
        });
      }

      throw new ConflictException({
        message:
          "An error occurred. Check all request body fields for possible mismatching.",
        error: error.message,
      });
    }
  }
}

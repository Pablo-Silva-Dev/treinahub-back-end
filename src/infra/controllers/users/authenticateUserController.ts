import { IAuthenticateUserDTO } from "@/infra/dtos/UserDTO";
import { AuthenticateUserUseCase } from "@/infra/useCases/users/authenticateUserUseCase";
import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
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
      throw new ConflictException({
        message: "The body format is invalid. Check the fields below:",
        error: isBodyValidated.error.issues,
      });
    }

    try {
      const token = await this.authenticateUserUseCase.execute(body);
      return token;
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

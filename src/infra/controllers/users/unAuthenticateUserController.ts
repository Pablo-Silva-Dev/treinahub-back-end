import { IUnAuthenticateUserDTO } from "@/infra/dtos/UserDTO";
import { UnAuthenticateUserUseCase } from "@/infra/useCases/users/unAuthenticateUserUseCase";
import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  NotFoundException,
  Post,
} from "@nestjs/common";
import { z } from "zod";

const authenticateUserBodySchema = z.object({
  email: z.string().email(),
});

@Controller("/users/logout")
export class UnAuthenticateUserController {
  constructor(private unAuthenticateUserUseCase: UnAuthenticateUserUseCase) {}
  @Post()
  @HttpCode(200)
  async handle(@Body() body: IUnAuthenticateUserDTO) {
    const isBodyValidated = authenticateUserBodySchema.safeParse(body);

    if (!isBodyValidated.success) {
      throw new BadRequestException({
        message: "The body format is invalid. Check the fields below:",
        error: isBodyValidated.error.issues,
      });
    }

    try {
      const message = await this.unAuthenticateUserUseCase.execute(body);
      return message;
    } catch (error) {
      console.log("[INTERNAL ERROR]", error.message);

      if (error.status === 404) {
        throw new NotFoundException({
          message: "User not found",
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

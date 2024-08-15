import { GetUserByEmailUseCase } from "@/infra/useCases/users/getUserByIEmailUseCase";
import {
  ConflictException,
  Controller,
  Get,
  HttpCode,
  Param,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Controller("/users/get-by-email")
@UseGuards(AuthGuard("jwt-user"))
export class GetUserByEmailController {
  constructor(private getUserByEmailUseCase: GetUserByEmailUseCase) {}
  @Get(":userEmail")
  @HttpCode(200)
  async handle(@Param("userEmail") userEmail: string) {
    try {
      const user = await this.getUserByEmailUseCase.execute(userEmail);
      return user;
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

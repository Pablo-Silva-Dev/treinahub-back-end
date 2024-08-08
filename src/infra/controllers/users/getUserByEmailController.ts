import {
  ConflictException,
  Controller,
  Get,
  HttpCode,
  Param,
} from "@nestjs/common";
import { GetUserByEmailUseCase } from "../../useCases/users/getUserByIEmailUseCase";

@Controller("/users/get-by-email")
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

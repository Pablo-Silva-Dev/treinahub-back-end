import {
  ConflictException,
  Controller,
  Get,
  HttpCode,
  Param,
} from "@nestjs/common";
import { GetUserByCpfUseCase } from "../../useCases/users/getUserByCpfUseCase";

@Controller("/users/get-by-cpf")
export class GetUserByCpfController {
  constructor(private getUserByCpfUseCase: GetUserByCpfUseCase) {}
  @Get(":userCpf")
  @HttpCode(200)
  async handle(@Param("userCpf") userCpf: string) {
    try {
      const user = await this.getUserByCpfUseCase.execute(userCpf);
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

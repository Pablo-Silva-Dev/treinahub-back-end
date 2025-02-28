import { GetUserByCpfUseCase } from "@/infra/useCases/users/getUserByCpfUseCase";
import {
  Controller,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Controller("/users/get-by-cpf")
@UseGuards(AuthGuard("jwt-user"))
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
      throw new NotFoundException({
        message:
          "User not found",
        error: error.message,
      });
    }
  }
}

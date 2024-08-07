import { Controller, Get, HttpCode, Param } from "@nestjs/common";
import { GetUserByCpfUseCase } from "../../useCases/users/getUserByCpfUseCase";

@Controller("/users/get-by-cpf")
export class GetUserByCpfController {
  constructor(private getUserByCpfUseCase: GetUserByCpfUseCase) {}
  @Get(":userCpf")
  @HttpCode(200)
  async handle(@Param("userCpf") userCpf: string) {
    const user = await this.getUserByCpfUseCase.execute(userCpf);
    return user;
  }
}

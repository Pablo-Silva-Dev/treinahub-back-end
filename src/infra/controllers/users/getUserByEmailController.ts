import { Controller, Get, HttpCode, Param } from "@nestjs/common";
import { GetUserByEmailUseCase } from "../../useCases/users/getUserByIEmailUseCase";

@Controller("/users/get-by-email")
export class GetUserByEmailController {
  constructor(private getUserByEmailUseCase: GetUserByEmailUseCase) {}
  @Get(":userEmail")
  @HttpCode(200)
  async handle(@Param("userEmail") userEmail: string) {
    const user = await this.getUserByEmailUseCase.execute(userEmail);
    return user;
  }
}

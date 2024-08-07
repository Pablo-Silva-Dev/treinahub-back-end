import { Controller, Get, HttpCode, Param } from "@nestjs/common";
import { GetUserByIdUseCase } from "../../useCases/users/getUserByIdUseCase";

@Controller("/users/get-by-id")
export class GetUserByIdController {
  constructor(private getUserByIdUseCase: GetUserByIdUseCase) {}
  @HttpCode(200)
  @Get(":userId")
  async handle(@Param("userId") userId: string) {
    const user = await this.getUserByIdUseCase.execute(userId);
    return user;
  }
}

import { ListUsersUseCase } from "@/infra/useCases/users/listUsersUseCase";
import { Controller, Get, HttpCode } from "@nestjs/common";

@Controller("/users/list")
export class ListUsersController {
  constructor(private listUsersUseCase: ListUsersUseCase) {}
  @Get()
  @HttpCode(200)
  async handle() {
    const users = await this.listUsersUseCase.execute();
    return users;
  }
}

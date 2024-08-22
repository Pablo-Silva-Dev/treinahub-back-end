import { ListUsersUseCase } from "@/infra/useCases/users/listUsersUseCase";
import {
  ConflictException,
  Controller,
  Get,
  HttpCode,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Controller("/users/list")
@UseGuards(AuthGuard("jwt-admin"))
export class ListUsersController {
  constructor(private listUsersUseCase: ListUsersUseCase) {}
  @Get()
  @HttpCode(200)
  async handle() {
    try {
      const users = await this.listUsersUseCase.execute();
      return users;
    } catch (error) {
      console.log("[INTERNAL ERROR]", error.message);
      throw new ConflictException({
        message:
          "An error occurred.",
        error: error.message,
      });
    }
  }
}

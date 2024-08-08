import { ListUsersUseCase } from "@/infra/useCases/users/listUsersUseCase";
import { ConflictException, Controller, Get, HttpCode } from "@nestjs/common";

@Controller("/users/list")
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
          "An error occurred. Check all request body fields for possible mismatching.",
        error: error.message,
      });
    }
  }
}

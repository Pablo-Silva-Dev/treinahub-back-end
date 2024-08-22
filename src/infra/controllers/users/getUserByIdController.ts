import { GetUserByIdUseCase } from "@/infra/useCases/users/getUserByIdUseCase";
import {
  ConflictException,
  Controller,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Controller("/users/get-by-id")
@UseGuards(AuthGuard("jwt-user"))
export class GetUserByIdController {
  constructor(private getUserByIdUseCase: GetUserByIdUseCase) {}
  @HttpCode(200)
  @Get(":userId")
  async handle(@Param("userId") userId: string) {
    try {
      const user = await this.getUserByIdUseCase.execute(userId);
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

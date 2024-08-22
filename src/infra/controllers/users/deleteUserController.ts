import { DeleteUserUseCase } from "@/infra/useCases/users/deleteUserUseCase";
import {
  BadRequestException,
  ConflictException,
  Controller,
  Delete,
  HttpCode,
  Param,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Controller("/users/delete")
@UseGuards(AuthGuard("jwt-user"))
export class DeleteUserController {
  constructor(private deleteUserUseCase: DeleteUserUseCase) {}
  @Delete(":userId")
  @HttpCode(200)
  async handle(@Param("userId") userId: string) {
    if (!userId) {
      throw new BadRequestException("userId is required");
    }
    try {
      await this.deleteUserUseCase.execute(userId);
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

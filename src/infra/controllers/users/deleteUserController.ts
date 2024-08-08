import {
  ConflictException,
  Controller,
  Delete,
  HttpCode,
  Param,
} from "@nestjs/common";
import { DeleteUserUseCase } from "./../../useCases/users/deleteUserUseCase";

@Controller("/users/delete")
export class DeleteUserController {
  constructor(private deleteUserUseCase: DeleteUserUseCase) {}
  @Delete(":userId")
  @HttpCode(204)
  async handle(@Param("userId") userId: string) {
    if (!userId) {
      throw new ConflictException("userId is required");
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

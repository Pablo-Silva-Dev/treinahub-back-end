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
    await this.deleteUserUseCase.execute(userId);
  }
}

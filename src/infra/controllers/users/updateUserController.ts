import { IUpdateUserDTO } from "@/infra/dtos/UserDTO";
import { UpdateUserUseCase } from "@/infra/useCases/users/updateUserUseCase";
import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Param,
  Put,
} from "@nestjs/common";

@Controller("user/update")
export class UpdateUserController {
  constructor(private updateUserUseCase: UpdateUserUseCase) {}
  @Put(":userId")
  @HttpCode(203)
  async handle(@Param("userId") userId: string, @Body() data: IUpdateUserDTO) {
    if (!userId) {
      throw new ConflictException("userId is required");
    }
    await this.updateUserUseCase.execute(userId, { ...data, id: userId });
  }
}

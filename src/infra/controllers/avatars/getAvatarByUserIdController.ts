import {
  ConflictException,
  Controller,
  Get,
  HttpCode,
  Param,
} from "@nestjs/common";
import { GetAvatarByUserIdUseCase } from "../../useCases/avatars/getAvatarByUserIdUseCase";

@Controller("/avatars/get-by-user-id")
export class GetAvatarByUserIdController {
  constructor(private getAvatarByIdUseCase: GetAvatarByUserIdUseCase) {}
  @HttpCode(200)
  @Get(":userId")
  async handle(@Param("userId") userId: string) {
    try {
      const avatar = await this.getAvatarByIdUseCase.execute(userId);
      return avatar;
    } catch (error) {
      console.log("[INTERNAL ERROR]", error.message);
      throw new ConflictException({
        message: "An error occurred.",
        error: error.message,
      });
    }
  }
}

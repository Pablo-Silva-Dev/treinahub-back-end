import { GetAvatarByUserIdUseCase } from "@/infra/useCases/avatars/getAvatarByUserIdUseCase";
import {
  ConflictException,
  Controller,
  Get,
  HttpCode,
  Param,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Controller("/avatars/get-by-user-id")
@UseGuards(AuthGuard("jwt-user"))
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

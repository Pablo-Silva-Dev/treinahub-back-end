import { GetAvatarByIdUseCase } from "@/infra/useCases/avatars/getAvatarByIdUseCase";
import {
  ConflictException,
  Controller,
  Get,
  HttpCode,
  Param,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Controller("/avatars/get-by-id")
@UseGuards(AuthGuard("jwt-user"))
export class GetAvatarByIdController {
  constructor(private getAvatarByIdUseCase: GetAvatarByIdUseCase) {}
  @HttpCode(200)
  @Get(":avatarId")
  async handle(@Param("avatarId") avatarId: string) {
    try {
      const avatar = await this.getAvatarByIdUseCase.execute(avatarId);
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

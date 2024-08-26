import { GetUserByPhoneUseCase } from "@/infra/useCases/users/getUserByPhoneUseCase";
import {
  Controller,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Controller("/users/get-by-phone")
@UseGuards(AuthGuard("jwt-user"))
export class GetUserByPhoneController {
  constructor(private getUserByPhoneUseCase: GetUserByPhoneUseCase) {}
  @Get(":userPhone")
  @HttpCode(200)
  async handle(@Param("userPhone") userPhone: string) {
    try {
      const user = await this.getUserByPhoneUseCase.execute(userPhone);
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

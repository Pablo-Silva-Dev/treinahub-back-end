import {
  ConflictException,
  Controller,
  Get,
  HttpCode,
  Param,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ListWatchedClassesByUserUseCase } from "./../../useCases/watchedClasses/listWatchedClassesByUserUseCase";

@Controller("watched-classes/list-by-user")
@UseGuards(AuthGuard("jwt-user"))
export class ListWatchedClassesByUserController {
  constructor(
    private listWatchedClassesByUserUseCase: ListWatchedClassesByUserUseCase
  ) {}
  @Get(":userId")
  @HttpCode(200)
  async handle(@Param("userId") userId: string) {
    try {
      const watchedClasses =
        await this.listWatchedClassesByUserUseCase.execute(userId);
      return watchedClasses;
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

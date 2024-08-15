import { ListWatchedClassesUseCase } from "@/infra/useCases/watchedClasses/listWatchedClassesUseCase";
import {
  ConflictException,
  Controller,
  Get,
  HttpCode,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Controller("/watched-classes/list")
@UseGuards(AuthGuard("jwt-admin"))
export class ListWatchedClassesController {
  constructor(private listWatchedClassesUseCase: ListWatchedClassesUseCase) {}
  @Get()
  @HttpCode(200)
  async handle() {
    try {
      const watchedClasses = await this.listWatchedClassesUseCase.execute();
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

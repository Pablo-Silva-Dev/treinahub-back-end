import { ListVideoClassesUseCase } from "@/infra/useCases/videoClasses/listVideoClassesUseCase";
import {
  ConflictException,
  Controller,
  Get,
  HttpCode,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Controller("/video-classes/list")
@UseGuards(AuthGuard("jwt-user"))
export class ListVideoClassesController {
  constructor(private listVideoClassesUseCase: ListVideoClassesUseCase) {}
  @Get()
  @HttpCode(200)
  async handle() {
    try {
      const videoClasses = await this.listVideoClassesUseCase.execute();

      return videoClasses;
    } catch (error) {
      console.log("[INTERNAL ERROR]", error.message);
      throw new ConflictException({
        message: "An error occurred",
        error: error.message,
      });
    }
  }
}

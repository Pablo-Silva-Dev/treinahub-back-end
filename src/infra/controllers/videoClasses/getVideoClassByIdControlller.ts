import { GetVideoClassByIdUseCase } from "@/infra/useCases/videoClasses/getVideoClassByIdUseCase";
import {
  ConflictException,
  Controller,
  Get,
  HttpCode,
  Param,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Controller("/video-classes/get-by-id")
@UseGuards(AuthGuard("jwt-user"))
export class GetVideoClassByIdController {
  constructor(private getVideoClassByIdUseCase: GetVideoClassByIdUseCase) {}
  @Get(":videoClassId")
  @HttpCode(200)
  async handle(@Param("videoClassId") videoClassId: string) {
    try {
      const getVideoClassById =
        await this.getVideoClassByIdUseCase.execute(videoClassId);
      return getVideoClassById;
    } catch (error) {
      console.log("[INTERNAL ERROR]", error.message);
      throw new ConflictException({
        message: "An error occurred",
        error: error.message,
      });
    }
  }
}

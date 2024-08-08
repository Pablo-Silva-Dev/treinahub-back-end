import { DeleteVideoClassUseCase } from "@/infra/useCases/videoClasses/deleteVideoClassUseCase";
import {
  ConflictException,
  Controller,
  Delete,
  HttpCode,
  Param,
} from "@nestjs/common";

@Controller("video-classes/delete")
export class DeleteVideoClassController {
  constructor(private deleteVideoClassUseCase: DeleteVideoClassUseCase) {}
  @Delete(":videoClassId")
  @HttpCode(200)
  async handle(@Param("videoClassId") videoClassId: string) {
    if (!videoClassId) {
      throw new ConflictException("videoClassId is required");
    }
    try {
      await this.deleteVideoClassUseCase.execute(videoClassId);
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

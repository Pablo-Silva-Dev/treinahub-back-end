import { IRemoveWatchedClassDTO } from "@/infra/dtos/WatchedClassDTO";
import { RemoveWatchedClassUseCase } from "@/infra/useCases/watchedClasses/removeWatchedClassUseCase";
import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { z } from "zod";

const removeWatchedClassSchema = z.object({
  user_id: z.string(),
  videoclass_id: z.string(),
});

@Controller("/watched-classes/remove")
@UseGuards(AuthGuard("jwt-user"))
export class RemoveWatchedClassController {
  constructor(private removeWatchedClassUseCase: RemoveWatchedClassUseCase) {}
  @Post()
  @HttpCode(200)
  async handle(@Body() body: IRemoveWatchedClassDTO) {
    const isBodyValidated = removeWatchedClassSchema.safeParse(body);
    if (!isBodyValidated.success) {
      throw new ConflictException({
        message: "An error occurred",
        error: isBodyValidated.error.issues,
      });
    }
    try {
      await this.removeWatchedClassUseCase.execute(body);
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

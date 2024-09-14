import { IUpdateVideoClassExecutionStatusDTO } from "@/infra/dtos/WatchedClassDTO";
import { UpdateVideoClassExecutionStatusUseCase } from "@/infra/useCases/watchedClasses/UpdateVideoClassExecutionStatusUseCase";

import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Put,
} from "@nestjs/common";
import { z } from "zod";

const validationSchema = z.object({
  user_id: z.string(),
  videoclass_id: z.string(),
  completely_watched: z.boolean(),
  execution_time: z.number(),
});

@Controller("/watched-classes/update-execution-time")
export class UpdateVideoClassExecutionStatusController {
  constructor(
    private updateVideoClassExecutionStatusUse: UpdateVideoClassExecutionStatusUseCase
  ) {}
  @Put()
  @HttpCode(203)
  async handle(@Body() body: IUpdateVideoClassExecutionStatusDTO) {
    const isBodyValidated = validationSchema.safeParse(body);
    try {
      if (!isBodyValidated.success) {
        throw new BadRequestException({
          message: "An error occurred",
          error: isBodyValidated.error.issues,
        });
      }
      const updatedWatchedClass =
        await this.updateVideoClassExecutionStatusUse.execute(body);
      return updatedWatchedClass;
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

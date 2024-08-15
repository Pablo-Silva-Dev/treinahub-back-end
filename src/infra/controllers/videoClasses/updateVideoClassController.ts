import { IUpdateVideoClassDTO } from "@/infra/dtos/VideoClassDTO";
import { UpdateVideoClassUseCase } from "@/infra/useCases/videoClasses/updateVideoClassUseCase";
import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Put,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { z } from "zod";

const updateVideoClassSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  description: z.string().optional(),
  cover_url: z.string().url().optional(),
  thumbnail_url: z.string().url().optional(),
});

@Controller("/video-classes/update")
@UseGuards(AuthGuard("jwt-admin"))
export class UpdateVideoClassController {
  constructor(private updateVideoClassUseCase: UpdateVideoClassUseCase) {}

  @Put()
  @HttpCode(203)
  async handle(@Body() body: IUpdateVideoClassDTO) {
    const isBodyValidated = updateVideoClassSchema.safeParse(body);

    if (!isBodyValidated.success) {
      throw new BadRequestException({
        message: "The body format is invalid. Check the fields below:",
        errors: isBodyValidated.error.issues,
      });
    }

    try {
      const updatedVideoClass =
        await this.updateVideoClassUseCase.execute(body);
      return updatedVideoClass;
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

import { ICreateVideoClassDTO } from "@/infra/dtos/VideoClassDTO";
import { CreateVideoClassUseCase } from "@/infra/useCases/videoClasses/createVideoClassUseCase";
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

const createVideoClassValidationSchema = z.object({
  name: z.string(),
  description: z.string(),
  duration: z.number(),
  url: z.string(),
  thumbnail_url: z.string(),
  training_id: z.string(),
});

@Controller("/video-classes/create")
@UseGuards(AuthGuard("jwt-admin"))
export class CreateVideoClassController {
  constructor(private createVideoClassUseCase: CreateVideoClassUseCase) {}
  @Post()
  @HttpCode(201)
  async handle(@Body() body: ICreateVideoClassDTO) {
    const isBodyValidated = createVideoClassValidationSchema.safeParse(body);
    if (!isBodyValidated.success) {
      throw new ConflictException({
        message: "An error occurred while creating video class",
        error: isBodyValidated.error.issues,
      });
    }
    try {
      const createdVideoClass =
        await this.createVideoClassUseCase.execute(body);
      return createdVideoClass;
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

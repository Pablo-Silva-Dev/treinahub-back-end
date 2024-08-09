import { ICreateWatchedClassesDTO } from "@/infra/dtos/WatchedClassDTO";
import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
} from "@nestjs/common";
import { z } from "zod";
import { CreateWatchedClassUseCase } from "./../../useCases/watchedClasses/createWatchedClassUseCase";

const createWatchedClassValidationSchema = z.object({
  user_id: z.string(),
  videoclass_id: z.string(),
  training_id: z.string(),
});

@Controller("/watched-classes/create")
export class CreateWatchedClassController {
  constructor(private createWatchedClassUseCase: CreateWatchedClassUseCase) {}
  @Post()
  @HttpCode(201)
  async handle(@Body() body: ICreateWatchedClassesDTO) {
    const isBodyValidated = createWatchedClassValidationSchema.safeParse(body);
    if (!isBodyValidated.success) {
      throw new ConflictException({
        message: "An error occurred",
        error: isBodyValidated.error.issues,
      });
    }
    try {
      const createdWatchedClass =
        await this.createWatchedClassUseCase.execute(body);
      return createdWatchedClass;
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

import { ICreateLogDTO } from "@/infra/dtos/LogDTO";
import { CreateLogUseCase } from "@/infra/useCases/logs/createLogUseCase";
import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { z } from "zod";

const createLogValidationSchema = z.object({
  user_id: z.string(),
});

@Controller("/logs/create")
@UseGuards(AuthGuard("jwt-user"))
export class CreateLogController {
  constructor(private createLogUseCase: CreateLogUseCase) {}
  @Post()
  @HttpCode(201)
  async handle(@Body() body: ICreateLogDTO) {
    const isBodyValidated = createLogValidationSchema.safeParse(body);
    if (!isBodyValidated.success) {
      throw new BadRequestException({
        message: "Invalid request body. Please check the input fields.",
        error: isBodyValidated.error.issues,
      });
    }

    try {
      const newLog = await this.createLogUseCase.execute(body);
      return newLog;
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

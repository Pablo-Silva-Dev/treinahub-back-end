import { ICreateAvatarDTO } from "@/infra/dtos/AvatarDTO";
import { CreateAvatarUseCase } from "@/infra/useCases/avatars/createsAvatarUseCase";
import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post
} from "@nestjs/common";
import { z } from "zod";

const createAvatarValidationSchema = z.object({
  user_id: z.string(),
  url: z.string().url(),
});

@Controller("/avatars/create")
export class CreateAvatarController {
  constructor(private createAvatarUseCase: CreateAvatarUseCase) {}
  @Post()
  @HttpCode(201)
  async handle(@Body() body: ICreateAvatarDTO) {
    const isBodyValidated = createAvatarValidationSchema.safeParse(body);

    if (!isBodyValidated.success) {
      throw new BadRequestException({
        message: "Invalid request body. Please check the input fields.",
        errors: isBodyValidated.error.issues,
      });
    }

    try {
      const createdAvatar = await this.createAvatarUseCase.execute(body);

      return createdAvatar;
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

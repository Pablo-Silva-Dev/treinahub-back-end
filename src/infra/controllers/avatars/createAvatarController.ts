import { ICreateAvatarDTO } from "@/infra/dtos/AvatarDTO";
import { CreateAvatarUseCase } from "@/infra/useCases/avatars/createsAvatarUseCase";
import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
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
      throw new ConflictException({
        message: "Invalid request body. Please check the input fields.",
        errors: isBodyValidated.error.issues,
      });
    }

    const createdAvatar = await this.createAvatarUseCase.execute(body);
    return createdAvatar;
  }
}

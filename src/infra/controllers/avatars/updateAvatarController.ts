import { IUpdateAvatarDTO } from "@/infra/dtos/AvatarDTO";
import { UpdateAvatarUseCase } from "@/infra/useCases/avatars/updateAvatarUseCase";
import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  InternalServerErrorException,
  Put,
} from "@nestjs/common";
import { z } from "zod";

const updateAvatarValidationSchema = z.object({
  id: z.string(),
  url: z.string().url(),
});

@Controller("/avatars/update")
export class UpdateAvatarController {
  constructor(private updateAvatarUseCase: UpdateAvatarUseCase) {}
  @Put()
  @HttpCode(203)
  async execute(@Body() body: IUpdateAvatarDTO) {
    const isBodyValidated = updateAvatarValidationSchema.safeParse(body);

    if (!isBodyValidated.success) {
      throw new BadRequestException({
        message: "Invalid request body. Please check the input fields.",
        errors: isBodyValidated.error.issues,
      });
    }

    try {
      const updatedAvatar = await this.updateAvatarUseCase.execute(body);
      return updatedAvatar;
    } catch (error) {
      console.log("[INTERNAL ERROR]", error.message);
      throw new InternalServerErrorException({
        message:
          "An error occurred. Check all request body fields for possible mismatching.",
        error: error.message,
      });
    }
  }
}

import { IUpdateContactSupportDTO } from "@/infra/dtos/ContactSupportDTO";
import { UpdateContactSupportUseCase } from "@/infra/useCases/contactsSupport/updateContactSupportUseCase";
import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Put,
} from "@nestjs/common";
import { z } from "zod";

const updateContactSupportValidationSchema = z.object({
  id: z.string(),
  contact_number: z.string(),
});

@Controller("contacts-support/update")
export class UpdateContactSupportController {
  constructor(
    private updateContactSupportUseCase: UpdateContactSupportUseCase
  ) {}
  @Put()
  @HttpCode(203)
  async handle(@Body() body: IUpdateContactSupportDTO) {
    const isBodyValidated =
      updateContactSupportValidationSchema.safeParse(body);
    if (!isBodyValidated.success) {
      throw new BadRequestException({
        message: "Invalid request body. Please check the input fields.",
        errors: isBodyValidated.error.issues,
      });
    }

    try {
      const updatedContactSupport =
        await this.updateContactSupportUseCase.execute(body);
      return updatedContactSupport;
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
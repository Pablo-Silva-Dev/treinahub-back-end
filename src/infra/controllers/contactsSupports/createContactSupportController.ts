import { ICreateContactSupportDTO } from "@/infra/dtos/ContactSupportDTO";
import { CreateContactSupportUseCase } from "@/infra/useCases/contactsSupport/createContactSupportUseCase";
import { phoneValidationRegex } from "@/utils/regex";
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

const createContactSupportValidationSchema = z.object({
  contact_number: z.string().regex(phoneValidationRegex),
  name: z.string(),
});

@Controller("/contacts-support/create")
@UseGuards(AuthGuard("jwt-admin"))
export class CreateContactSupportController {
  constructor(
    private createContactSupportUseCase: CreateContactSupportUseCase
  ) {}
  @Post()
  @HttpCode(201)
  async handle(@Body() body: ICreateContactSupportDTO) {
    const isBodyValidated =
      createContactSupportValidationSchema.safeParse(body);
    if (!isBodyValidated.success) {
      throw new BadRequestException({
        message: "Invalid request body. Please check the input fields.",
        error: isBodyValidated.error.issues,
      });
    }

    try {
      const newContactSupport =
        await this.createContactSupportUseCase.execute(body);
      return newContactSupport;
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

import { ICreateCertificateDTO } from "@/infra/dtos/CertificateDTO";
import { CreateCertificateUseCase } from "@/infra/useCases/certificates/createCertificateUseCase";
import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
} from "@nestjs/common";
import { z } from "zod";

const createCertificateValidationSchema = z.object({
  user_id: z.string(),
  training_id: z.string(),
  url: z.string().url(),
});

@Controller("/certificates/create")
export class CreateCertificateController {
  constructor(private createCertificateUseCase: CreateCertificateUseCase) {}
  @Post()
  @HttpCode(201)
  async handle(@Body() body: ICreateCertificateDTO) {
    const isBodyValidated = createCertificateValidationSchema.safeParse(body);
    if (!isBodyValidated.success) {
      throw new BadRequestException({
        message: "Invalid request body. Please check the input fields.",
        error: isBodyValidated.error.issues,
      });
    }

    try {
      const newCertificate = await this.createCertificateUseCase.execute(body);
      return newCertificate;
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

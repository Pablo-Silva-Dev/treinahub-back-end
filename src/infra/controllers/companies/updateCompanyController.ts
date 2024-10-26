import { IUpdateCompanyDTO } from "@/infra/dtos/CompanyDTO";
import { phoneValidationRegex } from "@/utils/regex";
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
import { UpdateCompanyUseCase } from "./../../useCases/companies/updateCompanyUseCase";

const validationSchema = z.object({
  id: z.string(),
  fantasy_name: z.string(),
  email: z.string(),
  phone: z.string().regex(phoneValidationRegex).optional(),
});

@Controller("/companies/update-company")
@UseGuards(AuthGuard("jwt-admin"))
export class UpdateCompanyController {
  constructor(private updateCompanyUseCase: UpdateCompanyUseCase) {}
  @Put()
  @HttpCode(203)
  async handle(@Body() body: IUpdateCompanyDTO) {
    const isBodyValidated = validationSchema.safeParse(body);

    if (!isBodyValidated.success) {
      throw new BadRequestException({
        message: "Invalid request body. Please check the input fields.",
        error: isBodyValidated.error.issues,
      });
    }

    try {
      const updatedCompany = this.updateCompanyUseCase.execute(body);
      return updatedCompany;
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

import { IUpdateCompanyPlanDTO } from "@/infra/dtos/CompanyDTO";
import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Put,
} from "@nestjs/common";
import { z } from "zod";
import { UpdateCompanyPlanUseCase } from "../../useCases/companies/updateCompanyPlanUseCase";

const validationSchema = z.object({
  id: z.string(),
  current_plan: z.enum([
    "bronze_mensal",
    "silver_mensal",
    "gold_mensal",
    "bronze_anual",
    "silver_anual",
    "gold_anual",
  ]),
  subscription_id: z.string(),
});

@Controller("/companies/update-company-plan")
export class UpdateCompanyPlanController {
  constructor(private updateCompanyPlanUseCase: UpdateCompanyPlanUseCase) {}
  @Put()
  @HttpCode(203)
  async handle(@Body() body: IUpdateCompanyPlanDTO) {
    const isBodyValidated = validationSchema.safeParse(body);

    if (!isBodyValidated.success) {
      throw new BadRequestException({
        message: "Invalid request body. Please check the input fields.",
        error: isBodyValidated.error.issues,
      });
    }

    try {
      const updatedCompanyPlan = this.updateCompanyPlanUseCase.execute(body);
      return updatedCompanyPlan;
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

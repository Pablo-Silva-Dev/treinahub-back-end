import { IUpdateCompanyPlanDTO } from "@/infra/dtos/CompanyDTO";
import {
    BadRequestException,
    Body,
    ConflictException,
    Controller,
    HttpCode,
    Patch,
    UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { z } from "zod";
import { UpdateCompanyPlanUseCase } from "../../useCases/companies/updateCompanyPlanUseCase";

const validationSchema = z.object({
  id: z.string(),
  current_plan: z.enum(["bronze", "silver", "gold"]),
});

@Controller("/companies/update-company-plan")
@UseGuards(AuthGuard("jwt-admin"))
export class UpdateCompanyPlanController {
  constructor(private updateCompanyPlanUseCase: UpdateCompanyPlanUseCase) {}
  @Patch()
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

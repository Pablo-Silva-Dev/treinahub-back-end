import { GetCompanyByIdUseCase } from "@/infra/useCases/companies/getCompanyByIdUseCase";
import {
  ConflictException,
  Controller,
  Get,
  HttpCode,
  Param,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Controller("/companies/get-by-id")
@UseGuards(AuthGuard("jwt-admin"))
export class GetCompanyByIdController {
  constructor(private getCompanyByIdUseCase: GetCompanyByIdUseCase) {}
  @Get(":companyId")
  @HttpCode(200)
  async handle(@Param("companyId") companyId: string) {
    try {
      const company = await this.getCompanyByIdUseCase.execute(companyId);
      return company;
    } catch (error) {
      console.log("[INTERNAL ERROR]", error.message);
      throw new ConflictException({
        message: "An error occurred.",
        error: error.message,
      });
    }
  }
}

import { ListCompaniesUseCase } from "@/infra/useCases/companies/listCompaniesUseCase";
import {
  ConflictException,
  Controller,
  Get,
  HttpCode,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Controller("/companies/list")
@UseGuards(AuthGuard("jwt-user"))
export class ListCompaniesController {
  constructor(private listCompaniesUseCase: ListCompaniesUseCase) {}
  @Get()
  @HttpCode(200)
  async handle() {
    try {
      const companies = await this.listCompaniesUseCase.execute();
      return companies;
    } catch (error) {
      console.log(["INTERNAL ERROR"], error.message);
      throw new ConflictException({
        message:
          "An error occurred. Check all request body fields for possible mismatching.",
        error: error.message,
      });
    }
  }
}

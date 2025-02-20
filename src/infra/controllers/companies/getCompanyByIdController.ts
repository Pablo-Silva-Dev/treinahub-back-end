import { PandaVideoService } from "@/infra/services/pandaVideoService";
import { GetCompanyByIdUseCase } from "@/infra/useCases/companies/getCompanyByIdUseCase";
import { UpdateCompanyUsedStorageUseCase } from "@/infra/useCases/companies/updateCompanyUsedStorageUseCase";
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
export class GetCompanyByIdController {
  constructor(
    private getCompanyByIdUseCase: GetCompanyByIdUseCase,
    private updateCompanyUsedStorageUseCase: UpdateCompanyUsedStorageUseCase,
    private pandaVideoService: PandaVideoService
  ) {}
  @Get(":companyId")
  @HttpCode(200)
  async handle(@Param("companyId") companyId: string) {
    try {
      const totalStorage =
        await this.pandaVideoService.calculateCompanyConsumedStorage(companyId);
      await this.updateCompanyUsedStorageUseCase.execute({
        id: companyId,
        used_storage: totalStorage,
      });
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

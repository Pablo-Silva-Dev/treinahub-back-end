import { ManageFileService } from "@/infra/services/manageFileService";
import {
  ConflictException,
  Controller,
  Delete,
  HttpCode,
  Param,
  UseGuards,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AuthGuard } from "@nestjs/passport";
import { TEnvSchema } from "env";
import { DeleteCompanyUseCase } from "./../../useCases/companies/deleteCompanyUseCase";

@Controller("/companies/delete")
@UseGuards(AuthGuard("jwt-admin"))
export class DeleteCompanyController {
  constructor(
    private deleteCompanyUseCase: DeleteCompanyUseCase,
    private ConfigService: ConfigService<TEnvSchema, true>,
    private ManageFileService: ManageFileService
  ) {}
  @Delete(":companyId")
  @HttpCode(204)
  async handle(@Param("companyId") companyId: string) {
    try {
      if (!companyId) {
        throw new ConflictException("companyId is required");
      }
      await this.deleteCompanyUseCase.execute(companyId);
      const blobStorageContainer = await this.ConfigService.get(
        "AZURE_BLOB_STORAGE_COMPANIES_LOGOS_CONTAINER_NAME"
      );
      //TODO-PABLO refactor method to create a folder on Azure for each company
      await this.ManageFileService.removeAllExistingUploadedFiles(
        blobStorageContainer
      );
    } catch (error) {
      console.log("[INTERNAL ERROR]", error.message);
      throw new ConflictException({
        message: "An error occurred.",
        error: error.message,
      });
    }
  }
}

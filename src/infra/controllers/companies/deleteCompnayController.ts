import { ManageFileService } from "@/infra/services/manageFileService";
import { GetCompanyByIdUseCase } from "@/infra/useCases/companies/getCompanyByIdUseCase";
import { formatSlug } from "@/utils/formatSlug";
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
    private getCompanyByIdUseCase: GetCompanyByIdUseCase,
    private deleteCompanyUseCase: DeleteCompanyUseCase,
    private configService: ConfigService<TEnvSchema, true>,
    private manageFileService: ManageFileService
  ) {}
  @Delete(":companyId")
  @HttpCode(204)
  async handle(@Param("companyId") companyId: string) {
    try {
      if (!companyId) {
        throw new ConflictException("companyId is required");
      }

      const { users } = await this.getCompanyByIdUseCase.execute(companyId);

      const userNames = users.map((user) => formatSlug(user.name));

      const companiesLogosContainerName = await this.configService.get(
        "AZURE_BLOB_STORAGE_COMPANIES_LOGOS_CONTAINER_NAME"
      );
      const certificatesContainerName = await this.configService.get(
        "AZURE_BLOB_STORAGE_CERTIFICATES_CONTAINER_NAME"
      );

      const uploadedFileNames = await this.manageFileService.listContainerFiles(
        certificatesContainerName,
        companyId
      );

      for (const fileName of uploadedFileNames) {
        userNames.forEach(async (userName) => {
          if (fileName.includes(userName)) {
            await this.manageFileService.removeUploadedFile(
              fileName.split("/")[1],
              certificatesContainerName,
              companyId
            );
          }
        });
      }

      await this.manageFileService.removeAllExistingUploadedFiles(
        companiesLogosContainerName,
        companyId
      );

      await this.deleteCompanyUseCase.execute(companyId);
    } catch (error) {
      console.log("[INTERNAL ERROR]", error.message);
      throw new ConflictException({
        message: "An error occurred.",
        error: error.message,
      });
    }
  }
}

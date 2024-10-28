import { ICreateCompanyDTO } from "@/infra/dtos/CompanyDTO";
import { ManageFileService } from "@/infra/services/manageFileService";
import { CreateCompanyUseCase } from "@/infra/useCases/companies/createCompanyUseCase";
import { UpdateCompanyUseCase } from "@/infra/useCases/companies/updateCompanyUseCase";
import { formatSlug } from "@/utils/formatSlug";
import { phoneValidationRegex } from "@/utils/regex";
import {
  BadRequestException,
  ConflictException,
  Controller,
  HttpCode,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AuthGuard } from "@nestjs/passport";
import { FileInterceptor } from "@nestjs/platform-express";
import { TEnvSchema } from "env";
import { Request } from "express";
import { z } from "zod";

const validationSchema = z.object({
  fantasy_name: z.string(),
  cnpj: z.string(),
  social_reason: z.string(),
  email: z.string(),
  current_plan: z.enum(["gold", "platinum", "diamond"]),
  phone: z.string().regex(phoneValidationRegex).optional(),
});

@Controller("/companies/create")
@UseGuards(AuthGuard("jwt-admin"))
@UseInterceptors(FileInterceptor("img_file"))
export class CreateCompanyController {
  constructor(
    private createCompanyUseCase: CreateCompanyUseCase,
    private updateCompanyUseCase: UpdateCompanyUseCase,
    private manageFileService: ManageFileService,
    private configService: ConfigService<TEnvSchema, true>
  ) {}
  @HttpCode(201)
  @Post()
  async handle(
    @Req() req: Request<any, ICreateCompanyDTO>,
    @UploadedFile() file: Express.Multer.File
  ) {
    const isBodyValidated = validationSchema.safeParse(req.body);
    if (!isBodyValidated.success) {
      throw new BadRequestException({
        message: "Invalid request body. Please check the input fields.",
        error: isBodyValidated.error.issues,
      });
    }

    try {
      // Create the company and get the new company's ID
      const newCompany = await this.createCompanyUseCase.execute(req.body);
      const { id: companyId } = newCompany;

      // Get the Azure blob storage container name
      const blobStorageContainer = await this.configService.get(
        "AZURE_BLOB_STORAGE_COMPANIES_LOGOS_CONTAINER_NAME"
      );

      // Create a folder using the new company's ID
      const containerFolderName = await this.manageFileService.createFolder(
        blobStorageContainer,
        companyId
      );

      // Determine the file extension for the uploaded file
      const fileExtension = file.originalname.split(".").pop();
      const fileName = `${formatSlug(newCompany.fantasy_name)}-logo.${fileExtension}`;

      // Upload the file to the new folder
      const uploadedFileUrl = await this.manageFileService.uploadFile(
        file.buffer,
        `${containerFolderName}/${fileName}`,
        blobStorageContainer
      );

      // Update the company with the uploaded file's URL
      const updatedCompany = await this.updateCompanyUseCase.execute({
        id: companyId,
        logo_url: uploadedFileUrl,
      });

      // Return the updated company
      return updatedCompany;
    } catch (error) {
      console.log(["INTERNAL_ERROR"], error.message);
      throw new ConflictException({
        message:
          "An error occurred. Check all request body fields for possible mismatching.",
        error: error.message,
      });
    }
  }
}

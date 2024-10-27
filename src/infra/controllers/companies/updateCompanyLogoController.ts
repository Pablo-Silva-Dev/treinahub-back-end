import { ManageFileService } from "@/infra/services/manageFileService";
import { GetCompanyByIdUseCase } from "@/infra/useCases/companies/getCompanyByIdUseCase";
import { formatSlug } from "@/utils/formatSlug";
import {
  BadRequestException,
  ConflictException,
  Controller,
  HttpCode,
  Patch,
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
import { UpdateCompanyLogoUseCase } from "../../useCases/companies/updateCompanyLogoUseCase";

const validationSchema = z.object({
  id: z.string(),
});

@Controller("/companies/update-company-logo")
@UseGuards(AuthGuard("jwt-admin"))
@UseInterceptors(FileInterceptor("img_file"))
export class UpdateCompanyLogoController {
  constructor(
    private updateCompanyLogoUseCase: UpdateCompanyLogoUseCase,
    private getCompanyByIdUseCase: GetCompanyByIdUseCase,
    private manageFileService: ManageFileService,
    private configService: ConfigService<TEnvSchema, true>
  ) {}
  @Patch()
  @HttpCode(203)
  async handle(@Req() req: Request, @UploadedFile() file: Express.Multer.File) {
    const isBodyValidated = validationSchema.safeParse(req.body);

    if (!isBodyValidated.success) {
      throw new BadRequestException({
        message: "Invalid request body. Please check the input fields.",
        error: isBodyValidated.error.issues,
      });
    }

    try {
      const { id: companyId, fantasy_name } =
        await this.getCompanyByIdUseCase.execute(req.body.id);

      const fileExtension = file.originalname.split(".")[1];
      const fileName = `${formatSlug(fantasy_name)}-logo.${fileExtension}`;

      const blobStorageContainer = await this.configService.get(
        "AZURE_BLOB_STORAGE_COMPANIES_LOGOS_CONTAINER_NAME"
      );

      const uploadedFileUrl = await this.manageFileService.uploadFile(
        file.buffer,
        fileName,
        `${blobStorageContainer}/${companyId}`
      );

      const updatedCompanyLogo = this.updateCompanyLogoUseCase.execute({
        ...req.body,
        logo_url: uploadedFileUrl,
      });
      return updatedCompanyLogo;
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

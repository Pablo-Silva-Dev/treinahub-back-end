import { ManageFileService } from "@/infra/services/manageFileService";
import { CreateCompanyUseCase } from "@/infra/useCases/companies/createCompanyUseCase";
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
    private manageFileService: ManageFileService,
    private configService: ConfigService<TEnvSchema, true>
  ) {}
  @HttpCode(201)
  @Post()
  async handle(@Req() req: Request, @UploadedFile() file: Express.Multer.File) {
    const isBodyValidated = validationSchema.safeParse(req.body);
    if (!isBodyValidated.success) {
      throw new BadRequestException({
        message: "Invalid request body. Please check the input fields.",
        error: isBodyValidated.error.issues,
      });
    }

    try {
      const blobStorageContainer = await this.configService.get(
        "AZURE_BLOB_STORAGE_COMPANIES_LOGOS_CONTAINER_NAME"
      );

      const fileExtension = file.originalname.split(".")[1];

      const fileName = req.body.id + "." + fileExtension;

      const uploadedFileUrl = await this.manageFileService.uploadFile(
        file.buffer,
        fileName,
        blobStorageContainer
      );

      const newCompany = await this.createCompanyUseCase.execute({
        ...req.body,
        logo_url: uploadedFileUrl,
      });
      return newCompany;
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

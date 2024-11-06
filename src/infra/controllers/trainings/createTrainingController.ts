import { ManageFileService } from "@/infra/services/manageFileService";
import { PandaVideoService } from "@/infra/services/pandaVideoService";
import { CreateTrainingUseCase } from "@/infra/useCases/trainings/createTrainingUseCase";
import { formatSlug } from "@/utils/formatSlug";
import {
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

const createTrainingBodySchema = z.object({
  name: z.string(),
  description: z.string(),
  company_id: z.string(),
});

@Controller("/trainings/create")
@UseGuards(AuthGuard("jwt-admin"))
@UseInterceptors(FileInterceptor("file"))
export class CreateTrainingController {
  constructor(
    private createTrainingUseCase: CreateTrainingUseCase,
    private configService: ConfigService<TEnvSchema, true>,
    private manageFileService: ManageFileService,
    private pandaVideoService: PandaVideoService
  ) {}

  @Post()
  @HttpCode(201)
  async handle(@UploadedFile() file: Express.Multer.File, @Req() req: Request) {
    const isBodyValidated = createTrainingBodySchema.safeParse(req.body);

    if (!isBodyValidated.success) {
      throw new ConflictException({
        message: "Invalid request body. Please check the input fields.",
        errors: isBodyValidated.error.issues,
      });
    }

    try {
      const { name, company_id } = req.body;

      const fileExtension = file.originalname.split(".")[1];

      const fileName = name + "-cover." + fileExtension;

      const blobStorageContainerName = this.configService.get(
        "AZURE_BLOB_STORAGE_TRAININGS_COVERS_CONTAINER_NAME"
      );

      const containerFolderName = await this.manageFileService.createFolder(
        blobStorageContainerName,
        company_id
      );

      const uploadedFile = await this.manageFileService.uploadFile(
        file.buffer,
        `${containerFolderName}/${fileName}`,
        blobStorageContainerName
      );

      const { folders } = await this.pandaVideoService.listFolders();

      const companyFolder = folders.find((fold) =>
        fold.name.includes(company_id)
      );

      const createdTraining = await this.createTrainingUseCase.execute({
        ...req.body,
        cover_url: uploadedFile,
      });

      await this.pandaVideoService.createFolder(
        `${formatSlug(name)}-${createdTraining.id}`,
        companyFolder.id
      );
      return createdTraining;
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

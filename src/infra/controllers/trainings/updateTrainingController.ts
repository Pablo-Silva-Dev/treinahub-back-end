import { ManageFileService } from "@/infra/services/manageFileService";
import { GetTrainingByIdUseCase } from "@/infra/useCases/trainings/getTrainingByIdUseCase";
import { UpdateTrainingUseCase } from "@/infra/useCases/trainings/updateTrainingUseCase";
import {
  BadRequestException,
  ConflictException,
  Controller,
  HttpCode,
  Put,
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

const updateTrainingSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  description: z.string().optional(),
});

@Controller("/trainings/update")
@UseGuards(AuthGuard("jwt-admin"))
@UseInterceptors(FileInterceptor("file"))
export class UpdateTrainingController {
  constructor(
    private updateTrainingUseCase: UpdateTrainingUseCase,
    private getTrainingByIdUseCase: GetTrainingByIdUseCase,
    private configService: ConfigService<TEnvSchema, true>,
    private manageFileService: ManageFileService
  ) {}

  @Put()
  @HttpCode(203)
  async handle(@UploadedFile() file: Express.Multer.File, @Req() req: Request) {
    const isBodyValidated = updateTrainingSchema.safeParse(req.body);

    if (!isBodyValidated.success) {
      throw new BadRequestException({
        message: "The body format is invalid. Check the fields below:",
        errors: isBodyValidated.error.issues,
      });
    }

    try {
      if (file) {
        const { company_id } = await this.getTrainingByIdUseCase.execute(
          req.body.id
        );

        const fileExtension = file.originalname.split(".")[1];
        const fileName = req.body.name + "-cover." + fileExtension;

        const blobStorageContainerName = this.configService.get(
          "AZURE_BLOB_STORAGE_TRAININGS_COVERS_CONTAINER_NAME"
        );

        const uploadedFile = await this.manageFileService.uploadFile(
          file.buffer,
          `${company_id}/${fileName}`,
          blobStorageContainerName
        );

        const updatedTraining = await this.updateTrainingUseCase.execute({
          ...req.body,
          cover_url: uploadedFile,
        });
        return updatedTraining;
      }
      const updatedTraining = await this.updateTrainingUseCase.execute({
        ...req.body,
      });
      return updatedTraining;
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

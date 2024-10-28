import { ManageFileService } from "@/infra/services/manageFileService";
import { DeleteTrainingUseCase } from "@/infra/useCases/trainings/deleteTrainingUseCase";
import { extractFileNameFromUrl } from "@/utils/formatString";
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
import { GetTrainingByIdUseCase } from "./../../useCases/trainings/getTrainingByIdUseCase";

@Controller("trainings/delete")
@UseGuards(AuthGuard("jwt-admin"))
export class DeleteTrainingController {
  constructor(
    private deleteTrainingUseCase: DeleteTrainingUseCase,
    private getTrainingByIdUseCase: GetTrainingByIdUseCase,
    private manageFileService: ManageFileService,
    private configService: ConfigService<TEnvSchema, true>
  ) {}
  @Delete(":trainingId")
  @HttpCode(200)
  async handle(@Param("trainingId") trainingId: string) {
    if (!trainingId) {
      throw new ConflictException("trainingId is required");
    }
    try {
      const training = await this.getTrainingByIdUseCase.execute(trainingId);

      const { cover_url, company_id } = training;
      const fileName = extractFileNameFromUrl(cover_url);
      const containerName = await this.configService.get(
        "AZURE_BLOB_STORAGE_TRAININGS_COVERS_CONTAINER_NAME"
      );

      await this.manageFileService.removeUploadedFile(
        fileName,
        containerName,
        company_id
      );

      await this.deleteTrainingUseCase.execute(trainingId);
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

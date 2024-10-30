import { ManageFileService } from "@/infra/services/manageFileService";
import { ListTrainingMetricsByUserUseCase } from "@/infra/useCases/trainingMetrics/listTrainingMetricsByUserUseCase";
import { DeleteUserUseCase } from "@/infra/useCases/users/deleteUserUseCase";
import { GetUserByIdUseCase } from "@/infra/useCases/users/getUserByIdUseCase";
import { formatSlug } from "@/utils/formatSlug";
import {
  BadRequestException,
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

@Controller("/users/delete")
@UseGuards(AuthGuard("jwt-user"))
export class DeleteUserController {
  constructor(
    private getUserByIdUseCase: GetUserByIdUseCase,
    private deleteUserUseCase: DeleteUserUseCase,
    private manageFileService: ManageFileService,
    private listTrainingMetricsByUserId: ListTrainingMetricsByUserUseCase,
    private configService: ConfigService<TEnvSchema, true>
  ) {}
  @Delete(":userId")
  @HttpCode(200)
  async handle(@Param("userId") userId: string) {
    if (!userId) {
      throw new BadRequestException("userId is required");
    }
    try {
      const trainings = await this.listTrainingMetricsByUserId.execute(userId);
      const { company_id } = await this.getUserByIdUseCase.execute(userId);

      const containerName = await this.configService.get(
        "AZURE_BLOB_STORAGE_CERTIFICATES_CONTAINER_NAME"
      );

      const certificatesFileNames = trainings.map((t) => ({
        fileName: `${formatSlug(t.training.name + "-" + t.user.name)}-certificado.png`,
      }));
      for (const certificate of certificatesFileNames) {
        await this.manageFileService.removeUploadedFile(
          certificate.fileName,
          containerName,
          company_id
        );
      }

      await this.deleteUserUseCase.execute(userId);
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

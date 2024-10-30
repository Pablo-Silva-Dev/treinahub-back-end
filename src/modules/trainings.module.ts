import { CreateTrainingController } from "@/infra/controllers/trainings/createTrainingController";
import { DeleteTrainingController } from "@/infra/controllers/trainings/deleteTrainingController";
import { GetTrainingByIdController } from "@/infra/controllers/trainings/getTrainingByIdController";
import { ListTrainingsByCompanyController } from "@/infra/controllers/trainings/listTrainingsByCompanyController";
import { UpdateTrainingController } from "@/infra/controllers/trainings/updateTrainingController";
import { CompaniesImplementation } from "@/infra/repositories/implementations/companiesImplementation";
import { TrainingsImplementation } from "@/infra/repositories/implementations/trainingsImplementation";
import { AzureBlobStorageService } from "@/infra/services/azureBlobStorageService";
import { ManageFileService } from "@/infra/services/manageFileService";
import { PrismaService } from "@/infra/services/prisma";
import { CreateTrainingUseCase } from "@/infra/useCases/trainings/createTrainingUseCase";
import { DeleteTrainingUseCase } from "@/infra/useCases/trainings/deleteTrainingUseCase";
import { GetTrainingByIdUseCase } from "@/infra/useCases/trainings/getTrainingByIdUseCase";
import { ListTrainingsByCompanyUseCase } from "@/infra/useCases/trainings/listTrainingsByCompanyUseCase";
import { UpdateTrainingUseCase } from "@/infra/useCases/trainings/updateTrainingUseCase";
import { Module } from "@nestjs/common";

@Module({
  controllers: [
    CreateTrainingController,
    ListTrainingsByCompanyController,
    GetTrainingByIdController,
    DeleteTrainingController,
    UpdateTrainingController,
  ],
  providers: [
    PrismaService,
    TrainingsImplementation,
    CompaniesImplementation,
    ManageFileService,
    AzureBlobStorageService,
    CreateTrainingUseCase,
    ListTrainingsByCompanyUseCase,
    GetTrainingByIdUseCase,
    DeleteTrainingUseCase,
    UpdateTrainingUseCase,
  ],
})
export class TrainingsModule {}

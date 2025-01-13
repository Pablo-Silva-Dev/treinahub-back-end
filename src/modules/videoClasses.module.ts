import { CreateVideoClassController } from "@/infra/controllers/videoClasses/createVideoClassController";
import { DeleteVideoClassController } from "@/infra/controllers/videoClasses/deleteVideoClassController";
import { GetVideoClassByIdController } from "@/infra/controllers/videoClasses/GetVideoClassByIdControlller";
import { ListVideoClassesByCompanyController } from "@/infra/controllers/videoClasses/listVideoClassesByCompanyController";
import { ListVideoClassesByTrainingController } from "@/infra/controllers/videoClasses/listVideoClassesByTraining";
import { ListVideoClassesController } from "@/infra/controllers/videoClasses/listVideoClassesControlller";
import { UpdateVideoClassController } from "@/infra/controllers/videoClasses/updateVideoClassController";
import { CompaniesImplementation } from "@/infra/repositories/implementations/companiesImplementation";
import { TrainingsImplementation } from "@/infra/repositories/implementations/trainingsImplementation";
import { VideoClassesImplementation } from "@/infra/repositories/implementations/videoClassesImplementation";
import { AzureBlobStorageService } from "@/infra/services/azureBlobStorageService";
import { ManageFileService } from "@/infra/services/manageFileService";
import { PandaVideoService } from "@/infra/services/pandaVideoService";
import { PrismaService } from "@/infra/services/prisma";
import { ListTrainingsByCompanyUseCase } from "@/infra/useCases/trainings/listTrainingsByCompanyUseCase";
import { CreateVideoClassUseCase } from "@/infra/useCases/videoClasses/createVideoClassUseCase";
import { DeleteVideoClassUseCase } from "@/infra/useCases/videoClasses/deleteVideoClassUseCase";
import { GetVideoClassByIdUseCase } from "@/infra/useCases/videoClasses/getVideoClassByIdUseCase";
import { ListVideoClassesByCompanyUseCase } from "@/infra/useCases/videoClasses/listVideoClassesByCompanyUseCase";
import { ListVideoClassesByTrainingUseCase } from "@/infra/useCases/videoClasses/listVideoClassesByTrainingUseCase";
import { ListVideoClassesUseCase } from "@/infra/useCases/videoClasses/listVideoClassesUseCase";
import { UpdateVideoClassUseCase } from "@/infra/useCases/videoClasses/updateVideoClassUseCase";
import { Module } from "@nestjs/common";

@Module({
  providers: [
    PrismaService,
    VideoClassesImplementation,
    TrainingsImplementation,
    CompaniesImplementation,
    ManageFileService,
    PandaVideoService,
    AzureBlobStorageService,
    CreateVideoClassUseCase,
    ListVideoClassesByTrainingUseCase,
    ListTrainingsByCompanyUseCase,
    ListVideoClassesByCompanyUseCase,
    ListVideoClassesUseCase,
    GetVideoClassByIdUseCase,
    UpdateVideoClassUseCase,
    DeleteVideoClassUseCase,
  ],
  controllers: [
    CreateVideoClassController,
    ListVideoClassesController,
    ListVideoClassesByTrainingController,
    ListVideoClassesByCompanyController,
    GetVideoClassByIdController,
    UpdateVideoClassController,
    DeleteVideoClassController,
  ],
})
export class VideoClassesModule {}

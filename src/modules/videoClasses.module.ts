import { CreateVideoClassController } from "@/infra/controllers/videoClasses/createVideoClassController";
import { DeleteVideoClassController } from "@/infra/controllers/videoClasses/deleteVideoClassController";
import { GetVideoClassByIdController } from "@/infra/controllers/videoClasses/GetVideoClassByIdControlller";
import { ListVideoClassesByTrainingController } from "@/infra/controllers/videoClasses/listVideoClassesByTraining";
import { ListVideoClassesController } from "@/infra/controllers/videoClasses/listVideoClassesControlller";
import { UpdateVideoClassController } from "@/infra/controllers/videoClasses/updateVideoClassController";
import { TrainingsImplementation } from "@/infra/repositories/implementations/trainingsImplementation";
import { VideoClassesImplementation } from "@/infra/repositories/implementations/videoClassesImplementation";
import { AzureBlobStorageService } from "@/infra/services/azureBlobStorageService";
import { BitmovinVideoEncodingService } from "@/infra/services/bitmovinVideoEncodingService";
import { ManageFileService } from "@/infra/services/manageFileService";
import { PrismaService } from "@/infra/services/prisma";
import { CreateVideoClassUseCase } from "@/infra/useCases/videoClasses/createVideoClassUseCase";
import { DeleteVideoClassUseCase } from "@/infra/useCases/videoClasses/deleteVideoClassUseCase";
import { GetVideoClassByIdUseCase } from "@/infra/useCases/videoClasses/getVideoClassByIdUseCase";
import { ListVideoClassesByTrainingUseCase } from "@/infra/useCases/videoClasses/listVideoClassesByTrainingUseCase";
import { ListVideoClassesUseCase } from "@/infra/useCases/videoClasses/listVideoClassesUseCase";
import { UpdateVideoClassUseCase } from "@/infra/useCases/videoClasses/updateVideoClassUseCase";
import { Module } from "@nestjs/common";

@Module({
  providers: [
    PrismaService,
    VideoClassesImplementation,
    TrainingsImplementation,
    ManageFileService,
    AzureBlobStorageService,
    BitmovinVideoEncodingService,
    CreateVideoClassUseCase,
    ListVideoClassesByTrainingUseCase,
    ListVideoClassesUseCase,
    GetVideoClassByIdUseCase,
    UpdateVideoClassUseCase,
    DeleteVideoClassUseCase,
  ],
  controllers: [
    CreateVideoClassController,
    ListVideoClassesController,
    ListVideoClassesByTrainingController,
    GetVideoClassByIdController,
    UpdateVideoClassController,
    DeleteVideoClassController,
  ],
})
export class VideoClassesModule {}

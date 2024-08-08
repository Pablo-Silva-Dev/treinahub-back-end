import { CreateVideoClassController } from "@/infra/controllers/videoClasses/createVideoClassController";
import { GetVideoClassByIdController } from "@/infra/controllers/videoClasses/GetVideoClassByIdControlller";
import { ListVideoClassesByTrainingController } from "@/infra/controllers/videoClasses/listVideoClassesByTraining";
import { ListVideoClassesController } from "@/infra/controllers/videoClasses/listVideoClassesControlller";
import { TrainingsImplementation } from "@/infra/repositories/implementations/trainingsImplementation";
import { VideoClassesImplementation } from "@/infra/repositories/implementations/videoClassesImplementation";
import { PrismaService } from "@/infra/services/prisma";
import { CreateVideoClassUseCase } from "@/infra/useCases/videoClasses/createVideoClassUseCase";
import { GetVideoClassByIdUseCase } from "@/infra/useCases/videoClasses/getVideoClassByIdUseCase";
import { ListVideoClassesByTrainingUseCase } from "@/infra/useCases/videoClasses/listVideoClassesByTrainingUseCase";
import { ListVideoClassesUseCase } from "@/infra/useCases/videoClasses/listVideoClassesUseCase";
import { Module } from "@nestjs/common";

@Module({
  providers: [
    PrismaService,
    VideoClassesImplementation,
    TrainingsImplementation,
    CreateVideoClassUseCase,
    ListVideoClassesByTrainingUseCase,
    ListVideoClassesUseCase,
    GetVideoClassByIdUseCase,
  ],
  controllers: [
    CreateVideoClassController,
    ListVideoClassesController,
    ListVideoClassesByTrainingController,
    GetVideoClassByIdController,
  ],
})
export class VideoClassesModule {}

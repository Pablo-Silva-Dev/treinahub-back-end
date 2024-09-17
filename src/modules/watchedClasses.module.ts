import { CreateWatchedClassController } from "@/infra/controllers/watchedClasses/createWatchedClassController";
import { GetWatchedClassByUserAndClassController } from "@/infra/controllers/watchedClasses/GetWatchedClassByUserAndClassController";
import { ListWatchedClassesByUserController } from "@/infra/controllers/watchedClasses/listWatchedClassesByUserController";
import { ListWatchedClassesByUserIdAndTrainingIdController } from "@/infra/controllers/watchedClasses/listWatchedClassesByUserIdAndTrainingIdController";
import { ListWatchedClassesController } from "@/infra/controllers/watchedClasses/listWatchedClassesController";
import { RemoveWatchedClassController } from "@/infra/controllers/watchedClasses/removeWatchedClassController";
import { UpdateVideoClassExecutionStatusController } from "@/infra/controllers/watchedClasses/UpdateVideoClassExecutionStatusController";
import { TrainingsImplementation } from "@/infra/repositories/implementations/trainingsImplementation";
import { UsersImplementation } from "@/infra/repositories/implementations/usersImplementation";
import { VideoClassesImplementation } from "@/infra/repositories/implementations/videoClassesImplementation";
import { WatchedClassesImplementation } from "@/infra/repositories/implementations/watchedClassesImplementation";
import { PrismaService } from "@/infra/services/prisma";
import { CreateWatchedClassUseCase } from "@/infra/useCases/watchedClasses/createWatchedClassUseCase";
import { GetWatchedClassByUserAndClassUseCase } from "@/infra/useCases/watchedClasses/GetWatchedClassByUserAndClassUseCase";
import { ListWatchedClassesByUserIdAndTrainingIdUseCase } from "@/infra/useCases/watchedClasses/listWatchedClassesByTrainingIdAndUserIdUseCase";
import { ListWatchedClassesByUserUseCase } from "@/infra/useCases/watchedClasses/listWatchedClassesByUserUseCase";
import { ListWatchedClassesUseCase } from "@/infra/useCases/watchedClasses/listWatchedClassesUseCase";
import { RemoveWatchedClassUseCase } from "@/infra/useCases/watchedClasses/removeWatchedClassUseCase";
import { UpdateVideoClassExecutionStatusUseCase } from "@/infra/useCases/watchedClasses/UpdateVideoClassExecutionStatusUseCase";
import { Module } from "@nestjs/common";

@Module({
  providers: [
    PrismaService,
    UsersImplementation,
    TrainingsImplementation,
    VideoClassesImplementation,
    WatchedClassesImplementation,
    CreateWatchedClassUseCase,
    ListWatchedClassesUseCase,
    ListWatchedClassesByUserIdAndTrainingIdUseCase,
    RemoveWatchedClassUseCase,
    ListWatchedClassesByUserUseCase,
    UpdateVideoClassExecutionStatusUseCase,
    GetWatchedClassByUserAndClassUseCase,
  ],
  controllers: [
    CreateWatchedClassController,
    ListWatchedClassesController,
    ListWatchedClassesByUserIdAndTrainingIdController,
    RemoveWatchedClassController,
    ListWatchedClassesByUserController,
    UpdateVideoClassExecutionStatusController,
    GetWatchedClassByUserAndClassController,
  ],
})
export class WatchedClassesModule {}

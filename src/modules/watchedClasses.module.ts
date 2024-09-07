import { CreateWatchedClassController } from "@/infra/controllers/watchedClasses/createWatchedClassController";
import { ListWatchedClassesByUserController } from "@/infra/controllers/watchedClasses/listWatchedClassesByUserController";
import { ListWatchedClassesByUserIdAndTrainingIdController } from "@/infra/controllers/watchedClasses/listWatchedClassesByUserIdAndTrainingIdController";
import { ListWatchedClassesController } from "@/infra/controllers/watchedClasses/listWatchedClassesController";
import { RemoveWatchedClassController } from "@/infra/controllers/watchedClasses/removeWatchedClassController";
import { TrainingsImplementation } from "@/infra/repositories/implementations/trainingsImplementation";
import { UsersImplementation } from "@/infra/repositories/implementations/usersImplementation";
import { VideoClassesImplementation } from "@/infra/repositories/implementations/videoClassesImplementation";
import { WatchedClassesImplementation } from "@/infra/repositories/implementations/watchedClassesImplementation";
import { PrismaService } from "@/infra/services/prisma";
import { CreateWatchedClassUseCase } from "@/infra/useCases/watchedClasses/createWatchedClassUseCase";
import { ListWatchedClassesByUserIdAndTrainingIdUseCase } from "@/infra/useCases/watchedClasses/listWatchedClassesByTrainingIdAndUserIdUseCase";
import { ListWatchedClassesByUserUseCase } from "@/infra/useCases/watchedClasses/listWatchedClassesByUserUseCase";
import { ListWatchedClassesUseCase } from "@/infra/useCases/watchedClasses/listWatchedClassesUseCase";
import { RemoveWatchedClassUseCase } from "@/infra/useCases/watchedClasses/removeWatchedClassUseCase";
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
  ],
  controllers: [
    CreateWatchedClassController,
    ListWatchedClassesController,
    ListWatchedClassesByUserIdAndTrainingIdController,
    RemoveWatchedClassController,
    ListWatchedClassesByUserController,
  ],
})
export class WatchedClassesModule {}

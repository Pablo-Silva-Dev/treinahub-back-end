import { CreateTrainingController } from "@/infra/controllers/trainings/createTrainingController";
import { DeleteTrainingController } from "@/infra/controllers/trainings/deleteTrainingController";
import { GetTrainingByIdController } from "@/infra/controllers/trainings/getTrainingByIdController";
import { ListTrainingsController } from "@/infra/controllers/trainings/listTrainingController";
import { UpdateTrainingController } from "@/infra/controllers/trainings/updateTrainingController";
import { TrainingsImplementation } from "@/infra/repositories/implementations/trainingsImplementation";
import { PrismaService } from "@/infra/services/prisma";
import { CreateTrainingUseCase } from "@/infra/useCases/trainings/createTrainingUseCase";
import { DeleteTrainingUseCase } from "@/infra/useCases/trainings/deleteTrainingUseCase";
import { GetTrainingByIdUseCase } from "@/infra/useCases/trainings/getTrainingByIdUseCase";
import { ListTrainingsUseCase } from "@/infra/useCases/trainings/listTrainingsUseCase";
import { UpdateTrainingUseCase } from "@/infra/useCases/trainings/updateTrainingUseCase";
import { Module } from "@nestjs/common";

@Module({
  controllers: [
    CreateTrainingController,
    ListTrainingsController,
    GetTrainingByIdController,
    DeleteTrainingController,
    UpdateTrainingController,
  ],
  providers: [
    PrismaService,
    TrainingsImplementation,
    CreateTrainingUseCase,
    ListTrainingsUseCase,
    GetTrainingByIdUseCase,
    DeleteTrainingUseCase,
    UpdateTrainingUseCase,
  ],
})
export class TrainingsModule {}

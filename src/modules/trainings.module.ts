import { CreateTrainingController } from "@/infra/controllers/trainings/createTrainingController";
import { ListTrainingsController } from "@/infra/controllers/trainings/listTrainingController";
import { TrainingsImplementation } from "@/infra/repositories/implementations/trainingsImplementation";
import { PrismaService } from "@/infra/services/prisma";
import { CreateTrainingUseCase } from "@/infra/useCases/trainings/createTrainingUseCase";
import { ListTrainingsUseCase } from "@/infra/useCases/trainings/listTrainingsUseCase";
import { Module } from "@nestjs/common";

@Module({
  controllers: [CreateTrainingController, ListTrainingsController],
  providers: [
    PrismaService,
    TrainingsImplementation,
    CreateTrainingUseCase,
    ListTrainingsUseCase,
  ],
})
export class TrainingsModule {}

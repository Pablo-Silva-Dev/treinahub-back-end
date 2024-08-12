import { CreateTrainingMetricsController } from "@/infra/controllers/trainingMetrics/createTrainingMetricsController";
import { GetTrainingMetricsByIdController } from "@/infra/controllers/trainingMetrics/getTrainingByIdController";
import { ListTrainingMetricsByUserController } from "@/infra/controllers/trainingMetrics/listTrainingMetricsByUserController";
import { ListTrainingMetricsController } from "@/infra/controllers/trainingMetrics/listTrainingMetricsController";
import { UpdateTrainingMetricsController } from "@/infra/controllers/trainingMetrics/updateTrainingMetricsController";
import { TrainingMetricsImplementation } from "@/infra/repositories/implementations/trainingMetricsImplementation";
import { TrainingsImplementation } from "@/infra/repositories/implementations/trainingsImplementation";
import { UsersImplementation } from "@/infra/repositories/implementations/usersImplementation";
import { WatchedClassesImplementation } from "@/infra/repositories/implementations/watchedClassesImplementation";
import { PrismaService } from "@/infra/services/prisma";
import { CreateTrainingMetricsUseCase } from "@/infra/useCases/trainingMetrics/createTrainingMetricsUseCase";
import { GetTrainingMetricsByIdUseCase } from "@/infra/useCases/trainingMetrics/getTrainingMetricsByIdUseCase";

import { ListTrainingMetricsByUserUseCase } from "@/infra/useCases/trainingMetrics/listTrainingMetricsByUserUseCase";
import { ListTrainingMetricsUseCase } from "@/infra/useCases/trainingMetrics/listTrainingMetricsUseCase";
import { UpdateTrainingMetricsUseCase } from "@/infra/useCases/trainingMetrics/updateTrainingMetricsUseCase";
import { Module } from "@nestjs/common";

@Module({
  providers: [
    PrismaService,
    UsersImplementation,
    TrainingMetricsImplementation,
    TrainingsImplementation,
    WatchedClassesImplementation,
    CreateTrainingMetricsUseCase,
    ListTrainingMetricsUseCase,
    GetTrainingMetricsByIdUseCase,
    ListTrainingMetricsByUserUseCase,
    UpdateTrainingMetricsUseCase,
  ],
  controllers: [
    CreateTrainingMetricsController,
    ListTrainingMetricsController,
    GetTrainingMetricsByIdController,
    ListTrainingMetricsByUserController,
    UpdateTrainingMetricsController,
  ],
})
export class TrainingMetricsModule {}

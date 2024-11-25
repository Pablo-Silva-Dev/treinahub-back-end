import { CreateQuizController } from "@/infra/controllers/quizzes/CreateQuizController";
import { DeleteQuizController } from "@/infra/controllers/quizzes/DeleteQuizController";
import { GetQuizByIdController } from "@/infra/controllers/quizzes/GetQuizByIdController";
import { GetQuizByTrainingController } from "@/infra/controllers/quizzes/GetQuizByTrainingController";
import { ListQuizzesController } from "@/infra/controllers/quizzes/ListQuizzesController";
import { QuizzesImplementation } from "@/infra/repositories/implementations/quizzesImplementation";
import { TrainingsImplementation } from "@/infra/repositories/implementations/trainingsImplementation";
import { PrismaService } from "@/infra/services/prisma";
import { CreateQuizUseCase } from "@/infra/useCases/quizzes/createQuizzUseCase";
import { DeleteQuizUseCase } from "@/infra/useCases/quizzes/deleteQuizUseCase";
import { GetQuizByIdUseCase } from "@/infra/useCases/quizzes/getQuizByIdUseCase";
import { GetQuizByTrainingUseCase } from "@/infra/useCases/quizzes/getQuizByTrainingUseCase";
import { ListQuizzesUseCase } from "@/infra/useCases/quizzes/listQuizzesUseCase";
import { Module } from "@nestjs/common";

@Module({
  providers: [
    PrismaService,
    QuizzesImplementation,
    TrainingsImplementation,
    CreateQuizUseCase,
    ListQuizzesUseCase,
    DeleteQuizUseCase,
    GetQuizByIdUseCase,
    GetQuizByTrainingUseCase,
  ],
  controllers: [
    CreateQuizController,
    ListQuizzesController,
    DeleteQuizController,
    GetQuizByTrainingController,
    GetQuizByIdController,
  ],
})
export class QuizzesModule {}

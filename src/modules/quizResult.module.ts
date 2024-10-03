import { CreateQuizResultController } from "@/infra/controllers/quizResults/CreateQuizResultController";
import { DeleteQuizResultController } from "@/infra/controllers/quizResults/DeleteQuizResultController";
import { GetQuizResultByUserAndQuizAttemptController } from "@/infra/controllers/quizResults/GetQuizResultByUserAndQuizAttemptController";
import { QuizAttemptsImplementation } from "@/infra/repositories/implementations/quizAttemptImplementation";
import { QuizResultsImplementation } from "@/infra/repositories/implementations/quizResultsImplementation";
import { QuizzesImplementation } from "@/infra/repositories/implementations/quizzesImplementation";
import { UsersImplementation } from "@/infra/repositories/implementations/usersImplementation";
import { PrismaService } from "@/infra/services/prisma";
import { CreateQuizResultUseCase } from "@/infra/useCases/quizResults/createQuizResultUseCase";
import { DeleteQuizResultUseCase } from "@/infra/useCases/quizResults/deleteQuizResultUseCase";
import { getQuizResultByUserAndQuizAttemptUseCase } from "@/infra/useCases/quizResults/getQuizResultByUserAndQuizAttemptUseCase";
import { Module } from "@nestjs/common";

@Module({
  providers: [
    PrismaService,
    UsersImplementation,
    QuizAttemptsImplementation,
    QuizzesImplementation,
    QuizResultsImplementation,
    getQuizResultByUserAndQuizAttemptUseCase,
    CreateQuizResultUseCase,
    DeleteQuizResultUseCase,
  ],
  controllers: [
    GetQuizResultByUserAndQuizAttemptController,
    CreateQuizResultController,
    DeleteQuizResultController,
  ],
})
export class QuizResultsModule {}

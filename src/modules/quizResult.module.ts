import { CreateQuizResultController } from "@/infra/controllers/quizResults/CreateQuizResultController";
import { GetQuizResultByUserAndQuizAttemptController } from "@/infra/controllers/quizResults/GetQuizResultByUserAndQuizAttemptController";
import { QuizAttemptsImplementation } from "@/infra/repositories/implementations/quizAttemptImplementation";
import { QuizResultsImplementation } from "@/infra/repositories/implementations/quizResultsImplementation";
import { QuizzesImplementation } from "@/infra/repositories/implementations/quizzesImplementation";
import { UsersImplementation } from "@/infra/repositories/implementations/usersImplementation";
import { PrismaService } from "@/infra/services/prisma";
import { CreateQuizResultUseCase } from "@/infra/useCases/quizResults/createQuizResultUseCase";
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
  ],
  controllers: [
    GetQuizResultByUserAndQuizAttemptController,
    CreateQuizResultController,
  ],
})
export class QuizResultsModule {}

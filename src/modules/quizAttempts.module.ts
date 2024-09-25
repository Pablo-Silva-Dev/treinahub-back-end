import { CreateQuizAttemptController } from "@/infra/controllers/quizzesAttempts/CreateQuizAttemptController";
import { GetQuizAttemptByIdController } from "@/infra/controllers/quizzesAttempts/GetQuizAttemptByIdController";
import { ListQuizAttemptsByUserController } from "@/infra/controllers/quizzesAttempts/ListQuizAttemptsByUserController";
import { QuizAttemptsImplementation } from "@/infra/repositories/implementations/quizAttemptImplementation";
import { QuizzesImplementation } from "@/infra/repositories/implementations/quizzesImplementation";
import { UsersImplementation } from "@/infra/repositories/implementations/usersImplementation";
import { PrismaService } from "@/infra/services/prisma";
import { CreateQuizAttemptUseCase } from "@/infra/useCases/quizAttempts/createQuizAttemptUseCase";
import { GetQuizAttemptByIdUseCase } from "@/infra/useCases/quizAttempts/getQuizAttemptByIdUseCase";
import { ListQuizAttemptsByUserUseCase } from "@/infra/useCases/quizAttempts/listQuizAttemptsByUserUseCase";
import { Module } from "@nestjs/common";

@Module({
  providers: [
    PrismaService,
    QuizAttemptsImplementation,
    QuizzesImplementation,
    UsersImplementation,
    CreateQuizAttemptUseCase,
    ListQuizAttemptsByUserUseCase,
    GetQuizAttemptByIdUseCase,
  ],
  controllers: [
    CreateQuizAttemptController,
    ListQuizAttemptsByUserController,
    GetQuizAttemptByIdController,
  ],
})
export class QuizzesAttemptsModule {}

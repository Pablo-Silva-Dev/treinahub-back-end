import { CreateQuizResponseController } from "@/infra/controllers/quizzesResponses/CreateQuizResponseController";
import { DeleteManyQuizResponsesByQuizAttemptController } from "@/infra/controllers/quizzesResponses/DeleteManyQuizResponsesByQuizAttemptController";

import { GetQuizResponseByIdController } from "@/infra/controllers/quizzesResponses/GetQuizResponseByIdController";
import { ListQuizResponsesByAttemptController } from "@/infra/controllers/quizzesResponses/ListQuizResponsesByQuizAttemptController";
import { QuestionsOptionsImplementation } from "@/infra/repositories/implementations/questionsOptionsImplementation";
import { QuizAttemptsImplementation } from "@/infra/repositories/implementations/quizAttemptImplementation";
import { QuizQuestionsImplementation } from "@/infra/repositories/implementations/quizQuestionsImplementation";
import { QuizResponsesImplementation } from "@/infra/repositories/implementations/quizResponsesImplementation";
import { PrismaService } from "@/infra/services/prisma";
import { CreateQuizResponseUseCase } from "@/infra/useCases/quizResponses/createQuizResponseUseCase";
import { DeleteManyQuizResponsesByQuizAttemptUseCase } from "@/infra/useCases/quizResponses/deleteManyQuizResponsesByQuizAttemptUseCase";
import { GetQuizResponseByIdUseCase } from "@/infra/useCases/quizResponses/getQuizResponseByIdUseCase";
import { ListQuizResponsesByAttemptIdUseCase } from "@/infra/useCases/quizResponses/listQuizResponsesByQuizAttemptUseCase";
import { Module } from "@nestjs/common";

@Module({
  providers: [
    PrismaService,
    QuizResponsesImplementation,
    QuizAttemptsImplementation,
    QuestionsOptionsImplementation,
    QuizQuestionsImplementation,
    CreateQuizResponseUseCase,
    GetQuizResponseByIdUseCase,
    ListQuizResponsesByAttemptIdUseCase,
    DeleteManyQuizResponsesByQuizAttemptUseCase,
  ],
  controllers: [
    CreateQuizResponseController,
    GetQuizResponseByIdController,
    ListQuizResponsesByAttemptController,
    DeleteManyQuizResponsesByQuizAttemptController,
  ],
})
export class QuizzesResponsesModule {}

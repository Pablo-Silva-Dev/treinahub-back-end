import { CreateQuizQuestionController } from "@/infra/controllers/quizzesQuestions/CreateQuizQuestionController";
import { DeleteQuizQuestionController } from "@/infra/controllers/quizzesQuestions/DeleteQuizQuestionController";
import { ListQuizQuestionsController } from "@/infra/controllers/quizzesQuestions/ListQuizzesQuestionController";
import { UpdateQuizQuestionController } from "@/infra/controllers/quizzesQuestions/UpdateQuizQuestionController";
import { QuizQuestionsImplementation } from "@/infra/repositories/implementations/quizQuestionsImplementation";
import { QuizzesImplementation } from "@/infra/repositories/implementations/quizzesImplementation";
import { PrismaService } from "@/infra/services/prisma";
import { CreateQuizQuestionUseCase } from "@/infra/useCases/quizQuestions/createQuizQuestionUseCase";
import { DeleteQuizQuestionUseCase } from "@/infra/useCases/quizQuestions/deleteQuizQuestionUseCase";
import { ListQuizzesQuestionsUseCase } from "@/infra/useCases/quizQuestions/listQuizzesQuestionsUseCase";
import { UpdateQuizQuestionUseCase } from "@/infra/useCases/quizQuestions/updateQuizQuestionUseCase";
import { Module } from "@nestjs/common";

@Module({
  providers: [
    PrismaService,
    QuizQuestionsImplementation,
    QuizzesImplementation,
    CreateQuizQuestionUseCase,
    ListQuizzesQuestionsUseCase,
    DeleteQuizQuestionUseCase,
    UpdateQuizQuestionUseCase,
  ],
  controllers: [
    CreateQuizQuestionController,
    ListQuizQuestionsController,
    DeleteQuizQuestionController,
    UpdateQuizQuestionController,
  ],
})
export class QuizzesQuestionsModule {}
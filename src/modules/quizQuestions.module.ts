import { CreateQuizQuestionController } from "@/infra/controllers/quizzesQuestions/CreateQuizQuestionController";
import { DeleteQuizQuestionController } from "@/infra/controllers/quizzesQuestions/DeleteQuizQuestionController";
import { ExplainQuestionController } from "@/infra/controllers/quizzesQuestions/ExplainQuizQuestionController";
import { GetQuizQuestionByIdController } from "@/infra/controllers/quizzesQuestions/GetQuizQuestionByIdController";
import { ListQuizQuestionsController } from "@/infra/controllers/quizzesQuestions/ListQuizzesQuestionController";
import { UpdateQuizQuestionController } from "@/infra/controllers/quizzesQuestions/UpdateQuizQuestionController";
import { QuizQuestionsImplementation } from "@/infra/repositories/implementations/quizQuestionsImplementation";
import { QuizzesImplementation } from "@/infra/repositories/implementations/quizzesImplementation";
import { OpenAiService } from "@/infra/services/openAiService";
import { PrismaService } from "@/infra/services/prisma";
import { CreateQuizQuestionUseCase } from "@/infra/useCases/quizQuestions/createQuizQuestionUseCase";
import { DeleteQuizQuestionUseCase } from "@/infra/useCases/quizQuestions/deleteQuizQuestionUseCase";
import { ExplainQuestionUseCase } from "@/infra/useCases/quizQuestions/explainQuestionUseCase";
import { GetQuizQuestionByIdUseCase } from "@/infra/useCases/quizQuestions/getQuizQuestionByIdUseCase";
import { ListQuizzesQuestionsUseCase } from "@/infra/useCases/quizQuestions/listQuizzesQuestionsUseCase";
import { UpdateQuizQuestionUseCase } from "@/infra/useCases/quizQuestions/updateQuizQuestionUseCase";
import { Module } from "@nestjs/common";

@Module({
  providers: [
    PrismaService,
    QuizQuestionsImplementation,
    QuizzesImplementation,
    OpenAiService,
    CreateQuizQuestionUseCase,
    ListQuizzesQuestionsUseCase,
    DeleteQuizQuestionUseCase,
    UpdateQuizQuestionUseCase,
    GetQuizQuestionByIdUseCase,
    ExplainQuestionUseCase
  ],
  controllers: [
    CreateQuizQuestionController,
    ListQuizQuestionsController,
    DeleteQuizQuestionController,
    UpdateQuizQuestionController,
    GetQuizQuestionByIdController,
    ExplainQuestionController
  ],
})
export class QuizzesQuestionsModule {}

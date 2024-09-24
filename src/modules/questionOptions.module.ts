import { CreateQuestionOptionController } from "@/infra/controllers/questionsOptions/CreateQuestionOptionController";
import { DeleteQuestionOptionController } from "@/infra/controllers/questionsOptions/DeleteQuestionOptionController";
import { ListQuestionOptionsController } from "@/infra/controllers/questionsOptions/ListQuestionOptionsController";
import { QuestionsOptionsImplementation } from "@/infra/repositories/implementations/questionsOptionsImplementation";
import { QuizQuestionsImplementation } from "@/infra/repositories/implementations/quizQuestionsImplementation";
import { PrismaService } from "@/infra/services/prisma";
import { CreateQuestionOptionUseCase } from "@/infra/useCases/questionOptions/createQuestionOptionUseCase";
import { DeleteQuestionOptionUseCase } from "@/infra/useCases/questionOptions/deleteQuestionOptionUseCase";
import { ListQuestionOptionsUseCase } from "@/infra/useCases/questionOptions/listQuestionOptionsUseCase";
import { Module } from "@nestjs/common";

@Module({
  providers: [
    PrismaService,
    QuestionsOptionsImplementation,
    QuizQuestionsImplementation,
    CreateQuestionOptionUseCase,
    ListQuestionOptionsUseCase,
    DeleteQuestionOptionUseCase,
  ],
  controllers: [
    CreateQuestionOptionController,
    ListQuestionOptionsController,
    DeleteQuestionOptionController,
  ],
})
export class QuestionOptionsModule {}

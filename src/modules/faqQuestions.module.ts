import { CreateFaqQuestionController } from "@/infra/controllers/faqQuestions/createFaqQuestionController";
import { DeleteFaqQuestionController } from "@/infra/controllers/faqQuestions/deleteUserController";
import { GetFaqQuestionByIdController } from "@/infra/controllers/faqQuestions/getUserByIdController";
import { ListFaqQuestionsController } from "@/infra/controllers/faqQuestions/listFaqQuestionsController";
import { UpdateFaqQuestionController } from "@/infra/controllers/faqQuestions/updateFaqQuestionController";
import { FaqQuestionsImplementation } from "@/infra/repositories/implementations/faqQuestionsImplementation";
import { PrismaService } from "@/infra/services/prisma";
import { CreateFaqQuestionUseCase } from "@/infra/useCases/faqQuestions/createFaqQuestionUseCase";
import { DeleteFaqQuestionUseCase } from "@/infra/useCases/faqQuestions/deleteFaqQuestionUseCase";
import { GetFaqQuestionByIdUseCase } from "@/infra/useCases/faqQuestions/getFaqQuestionByIdUseCase";
import { ListFaqQuestionsUseCase } from "@/infra/useCases/faqQuestions/listFaqQuestionsUseCase";
import { UpdateFaqQuestionUseCase } from "@/infra/useCases/faqQuestions/updateFaqQuestionUseCase";
import { Module } from "@nestjs/common";

@Module({
  providers: [
    PrismaService,
    FaqQuestionsImplementation,
    CreateFaqQuestionUseCase,
    ListFaqQuestionsUseCase,
    GetFaqQuestionByIdUseCase,
    UpdateFaqQuestionUseCase,
    DeleteFaqQuestionUseCase,
  ],
  controllers: [
    CreateFaqQuestionController,
    ListFaqQuestionsController,
    GetFaqQuestionByIdController,
    UpdateFaqQuestionController,
    DeleteFaqQuestionController,
  ],
})
export class FaqQuestionsModule {}

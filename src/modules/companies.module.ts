import { CreateCompanyController } from "@/infra/controllers/companies/createCompanyController";
import { DeleteCompanyController } from "@/infra/controllers/companies/deleteCompnayController";
import { GetCompanyByIdController } from "@/infra/controllers/companies/getCompanyByIdController";
import { ListCompaniesController } from "@/infra/controllers/companies/listCompaniesController";
import { UpdateCompanyController } from "@/infra/controllers/companies/updateCompanyController";
import { UpdateCompanyLogoController } from "@/infra/controllers/companies/updateCompanyLogoController";
import { UpdateCompanyPlanController } from "@/infra/controllers/companies/updateCompanyPlanController";
import { RateLimitMiddleware } from "@/infra/middlewares/rateLimit.middleware";
import { CompaniesImplementation } from "@/infra/repositories/implementations/companiesImplementation";
import { FaqQuestionsImplementation } from "@/infra/repositories/implementations/faqQuestionsImplementation";
import { TrainingsImplementation } from "@/infra/repositories/implementations/trainingsImplementation";
import { AzureBlobStorageService } from "@/infra/services/azureBlobStorageService";
import { ManageFileService } from "@/infra/services/manageFileService";
import { PandaVideoService } from "@/infra/services/pandaVideoService";
import { PrismaService } from "@/infra/services/prisma";
import { SendGridEmailSenderService } from "@/infra/services/sendGrid";
import { CreateCompanyUseCase } from "@/infra/useCases/companies/createCompanyUseCase";
import { DeleteCompanyUseCase } from "@/infra/useCases/companies/deleteCompanyUseCase";
import { GetCompanyByIdUseCase } from "@/infra/useCases/companies/getCompanyByIdUseCase";
import { ListCompaniesUseCase } from "@/infra/useCases/companies/listCompaniesUseCase";
import { UpdateCompanyLogoUseCase } from "@/infra/useCases/companies/updateCompanyLogoUseCase";
import { UpdateCompanyPlanUseCase } from "@/infra/useCases/companies/updateCompanyPlanUseCase";
import { UpdateCompanyUseCase } from "@/infra/useCases/companies/updateCompanyUseCase";
import { UpdateCompanyUsedStorageUseCase } from "@/infra/useCases/companies/updateCompanyUsedStorageUseCase";
import { PlantFaqQuestionsUseCase } from "@/infra/useCases/faqQuestions/plantFaqQuestionsSeedsUseCase";
import { ListTrainingsByCompanyUseCase } from "@/infra/useCases/trainings/listTrainingsByCompanyUseCase";
import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";

const limitedRoutes = ["/companies/create", "companies/list"];

@Module({
  controllers: [
    CreateCompanyController,
    ListCompaniesController,
    GetCompanyByIdController,
    UpdateCompanyController,
    UpdateCompanyLogoController,
    UpdateCompanyPlanController,
    DeleteCompanyController,
  ],
  providers: [
    PrismaService,
    CompaniesImplementation,
    FaqQuestionsImplementation,
    TrainingsImplementation,
    ManageFileService,
    PandaVideoService,
    AzureBlobStorageService,
    CreateCompanyUseCase,
    ListCompaniesUseCase,
    GetCompanyByIdUseCase,
    UpdateCompanyUseCase,
    UpdateCompanyLogoUseCase,
    UpdateCompanyPlanUseCase,
    DeleteCompanyUseCase,
    PlantFaqQuestionsUseCase,
    ListTrainingsByCompanyUseCase,
    UpdateCompanyUsedStorageUseCase,
    SendGridEmailSenderService,
  ],
})
export class CompaniesModules implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RateLimitMiddleware)
      .forRoutes(...limitedRoutes.map((route) => route));
  }
}

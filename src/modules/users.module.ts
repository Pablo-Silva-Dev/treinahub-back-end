import { AuthenticateUserController } from "@/infra/controllers/users/authenticateUserController";
import { CreateUserController } from "@/infra/controllers/users/createUserController";
import { DeleteUserController } from "@/infra/controllers/users/deleteUserController";
import { GetRecoveryPasswordCodeByEmailController } from "@/infra/controllers/users/getReocveryPasswordCodeByEmailController";
import { GetRecoveryPasswordCodeBySMSController } from "@/infra/controllers/users/getReocveryPasswordCodeBySMSController";
import { GetUserByCpfController } from "@/infra/controllers/users/getUserByCpfController";
import { GetUserByEmailController } from "@/infra/controllers/users/getUserByEmailController";
import { GetUserByIdController } from "@/infra/controllers/users/getUserByIdController";
import { GetUserByPhoneController } from "@/infra/controllers/users/getUserByPhoneController";
import { ListUsersController } from "@/infra/controllers/users/listUsersController";
import { UnAuthenticateUserController } from "@/infra/controllers/users/unAuthenticateUserController";
import { UpdateUserController } from "@/infra/controllers/users/updateUserController";
import { AuthControlGateway } from "@/infra/gateways/authcontrol.gateway";
import { AvatarsImplementation } from "@/infra/repositories/implementations/avatarsImplementation";
import { CompaniesImplementation } from "@/infra/repositories/implementations/companiesImplementation";
import { TrainingMetricsImplementation } from "@/infra/repositories/implementations/trainingMetricsImplementation";
import { UsersImplementation } from "@/infra/repositories/implementations/usersImplementation";
import { AzureBlobStorageService } from "@/infra/services/azureBlobStorageService";
import { ManageFileService } from "@/infra/services/manageFileService";
import { PrismaService } from "@/infra/services/prisma";
import { SendGridEmailSenderService } from "@/infra/services/sendGrid";
import { TwilioService } from "@/infra/services/twilio";
import { UpdateCompanyAdditionalUsersUseCase } from "@/infra/useCases/companies/updateCompanyAdditionalUsersUseCase";
import { ListTrainingMetricsByUserUseCase } from "@/infra/useCases/trainingMetrics/listTrainingMetricsByUserUseCase";
import { AuthenticateUserUseCase } from "@/infra/useCases/users/authenticateUserUseCase";
import { CreateUserUseCase } from "@/infra/useCases/users/createUserUseCase";
import { DeleteUserUseCase } from "@/infra/useCases/users/deleteUserUseCase";
import { GetRecoveryPasswordCodeByEmailUseCase } from "@/infra/useCases/users/getRecoveryPasswordCodeByEmailUseCase";
import { GetRecoveryPasswordCodeBySMSUseCase } from "@/infra/useCases/users/getRecoveryPasswordCodeBySMSUseCase";
import { GetUserByCpfUseCase } from "@/infra/useCases/users/getUserByCpfUseCase";
import { GetUserByIdUseCase } from "@/infra/useCases/users/getUserByIdUseCase";
import { GetUserByEmailUseCase } from "@/infra/useCases/users/getUserByIEmailUseCase";
import { GetUserByPhoneUseCase } from "@/infra/useCases/users/getUserByPhoneUseCase";
import { ListUsersUseCase } from "@/infra/useCases/users/listUsersUseCase";
import { UnAuthenticateUserUseCase } from "@/infra/useCases/users/unAuthenticateUserUseCase";
import { UpdateUserUseCase } from "@/infra/useCases/users/updateUserUseCase";
import { Module } from "@nestjs/common";

@Module({
  controllers: [
    CreateUserController,
    ListUsersController,
    GetUserByCpfController,
    GetUserByEmailController,
    GetUserByIdController,
    DeleteUserController,
    UpdateUserController,
    GetRecoveryPasswordCodeByEmailController,
    GetRecoveryPasswordCodeBySMSController,
    AuthenticateUserController,
    GetUserByPhoneController,
    UnAuthenticateUserController,
  ],
  providers: [
    PrismaService,
    SendGridEmailSenderService,
    TwilioService,
    ManageFileService,
    AzureBlobStorageService,
    TrainingMetricsImplementation,
    CompaniesImplementation,
    ListTrainingMetricsByUserUseCase,
    UsersImplementation,
    AvatarsImplementation,
    CreateUserUseCase,
    ListUsersUseCase,
    GetUserByCpfUseCase,
    GetUserByEmailUseCase,
    GetUserByIdUseCase,
    DeleteUserUseCase,
    UpdateUserUseCase,
    GetRecoveryPasswordCodeByEmailUseCase,
    GetRecoveryPasswordCodeBySMSUseCase,
    AuthenticateUserUseCase,
    GetUserByPhoneUseCase,
    UpdateCompanyAdditionalUsersUseCase,
    UnAuthenticateUserUseCase,
    AuthControlGateway,
  ],
})
export class UsersModule {}

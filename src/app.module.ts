import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { envSchema } from "./env";
import { CreateTrainingController } from "./infra/controllers/trainings/createTrainingController";
import { ListTrainingsController } from "./infra/controllers/trainings/listTrainingController";
import { CreateUserController } from "./infra/controllers/users/createUserController";
import { DeleteUserController } from "./infra/controllers/users/deleteUserController";
import { GetUserByCpfController } from "./infra/controllers/users/getUserByCpfController";
import { GetUserByEmailController } from "./infra/controllers/users/getUserByEmailController";
import { GetUserByIdController } from "./infra/controllers/users/getUserByIdController";
import { ListUsersController } from "./infra/controllers/users/listUsersController";
import { UpdateUserController } from "./infra/controllers/users/updateUserController";
import { TrainingsImplementation } from "./infra/repositories/implementations/trainingsImplementation";
import { UsersImplementation } from "./infra/repositories/implementations/usersImplementation";
import { PrismaService } from "./infra/services/prisma";
import { CreateTrainingUseCase } from "./infra/useCases/trainings/createTrainingUseCase";
import { ListTrainingsUseCase } from "./infra/useCases/trainings/listTrainingsUseCase";
import { CreateUserUseCase } from "./infra/useCases/users/createUserUseCase";
import { DeleteUserUseCase } from "./infra/useCases/users/deleteUserUseCase";
import { GetUserByCpfUseCase } from "./infra/useCases/users/getUserByCpfUseCase";
import { GetUserByEmailUseCase } from "./infra/useCases/users/getUserByIEmailUseCase";
import { GetUserByIdUseCase } from "./infra/useCases/users/getUserByIdUseCase";
import { ListUsersUseCase } from "./infra/useCases/users/listUsersUseCase";
import { UpdateUserUseCase } from "./infra/useCases/users/updateUserUseCase";

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
  ],
  controllers: [
    CreateUserController,
    ListUsersController,
    GetUserByCpfController,
    GetUserByEmailController,
    GetUserByIdController,
    DeleteUserController,
    UpdateUserController,
    CreateTrainingController,
    ListTrainingsController,
  ],
  providers: [
    PrismaService,
    UsersImplementation,
    CreateUserUseCase,
    ListUsersUseCase,
    GetUserByCpfUseCase,
    GetUserByEmailUseCase,
    GetUserByIdUseCase,
    DeleteUserUseCase,
    UpdateUserUseCase,
    TrainingsImplementation,
    CreateTrainingUseCase,
    ListTrainingsUseCase,
  ],
})
export class AppModule {}

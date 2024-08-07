import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { envSchema } from "./env";
import { CreateUserController } from "./infra/controllers/users/createUserController";
import { GetUserByCpfController } from "./infra/controllers/users/getUserByCpfController";
import { GetUserByEmailController } from "./infra/controllers/users/getUserByEmailController";
import { GetUserByIdController } from "./infra/controllers/users/getUserByIdController";
import { ListUsersController } from "./infra/controllers/users/listUsersController";
import { UsersImplementation } from "./infra/repositories/implementations/usersImplementation";
import { PrismaService } from "./infra/services/prisma";
import { CreateUserUseCase } from "./infra/useCases/users/createUserUseCase";
import { GetUserByCpfUseCase } from "./infra/useCases/users/getUserByCpfUseCase";
import { GetUserByEmailUseCase } from "./infra/useCases/users/getUserByIEmailUseCase";
import { GetUserByIdUseCase } from "./infra/useCases/users/getUserByIdUseCase";
import { ListUsersUseCase } from "./infra/useCases/users/listUsersUseCase";

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
  ],
  providers: [
    PrismaService,
    UsersImplementation,
    CreateUserUseCase,
    ListUsersUseCase,
    GetUserByCpfUseCase,
    GetUserByEmailUseCase,
    GetUserByIdUseCase,
  ],
})
export class AppModule {}

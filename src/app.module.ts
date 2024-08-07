import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { envSchema } from "./env";
import { CreateUserController } from "./infra/controllers/createUserController";
import { ListUsersController } from "./infra/controllers/listUsersController";
import { UsersImplementation } from "./infra/repositories/implementations/usersImplementation";
import { PrismaService } from "./infra/services/prisma";
import { CreateUserUseCase } from "./infra/useCases/users/createUserUseCase";
import { ListUsersUseCase } from "./infra/useCases/users/listUsersUseCase";

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
  ],
  controllers: [CreateUserController, ListUsersController],
  providers: [
    PrismaService,
    UsersImplementation,
    CreateUserUseCase,
    ListUsersUseCase,
  ],
})
export class AppModule {}

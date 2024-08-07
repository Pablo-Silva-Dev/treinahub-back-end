import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { envSchema } from "./env";
import { TrainingsModule } from "./modules/trainings.module";
import { UsersModule } from "./modules/users.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    TrainingsModule,
    UsersModule,
  ],
})
export class AppModule {}

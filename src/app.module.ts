import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { envSchema } from "./env";
import { AvatarsModule } from "./modules/avatars.module";
import { CertificatesModule } from "./modules/certificates.module";
import { TrainingsModule } from "./modules/trainings.module";
import { UsersModule } from "./modules/users.module";
import { VideoClassesModule } from "./modules/videoClasses.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    TrainingsModule,
    UsersModule,
    AvatarsModule,
    VideoClassesModule,
    CertificatesModule,
  ],
})
export class AppModule {}

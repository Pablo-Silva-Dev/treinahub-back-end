import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { envSchema } from "./env";
import { AvatarsModule } from "./modules/avatars.module";
import { CertificatesModule } from "./modules/certificates.module";
import { ContactsSupportModule } from "./modules/contactsSupport.module";
import { FaqQuestionsModule } from "./modules/faqQuestions.module";
import { TrainingMetricsModule } from "./modules/trainingMetrics.module";
import { TrainingsModule } from "./modules/trainings.module";
import { UsersModule } from "./modules/users.module";
import { VideoClassesModule } from "./modules/videoClasses.module";
import { WatchedClassesModule } from "./modules/watchedClasses.module";

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
    FaqQuestionsModule,
    WatchedClassesModule,
    ContactsSupportModule,
    TrainingMetricsModule,
  ],
})
export class AppModule {}

import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { envSchema } from "./env";
import { AuthModule } from "./modules/auth.module";
import { AvatarsModule } from "./modules/avatars.module";
import { CertificatesModule } from "./modules/certificates.module";
import { ContactsSupportModule } from "./modules/contactsSupport.module";
import { FaqQuestionsModule } from "./modules/faqQuestions.module";
import { LogsModule } from "./modules/logs.module";
import { QuizzesQuestionsModule } from "./modules/quizQuestions.module";
import { QuizzesModule } from "./modules/quizzes.module";
import { RecoveriesCodeModule } from "./modules/recoveriesCode.module";
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
    AuthModule,
    TrainingsModule,
    UsersModule,
    AvatarsModule,
    VideoClassesModule,
    CertificatesModule,
    FaqQuestionsModule,
    WatchedClassesModule,
    ContactsSupportModule,
    TrainingMetricsModule,
    LogsModule,
    RecoveriesCodeModule,
    QuizzesModule,
    QuizzesQuestionsModule,
  ],
})
export class AppModule {}

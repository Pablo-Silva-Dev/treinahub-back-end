import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { envSchema } from "./env";
import { AuthControlGateway } from "./infra/gateways/authcontrol.gateway";
import { AuthModule } from "./modules/auth.module";
import { AvatarsModule } from "./modules/avatars.module";
import { CertificatesModule } from "./modules/certificates.module";
import { CompaniesModules } from "./modules/companies.module";
import { ContactsSupportModule } from "./modules/contactsSupport.module";
import { FaqQuestionsModule } from "./modules/faqQuestions.module";
import { LogsModule } from "./modules/logs.module";
import { QuestionOptionsModule } from "./modules/questionOptions.module";
import { QuizzesAttemptsModule } from "./modules/quizAttempts.module";
import { QuizzesQuestionsModule } from "./modules/quizQuestions.module";
import { QuizzesResponsesModule } from "./modules/quizResponses.module";
import { QuizResultsModule } from "./modules/quizResult.module";
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
      envFilePath: process.env.NODE_END === 'production' ? '.env.production' : '.env.development',
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
    QuestionOptionsModule,
    QuizzesAttemptsModule,
    QuizzesResponsesModule,
    QuizResultsModule,
    CompaniesModules,
  ],
  providers: [AuthControlGateway],
})
export class AppModule {}

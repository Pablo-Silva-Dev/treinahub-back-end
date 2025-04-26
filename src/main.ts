import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { TEnvSchema } from "./env";
import { ResponseErrorInterceptor } from "./infra/interceptors/responseError.interceptor";
import { ResponseSuccessInterceptor } from "./infra/interceptors/responseSuccess.interceptor";
import { NestExpressApplication } from "@nestjs/platform-express";

async function bootstrap() {
  
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = new ConfigService<TEnvSchema, true>();

  const LANDING_PAGE_URL = configService.get("LANDING_PAGE_URL");
  const ADMIN_DASHBOARD_URL = configService.get("ADMIN_DASHBOARD_URL");
  const USER_DASHBOARD_URL = configService.get("USER_DASHBOARD_URL");

  const allowedOrigins = [
    LANDING_PAGE_URL,
    ADMIN_DASHBOARD_URL,
    USER_DASHBOARD_URL,
  ];

  app.enableCors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
  });

  app.set('trust proxy', 1);

  const port = configService.get("PORT", { infer: true });
  app.useGlobalInterceptors(new ResponseSuccessInterceptor());
  app.useGlobalFilters(new ResponseErrorInterceptor());
  await app.listen(port);
}
bootstrap();

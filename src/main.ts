import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { TEnvSchema } from "./env";
import { ResponseErrorInterceptor } from "./infra/interceptors/responseError.interceptor";
import { ResponseSuccessInterceptor } from "./infra/interceptors/responseSuccess.interceptor";

async function bootstrap() {
  const configService = new ConfigService<TEnvSchema, true>();


  const allowedOrigins = configService.get("ALLOWED_ORIGINS").split(",")

  const app = await NestFactory.create(AppModule);
  const port = configService.get("PORT", { infer: true });
  app.useGlobalInterceptors(new ResponseSuccessInterceptor());
  app.useGlobalFilters(new ResponseErrorInterceptor());
  app.enableCors({
    origin: allowedOrigins,
    methods: "*",
  });
  await app.listen(port);
}
bootstrap();

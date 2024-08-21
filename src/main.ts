import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { TEnvSchema } from "./env";
import { ResponseSuccessInterceptor } from "./infra/interceptors/responseSuccess.interceptor";
import { ResponseErrorInterceptor } from "./infra/interceptors/responseError.interceptor";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService<TEnvSchema, true>>(ConfigService);
  const port = configService.get("PORT", { infer: true });
  app.useGlobalInterceptors(new ResponseSuccessInterceptor());
  app.useGlobalFilters(new ResponseErrorInterceptor())
  app.enableCors({
    origin: '*',
    methods: '*'
  })
  await app.listen(port);
}
bootstrap();

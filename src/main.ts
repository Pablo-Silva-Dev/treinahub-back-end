import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import * as fs from "fs";
import * as path from "path";
import { AppModule } from "./app.module";
import { TEnvSchema } from "./env";
import { ResponseErrorInterceptor } from "./infra/interceptors/responseError.interceptor";
import { ResponseSuccessInterceptor } from "./infra/interceptors/responseSuccess.interceptor";

async function bootstrap() {
  const configService = new ConfigService<TEnvSchema, true>();

  const certificatePath = configService.get("CERTIFICATE_PATH");
  const certificateKeyPath = configService.get("CERTIFICATE_KEY_PATH");

  const httpsOptions = {
    key: fs.readFileSync(path.resolve(certificateKeyPath)),
    cert: fs.readFileSync(path.resolve(certificatePath)),
  };
  const app = await NestFactory.create(AppModule, {
    httpsOptions,
  });
  const port = configService.get("PORT", { infer: true });
  app.useGlobalInterceptors(new ResponseSuccessInterceptor());
  app.useGlobalFilters(new ResponseErrorInterceptor());
  app.enableCors({
    origin: "*",
    methods: "*",
  });
  await app.listen(port);
}
bootstrap();

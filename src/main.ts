import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { TEnvSchema } from "./env";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService<TEnvSchema, true>>(ConfigService);
  const port = configService.get("PORT", { infer: true });
  await app.listen(port);
}
bootstrap();

import { JWTAdminStrategy } from "@/infra/auth/jwtAdminStrategy";
import { JWTUserStrategy } from "@/infra/auth/jwtUserStrategy";
import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TEnvSchema } from "env";

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      global: true,
      useFactory(config: ConfigService<TEnvSchema, true>) {
        const privateKey = config.get("JWT_PRIVATE_KEY", { infer: true });
        const publicKey = config.get("JWT_PUBLIC_KEY", { infer: true });
        return {
          signOptions: { algorithm: "RS256" },
          privateKey: Buffer.from(privateKey, "base64"),
          publicKey: Buffer.from(publicKey, "base64"),
        };
      },
    }),
  ],
  providers: [JWTUserStrategy, JWTAdminStrategy, ConfigService],
})
export class AuthModule {}

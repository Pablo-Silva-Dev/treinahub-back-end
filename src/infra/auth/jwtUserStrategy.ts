import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { TEnvSchema } from "env";
import { ExtractJwt, Strategy } from "passport-jwt";
import { z } from "zod";

const UserPayloadSchema = z.object({
  sub: z.string(),
  isAdmin: z.boolean(),
});

export type UserPayloadSchema = z.infer<typeof UserPayloadSchema>;

@Injectable()
export class JWTUserStrategy extends PassportStrategy(Strategy, "jwt-user") {
  constructor(public configService: ConfigService<TEnvSchema, true>) {
    const publicKey = configService.get("JWT_PUBLIC_KEY", { infer: true });
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: Buffer.from(publicKey, "base64"),
      algorithms: ["RS256"],
    });
  }
  async validate(payload: UserPayloadSchema) {
    return UserPayloadSchema.parse(payload);
  }
}

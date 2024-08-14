import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { TEnvSchema } from "env";
import { ExtractJwt, Strategy } from "passport-jwt";
import { z } from "zod";

const AdminPayloadSchema = z.object({
  sub: z.string(),
  isAdmin: z.boolean(),
});

export type AdminPayloadSchema = z.infer<typeof AdminPayloadSchema>;

@Injectable()
export class JWTAdminStrategy extends PassportStrategy(Strategy, "jwt-admin") {
  constructor(public configService: ConfigService<TEnvSchema, true>) {
    const publicKey = configService.get("JWT_PUBLIC_KEY", { infer: true });
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: Buffer.from(publicKey, "base64"),
      algorithms: ["RS256"],
    });
  }

  async validate(payload: AdminPayloadSchema) {
    if (!payload.isAdmin) {
      console.log("Received payload for validation:", payload);
      throw new UnauthorizedException(
        "Only admins have access to this resource"
      );
    }
    return AdminPayloadSchema.parse(payload);
  }
}

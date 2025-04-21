import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response } from "express";
import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 1000 * 60, //1 minute
  max: 10,
});

@Injectable()
export class RateLimitMiddleware implements NestMiddleware {
  user = limiter;

  use(req: Request, res: Response, next: (error?: Error | any) => void): void {
    this.user(req, res, next);
  }
}

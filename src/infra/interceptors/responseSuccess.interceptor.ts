import { CallHandler, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class ResponseSuccessInterceptor<T> implements NestInterceptor<T, any> {
  intercept(_, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => ({
        RES: data,
        SUCCESS: true
      }))
    );
  }
}

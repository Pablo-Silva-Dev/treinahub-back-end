import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
  import { Response } from 'express';
  
  @Catch()
  export class ResponseErrorInterceptor implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      const request = ctx.getRequest<Request>();
      const status =
        exception instanceof HttpException
          ? exception.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR;
  
      const errorResponse = {
        RES: null,
        MSG: (exception instanceof HttpException && exception.getResponse()) || 'Internal server error',
        SUCCESS: false,
        TIMESTAMP: new Date().toISOString(),
        PATH: request.url,
      };
  
      response.status(status).json(errorResponse);
    }
  }
  
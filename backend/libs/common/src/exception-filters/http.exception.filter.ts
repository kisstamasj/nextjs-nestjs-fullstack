import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ExceptionLoggerService } from '../exception-logger/exception-logger.service';

interface ExceptionResponse {
  message: string | [];
  statusCode: number;
  error: string;
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly exceptionLoggerService: ExceptionLoggerService,
  ) {}
  async catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const exceptionResponse = exception.getResponse() as ExceptionResponse;

    const requestMethod = request.method;
    const requestPath = request.path;
    const requestHeaders = request.headers;
    const requestCookies = request.cookies;
    const requestBody = request.body;
    const callStack = exception.stack;
    const statusCode = exception.getStatus();
    const message = exceptionResponse.message;

    await this.exceptionLoggerService.create({
      requestMethod,
      requestPath,
      requestHeaders,
      requestCookies,
      requestBody,
      callStack,
      statusCode,
      message,
    });

    response.status(statusCode).json({
      statusCode,
      message,
    });
  }
}

import { IncomingHttpHeaders } from 'http';

export class CreateExceptionLogDto {
  requestMethod: string;

  requestPath: string;

  requestHeaders: IncomingHttpHeaders;

  requestCookies: string;

  requestBody: string;

  callStack: string;

  statusCode: number;

  message: string | [];
}

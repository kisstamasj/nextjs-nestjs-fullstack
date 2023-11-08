import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExceptionLog } from './exception-log.entity';
import { Repository } from 'typeorm';
import { CreateExceptionLogDto } from './dtos/create-exception-log.dto';

@Injectable()
export class ExceptionLoggerService {
  constructor(
    @InjectRepository(ExceptionLog) private repo: Repository<ExceptionLog>,
  ) {}

  async create(exceptionLogData: CreateExceptionLogDto) {
    const message = JSON.stringify(exceptionLogData.message);
    const requestCookies = JSON.stringify(exceptionLogData.requestCookies);
    const requestBody = JSON.stringify(exceptionLogData.requestBody);
    const requestHeaders = JSON.stringify(exceptionLogData.requestHeaders);
    const data = this.repo.create({
      ...exceptionLogData,
      message,
      requestCookies,
      requestBody,
      requestHeaders,
    });
    return this.repo.save(data);
  }
}

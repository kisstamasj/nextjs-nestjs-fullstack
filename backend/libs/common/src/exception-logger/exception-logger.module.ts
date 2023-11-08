import { Module } from '@nestjs/common';
import { ExceptionLoggerService } from './exception-logger.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExceptionLog } from './exception-log.entity';

@Module({
  providers: [ExceptionLoggerService],
  imports: [TypeOrmModule.forFeature([ExceptionLog])],
  exports: [ExceptionLoggerService],
})
export class ExceptionLoggerModule {}

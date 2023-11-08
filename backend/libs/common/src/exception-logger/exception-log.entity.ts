import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class ExceptionLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  requestMethod: string;

  @Column()
  requestPath: string;

  @Column({ default: null })
  requestHeaders: string;

  @Column({ default: null })
  requestCookies: string;

  @Column()
  requestBody: string;

  @Column()
  callStack: string;

  @Column()
  statusCode: number;

  @Column()
  message: string;

  @CreateDateColumn()
  createdAt: Date;
}

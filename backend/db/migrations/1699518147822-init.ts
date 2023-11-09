import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1699518147822 implements MigrationInterface {
  name = 'Init1699518147822';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "name" character varying NOT NULL, "password" character varying NOT NULL, "refreshToken" character varying, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "exception_log" ("id" SERIAL NOT NULL, "requestMethod" character varying NOT NULL, "requestPath" character varying NOT NULL, "requestHeaders" character varying, "requestCookies" character varying, "requestBody" character varying NOT NULL, "callStack" character varying NOT NULL, "statusCode" integer NOT NULL, "message" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_fb385fee0fe005d53c4cca95de8" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "exception_log"`);
    await queryRunner.query(`DROP TABLE "user"`);
  }
}

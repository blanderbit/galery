import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { INestApplication } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  it('App toBeDefined', async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, TypeOrmModule.forRoot()],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    expect(moduleFixture).toBeDefined();
  });

  afterAll(async () => {
    app.close();
  });
});

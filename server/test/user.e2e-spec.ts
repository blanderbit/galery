import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { UsersModule } from '../src/users/users.module';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../src/users/user.entity';
import { UsersService } from '../src/users/user.service';

describe('User Module (e2e)', () => {
  let app: INestApplication;
  const publicAddress = '0x30a53c66c37ef671aca9b6b604fac69f6144ef0c';
  const user = {
    publicAddress,
    nonce: 9370,
    username: null,
    id: '5cd2d1c601ad18054d2c0daf',
  };
  // const usersService = {
  //   findAll: () => [publicAddress],
  //   create: () => [user],
  // };
  const mockRepository = {};

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [UsersModule, TypeOrmModule.forRoot()],
    })
      // .overrideProvider(UsersService)
      // .useValue(usersService)
      .compile();

    app = module.createNestApplication();
    await app.init();
  });

  it('User Module toBeDefined', async () => {
    expect(app).toBeDefined();
  });

  it(`/GET users`, () => {
    return request(app.getHttpServer())
      .get('/users')
      .expect(200);
  });

  it(`/GET users`, () => {
    return request(app.getHttpServer())
      .get('/users')
      .query({ publicAddress })
      .expect(res => res.body.publicAddress === publicAddress);
  });

  it(`/POST user`, () => {
    return request(app.getHttpServer())
      .post('/users').send({ publicAddress })
      .expect(res => res.body.publicAddress === publicAddress);
  });

  it(`/POST user2`, () => {
    return request(app.getHttpServer())
      .post('/users').send({ publicAddress })
      .expect(res => res.body.publicAddress === publicAddress);
  });

  afterAll(async () => {
    app.close();
  });
});

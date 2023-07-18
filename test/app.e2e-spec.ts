import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as pactum from 'pactum'
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    pactum.request.setBaseUrl(
      'http://localhost:3000',
    );
    await app.init();
  });

  describe('User', ()=>{
    describe('get list user', () => {
      it('should list user', ()=>{
        return pactum
          .spec()
          .get('/controller/users')
          .expectStatus(200)
      });

      it('should get user', ()=>{
        return pactum
          .spec()
          .get('/controller/user/1')
          .expectStatus(200)
      })
      it('shout be edit user', ()=>{
        return pactum
          .spec()
          .put('/controller/edit/2')
          .withBody({
            username: 'Thai',
            email : 'thai@gmail.com'
          }).expectStatus(200)
      })

      it('should be delete user', ()=>{
        return pactum
          .spec()
          .delete('/controller/delete/2')
          .expectStatus(200)
      })

    })
  })
  afterAll(async () => {
    await app.close();
  });

});

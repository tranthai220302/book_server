import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './Entity/user';
import { Postt } from './Entity/post';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';
import { Book } from './Entity/book';
import { BookModule } from './book/book.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'test1',
      entities: [User, Postt, Book],
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    PostModule,
    BookModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
  
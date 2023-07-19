import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './Entity/user';
import { Postt } from './Entity/post';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';
import { Book } from './Entity/book';
import { BookModule } from './book/book.module';
import { Topic } from './Entity/Topic';
import { TopicModule } from './topic/topic.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'test1',
      entities: [User, Postt, Book, Topic],
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    PostModule,
    BookModule,
    TopicModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
  
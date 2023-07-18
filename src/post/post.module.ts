import { Module } from '@nestjs/common';
import { PostController } from './controller/post/post.controller';
import { PostService } from './service/post/post.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Postt } from 'src/Entity/post';
import { User } from 'src/Entity/user';

@Module({
  imports: [TypeOrmModule.forFeature([Postt, User])],
  controllers: [PostController],
  providers: [PostService]
})
export class PostModule {}

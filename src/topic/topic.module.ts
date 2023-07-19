import { Module } from '@nestjs/common';
import { TopicController } from './controller/topic/topic.controller';
import { TopicService } from './service/topic/topic.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/Entity/user';
import { Book } from 'src/Entity/book';
import { Topic } from 'src/Entity/Topic';

@Module({
  imports: [TypeOrmModule.forFeature([User, Book, Topic])],
  controllers: [TopicController],
  providers: [TopicService]
})
export class TopicModule {}

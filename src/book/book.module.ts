import { Module } from '@nestjs/common';
import { BookController } from './controller/book/book.controller';
import { BookService } from './service/book/book.service';
import { TypeORMError } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/Entity/user';
import { Postt } from 'src/Entity/post';
import { Book } from 'src/Entity/book';

@Module({
  imports : [TypeOrmModule.forFeature([User, Postt, Book])],
  controllers: [BookController],
  providers: [BookService]
})
export class BookModule {}

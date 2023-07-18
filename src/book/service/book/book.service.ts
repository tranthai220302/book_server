import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { REFUSED } from 'dns';
import { Book } from 'src/Entity/book';
import { User } from 'src/Entity/user';
import { bookDTO } from 'src/book/dtos/bookDTO';
import { LessThan, Like, Repository } from 'typeorm';

@Injectable()
export class BookService {
    constructor(
        @InjectRepository(Book)
        private bookRepository: Repository<Book>,
        @InjectRepository(User)
        private userRepository: Repository<User>
    ){}

    async createBook(book : bookDTO, id: number){
        try {
            const newBook = this.bookRepository.create(book);
            const user = await this.userRepository.findOne({where : {id}})
            newBook.user = user;
            const saveBook = await this.bookRepository.save(newBook);
            return saveBook;
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST)
        }
    }
    async editBook(book : bookDTO, id : number){
        try {
            const bookUpdate = await this.bookRepository.update(
                {id},{...book}
            ) 
            return bookUpdate;
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST)
        }
    }
    async deleteBook(id: number){
        try {
            await this.bookRepository.delete(id)
            const listBook = await this.bookRepository.find()
            return listBook;
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST)
        }
    }
    async getBook(id : number){
        try {
            const book = await this.bookRepository.findOne({
                where : {id}
            })
            return book;
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST)
        }
    }
    async getBooks(){
        try {
            const listBook = await this.bookRepository.find();
            return listBook;
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST)
        }
    }
    async searchBook(name: string, description: string, price : number){
        try {
            const query = {
                ...(name && {name : Like(`%${name}%`)}),
                ...(description && {description : Like(`%${description}%`)}),
                ...(price && {price : LessThan(price)})
                
            }
            const listBook = await this.bookRepository.find({
                where : query
            })
            return listBook;
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST)
        }
    }
    async getBookByUserId(idUser : number){
        try {
            const listBook = await this.bookRepository.find({
                where : {user : {id: idUser}}
            })
            return listBook;
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST)
        }
    }
}

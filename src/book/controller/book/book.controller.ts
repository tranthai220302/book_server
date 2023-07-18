import { 
    Controller, Post, HttpException, HttpStatus,
    Body, Req, UseGuards, Put, Param, ParseIntPipe, Delete, Get, Query
} from '@nestjs/common';
import { error } from 'console';
import { AuthGuard } from 'src/auth/guards/auth/auth.guard';
import { bookDTO } from 'src/book/dtos/bookDTO';
import { BookService } from 'src/book/service/book/book.service';

@Controller('book')
@UseGuards(AuthGuard)
export class BookController {
    constructor(
        private bookService : BookService
    ){}
    @Post('create')
    async createBook(@Body() book : bookDTO, @Req() request){
        try {
            if(request.user){
                const bookNew = await this.bookService.createBook(book, request.user.sub);
                return bookNew;
            }
            throw new HttpException("Login is valid", HttpStatus.BAD_REQUEST)
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST)
        }
    }
    @Put('edit/:id')
    async editBook(@Body() book : bookDTO, @Param('id', ParseIntPipe) id : number, @Req() request){
        try {
            if(request.user){
                const bookUpdate = await this.bookService.editBook(book, id);
                return bookUpdate;
            }
            throw new HttpException("Login is valid", HttpStatus.BAD_REQUEST)
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST)
        }
    }

    @Delete('delete/:id')
    async deletBook(@Param('id', ParseIntPipe) id : number, @Req() request){
        try {
            if(request.user){
                const listBook = await this.bookService.deleteBook(id);
                return listBook;  
            }   
            throw new HttpException("Login is valid", HttpStatus.BAD_REQUEST)       
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST)
        }
    }
    @Get('search')
    async search(
        @Query('name') name: string,
        @Query('description') description: string,
        @Query('price') price: number
    ){
        try {
            const listBook = await this.bookService.searchBook(name, description, price);
            return listBook;
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST)
        }
    }
    @Get('users')
    async getBookByUser(@Req() request){
        try {
            console.log(request.user.id)
            const listBook = await this.bookService.getBookByUserId(request.user.id);
            return listBook;
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST)
        }
    }
    @Get(':id')
    async getBook(@Param('id', ParseIntPipe) id : number, @Req() request){
        try {
            if(request.user){
                const book = await this.bookService.getBook(id)
                return book;
            }
            throw new HttpException("Login is valid", HttpStatus.BAD_REQUEST)
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST)
        }
    }
    @Get()
    async getBooks(@Req() request){
        try {
            return await this.bookService.getBooks();
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST)
        }
    }

}

import { 
    Controller, Post, Get, Put, Delete, Param,
    ParseIntPipe,
    HttpException,
    HttpStatus,
    UseGuards,
    Req,
    Body,
    Query
} from '@nestjs/common';
import { Request } from 'express';
import { add } from 'pactum/src/exports/reporter';
import { listenerCount } from 'process';
import { first } from 'rxjs';
import { AuthGuard } from 'src/auth/guards/auth/auth.guard';
import { postDTO } from 'src/post/dtos/postDTO';
import { queryDTO } from 'src/post/dtos/queryDTO';
import { PostService } from 'src/post/service/post/post.service';
import { Like, Repository } from 'typeorm';
@UseGuards(AuthGuard)
@Controller('post')
export class PostController {
    constructor(
        private postService : PostService
    ){}

    @Post('create')
    async createPostUser(@Body() post: postDTO, @Req() request){
        try {
            if(request.user){
                const user = await this.postService.createPostUser(request.user.id, post)
                delete user.password
                return user;
            }else{
                throw new HttpException('Login is valide', HttpStatus.BAD_REQUEST)
            }
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST)
        }
    }
    @Delete('delete/:id')
    async deletePost(@Param('id', ParseIntPipe) id: number){
        try {
            const listUser = await this.postService.deletePost(id);
            return listUser;
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST)
        }
    }
    @Put('edit/:id')
    async editPost(@Param('id', ParseIntPipe) id: number, @Body() post : postDTO){
        try {
            const editPost = await this.postService.editPost(id, post);
            return editPost;
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST)
        }
    }
    @Get('search')
    async Timkiem(
        @Query('firstName') firstName: string,
        @Query('lastName') lastName: string,
        @Query('address') address: string,    
    ){
        try {
            const query : any = {
                ...(firstName && {firstName : Like(`%${firstName}%`)}),
                ...(lastName && {lastName : Like(`%${lastName}%`)}),
                ...(address && {address : Like(`%${address}}%`)})
            }
            const listPost = await this.postService.search(query)
            return listPost;
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST)
        }
    }
    @Get('')
    async getPosts(){
        try {
            const listPost = await this.postService.getPosts();
            return listPost;
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST)
        }
    }
    @Get(':id')
    async getPost(@Param('id', ParseIntPipe) id: number){
        try {
            const post = await this.postService.getPost(id)
            return post
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST)
        }
    }
}

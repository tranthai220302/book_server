import { 
    Controller, Post, Body, UseGuards, 
    HttpException, HttpStatus, Req, Param, 
    ParseIntPipe, Get, Delete } from '@nestjs/common';
import { TopicService } from 'src/topic/service/topic/topic.service';
import { TopicDTO } from 'src/topic/dtos/topicDTO';
import { AuthGuard } from 'src/auth/guards/auth/auth.guard';
@Controller('topic')
@UseGuards(AuthGuard)
export class TopicController {
    constructor(
        private topicService : TopicService
    ){}
    @Post('create')
    async createTopic(@Body() topic: TopicDTO, @Req() request){
        try {
            if(request.user){
                return await this.topicService.createTopic(topic)
            }
            throw new HttpException('Login is valid', HttpStatus.BAD_REQUEST)
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST)
        }
    }
    @Delete(':id')
    async deleteTopic(@Param('id', ParseIntPipe) id : number, @Req() request){
        try {
            if(request.user){
                return await this.topicService.deleteTopic(id)
            }
            throw new HttpException('Login is valid', HttpStatus.BAD_REQUEST)
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST)
        }
    }
    @Get('book/:id')
    async getBookByTopic(@Param('id', ParseIntPipe) id : number, @Req() request){
        try {
            if(request.user){
                return await this.topicService.getBookByTopic(id)
            }
            throw new HttpException('Login is valid', HttpStatus.BAD_REQUEST)
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST)
        }
    }
    @Get('')
    async getTopics(){
        try {
            return await this.topicService.getTopics()
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST)
        }
    }

}

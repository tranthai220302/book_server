import { Body, HttpException, HttpStatus, Injectable, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Topic } from 'src/Entity/Topic';
import { Book } from 'src/Entity/book';
import { TopicDTO } from 'src/topic/dtos/topicDTO';
import { Repository } from 'typeorm';

@Injectable()
export class TopicService {
    constructor(
        @InjectRepository(Topic)
        private topicRepository : Repository<Topic>,
        @InjectRepository(Book)
        private bookRepository : Repository<Book>
    ){}

    async createTopic(topic : TopicDTO){
        try {
            const newTopic = this.topicRepository.create(topic)
            const saveTopic = await this.topicRepository.save(newTopic)
            return saveTopic;
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST)
        }
    }
    async deleteTopic(id : number){
        try {
            await this.topicRepository.delete({id})
            return await this.topicRepository.find()
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST)
        }
    }
    async getBookByTopic(id: number){
        try {
            try {
                const listBook  = await this.bookRepository.find({
                    where :{topic : {id : id}}
                })
                return listBook;
            } catch (error) {
                throw new HttpException(error, HttpStatus.BAD_REQUEST)
            }
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST)
        }
    }
    async getTopics(){
        try {
            const listTopic = await this.topicRepository.find()
            return listTopic;
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST)
        }
    }
}

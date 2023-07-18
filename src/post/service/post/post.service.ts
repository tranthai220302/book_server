import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Postt } from 'src/Entity/post';
import { User } from 'src/Entity/user';
import { postDTO } from 'src/post/dtos/postDTO';
import { queryDTO } from 'src/post/dtos/queryDTO';
import { Like, Repository } from 'typeorm';

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(Postt)
        private postRepository: Repository<Postt>,
        @InjectRepository(User)
        private userRepository: Repository<User>
    ){}

    async createPostUser(id: number, post: postDTO){
        try {
            const user = await this.userRepository.findOne({
                where: {
                    id: id
                }
            })
            if(!user){
                throw new HttpException('User not found', HttpStatus.BAD_REQUEST)
            }
            const newPost = this.postRepository.create(post)
            const savePost = await this.postRepository.save(newPost)
            user.profile = savePost;
            return this.userRepository.save(user)
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST)
        }
    }

    async deletePost(id: number){
        try {
            await this.postRepository.delete({id})
            const listPost = await this.postRepository.find()
            return listPost;
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST)
        }
    }
    async getPost(id:number){
        try {
            const post = await this.postRepository.findOne({
                where:{id}
            })
            return post;
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST)
        }
    }
    async getPosts(){
        try {
            const listPost = await this.postRepository.find()
            return listPost;
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST)   
        }
    }
    async editPost(id: number, post: postDTO){
        try {
            const postUpdate = await this.postRepository.update(
                {id},
                {
                    ...post
                }
            )
            return postUpdate;
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST)
        }
    }
    async search(query : any){
        try {
            const listPost = await this.postRepository.find({
                where: query
            })
            return listPost
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST)
        }
    }
}

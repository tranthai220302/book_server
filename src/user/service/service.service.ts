import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { User } from '../../Entity/user';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Postt } from '../../Entity/post';
import { UserDTO } from '../../dtos/userDTO';

@Injectable()
export class ServiceService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        @InjectRepository(Postt)
        private posttsRepository: Repository<User>,
    ){

    }

    async getUsers(){
        try {
            const listUser = await this.usersRepository.find();
            return listUser;
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST)
        }
    }
    async createUser(user: UserDTO){
        try {
            const newUser = this.usersRepository.create(user)
            return await this.usersRepository.save(newUser) 
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST)
        }
    }
    async editUser(user : UserDTO, id: number){
        try {
            await this.usersRepository.update({
                id
            }, {
                ...user
            })
            const userUpdate = await this.usersRepository.findBy({id})
            return userUpdate;
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST)
        }
    }
    async getUser(id: number){
        try {
            console.log('cc')
            const user = await this.usersRepository.findBy({id})
            return user;
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST)
        }
    }
    async deleteUser(id: number){
        try {
            await this.usersRepository.delete({id})
            const listUser = await this.usersRepository.find()
            return listUser;
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST)
        }
    }
}

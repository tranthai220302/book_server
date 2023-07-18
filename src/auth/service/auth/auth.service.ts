import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { authRgisterDTO } from 'src/auth/dtos/authDTO';
import * as argon2 from "argon2";
import { User } from 'src/Entity/user';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { authLoginDTO } from 'src/auth/dtos/authLoginDTO';
@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        @InjectRepository(User)
        private authRepository: Repository<User>,
    ){}
    async login(user: authLoginDTO){
        try {
            const userLogin = await this.authRepository.findOne({
                where: {
                    username: user.username
                }
            });
            if(!userLogin){
                throw new HttpException('Email is not valid', HttpStatus.BAD_REQUEST)
            }
            const checkPass = await argon2.verify(userLogin.password, user.password);
            if(!checkPass){
                throw new HttpException('Password is not valid', HttpStatus.BAD_REQUEST)
            }
            return this.sigToken(userLogin.id, userLogin.email)
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST)
        }
    }
    async register(user: authRgisterDTO){
        try {
            const hassPassword = await argon2.hash(user.password)
            const newUser = this.authRepository.create({
                ...user,
                password: hassPassword
            })
            await this.authRepository.save(newUser)
            return this.sigToken(newUser.id, newUser.email);
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST)
        }
    }
    async sigToken(id: number, email: string){
        const payload = {
            id: id,
            email,
        }
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}

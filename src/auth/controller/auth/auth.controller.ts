import { Controller, HttpException, HttpStatus, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from 'src/auth/service/auth/auth.service';
import { authRgisterDTO } from 'src/auth/dtos/authDTO';
import { AuthGuard } from 'src/auth/guards/auth/auth.guard';
import { UserDTO } from 'src/dtos/userDTO';
import { authLoginDTO } from 'src/auth/dtos/authLoginDTO';
@Controller('auth')

export class AuthController {
    constructor(
        private authService: AuthService
    ){}
    @Post('register')
    async register(@Body() user: authRgisterDTO){
        try {
            return await this.authService.register(user)
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST)
        }
    }
    @Post('login')
    async login(@Body() user: authLoginDTO){
        try {
            console.log('cc')
            return await this.authService.login(user)
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST)
        }
    }

}

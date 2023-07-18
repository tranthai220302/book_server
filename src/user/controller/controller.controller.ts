import { Controller,
    Get, 
    HttpException, 
    HttpStatus, 
    Post,
    Body, 
    Param, 
    Put, 
    ParseIntPipe, 
    Delete, 
    UseGuards,
    Request
} 
from '@nestjs/common';
import { ServiceService } from '../service/service.service';
import { UserDTO } from '../../dtos/userDTO';

import { AuthGuard } from 'src/auth/guards/auth/auth.guard';
@Controller('controller')
export class ControllerController {
    constructor(
        private userService : ServiceService
    ){}
    @UseGuards(AuthGuard)
    @Get('users')
    async getUsers(@Request() request){
        try {
            if(request.user){
                const lisUser = await this.userService.getUsers()
                return lisUser; 
            }
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST)
        }
    }
    @UseGuards(AuthGuard)
    @Post('create/user')
    async createUser(@Body() user: UserDTO, @Request() request){
        try {
            if(request.user){
                const newUser = await this.userService.createUser(user);
                return newUser;
            }
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST)
        }
    }
    @UseGuards(AuthGuard)
    @Put('edit/:id')
    async editUser(@Body() user: UserDTO, @Param('id', ParseIntPipe) id: number, @Request() request){
        try {
            if(request.user){
                const editUser = await this.userService.editUser(user, id);
                return editUser;
            }
        } catch (error) {
            throw new HttpException(error ,HttpStatus.BAD_REQUEST)
        }
    }
    @UseGuards(AuthGuard)
    @Get('user/:id')
    async getUser(@Param('id', ParseIntPipe) id: number, @Request() request){
        try {
            if(request.user){
                const user = await this.userService.getUser(id);
                return user;
            }
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST)
        }
    }
    @UseGuards(AuthGuard)
    @Delete('delete/:id')
    async deleteUser(@Param('id', ParseIntPipe) id: number, @Request() request){
        try {
            if(request.user){
                const listUser = await this.userService.deleteUser(id);
                return listUser;
            }else{
                throw new HttpException('Login is vlid', HttpStatus.BAD_REQUEST)
            }
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST)
        }
    }

}

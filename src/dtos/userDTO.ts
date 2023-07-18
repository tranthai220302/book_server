import { IsEmpty, IsEmail, IsNotEmpty } from "class-validator"

export class UserDTO{
    @IsNotEmpty()
    username: string

    @IsNotEmpty()
    email: string
}
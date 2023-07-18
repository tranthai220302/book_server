import { IsNotEmpty } from "class-validator"

export class authRgisterDTO{
    @IsNotEmpty()
    username: string

    @IsNotEmpty()
    email: string

    @IsNotEmpty()
    password: string
}
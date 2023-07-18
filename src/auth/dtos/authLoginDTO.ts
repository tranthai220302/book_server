import { IsNotEmpty } from "class-validator";

export class authLoginDTO{
    @IsNotEmpty()
    username: string

    @IsNotEmpty()
    password: string
}
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Book } from "./book";
@Entity()
export class Topic{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    image: string

    @OneToMany(()=> Book, book => book.topic)
    books : Book[]
}
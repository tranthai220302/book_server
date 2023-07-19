import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user";
import { Topic } from "./Topic";
@Entity()
export class Book{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    description: string

    @Column()
    image: string

    @Column()
    price: number
    @ManyToOne(()=>User, user => user.books)
    user: User
    
    @ManyToOne(()=> Topic, topic => topic.books)
    topic: Topic
}
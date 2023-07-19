import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { User } from './user';
import { Topic } from './Topic';

@Entity()
export class Postt {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    address: string

    @OneToOne(() => User)
    user: User


}
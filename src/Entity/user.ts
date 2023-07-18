import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { Postt } from './post';
import { Book } from './book';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string

  @Column()
  password: string

  @OneToOne(()=>Postt)
  @JoinColumn()
  profile: Postt

  @OneToMany(()=>Book, book => book.user)
  books: Book[]
}
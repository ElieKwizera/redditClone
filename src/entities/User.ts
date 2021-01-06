import { IsEmail, Length } from "class-validator";
import {Entity, Column, Index, BeforeInsert, OneToMany} from "typeorm";
import bcrypt from 'bcrypt';
import { Exclude} from 'class-transformer'
import CustomEntity from './CustomEntity'; 
import Post from "./Post";

@Entity("users")
export class User extends CustomEntity 
{
    constructor(user: Partial<User>)
    {
        super();
        Object.assign(this,user);
    }

    @Index()
    @IsEmail()
    @Column({ unique: true })
    email: string;

    @Index()
    @Column({ unique:true })
    @Length(3,255)
    username: string;

    @Exclude()
    @Column()
    @Length(6,255)
    password: string;
    

    @OneToMany(() => Post, (post) => post.user)
    posts: Post[]
    
    @BeforeInsert()
    async hashPassword()
    {
        this.password = await bcrypt.hash(this.password, 10);
    }

   

}

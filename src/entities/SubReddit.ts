import { IsEmail, Length } from "class-validator";
import {Entity, Column, Index, BeforeInsert, ManyToOne, JoinColumn, OneToMany} from "typeorm";
import { makeId, slugify } from "../utils/helpers";

import CustomEntity from './CustomEntity'; 
import Post from "./Post";
import { User } from "./User";

@Entity("subReddits")
export default class SubReddit extends CustomEntity 
{
    constructor(subReddit: Partial<SubReddit>)
    {
        super();
        Object.assign(this,subReddit);
    }

    @Index()
    @Column({ unique: true })
    name: string

    @Column()
    title: string

    @Column({ type: 'text', nullable: true })
    description: string

    @Column({ nullable: true })
    imageUrn: string

    @Column({ nullable: true })
    bannerUrn: string

    @ManyToOne(() => User)
    @JoinColumn({ name: 'username', referencedColumnName: 'username' })
    user: User

    @OneToMany(() => Post, (post) => post.subReddit)
    posts: Post[]


}

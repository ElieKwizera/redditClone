import {Entity, Column, Index, BeforeInsert, ManyToOne, JoinColumn} from "typeorm";
import { makeId, slugify } from "../utils/helpers";

import CustomEntity from './CustomEntity'; 
import Post from "./Post";
import SubReddit from "./SubReddit";
import { User } from "./User";


@Entity("comments")
export default class Comment extends CustomEntity 
{
    constructor(comment: Partial<Comment>)
    {
        super();
        Object.assign(this,comment);
    }

    @Index()
    @Column()
    identifier: string

    @Column()
    username: string

    @Column()
    body: string
    
    @ManyToOne(() => User)
    @JoinColumn({ name: 'username', referencedColumnName: 'username' })
    user: User

    @ManyToOne(() => Post, post => post.comments, { nullable: false})
    post: Post

    



}
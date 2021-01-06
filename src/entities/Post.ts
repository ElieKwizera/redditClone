import { IsEmail, Length } from "class-validator";
import {Entity, Column, Index, BeforeInsert, ManyToOne, JoinColumn, OneToMany} from "typeorm";
import { makeId, slugify } from "../utils/helpers";
import Comment from "./Comment";

import CustomEntity from './CustomEntity'; 
import SubReddit from "./SubReddit";
import { User } from "./User";

@Entity("posts")
export default class Post extends CustomEntity 
{
    constructor(post: Partial<Post>)
    {
        super();
        Object.assign(this,post);
    }
    @Index()
    @Column()
    identifier: string

    @Column()
    title: string

    @Index()
    @Column()
    slug: string

    @Column()
    body: string
    
    @ManyToOne(() => User, (user) => user.posts)
    @JoinColumn({ name: 'username', referencedColumnName: 'username' })
    user: User

    @ManyToOne(() => SubReddit, (subReddit) => subReddit.posts)
    @JoinColumn({ name: 'subName', referencedColumnName: 'name' })
    subReddit: SubReddit

    @OneToMany(() => Comment, comment => comment.post)
    comments: Comment[]

    @BeforeInsert()
    async getSlugAndId()
    {
        this.slug = slugify(this.title);
        this.identifier = makeId(7);
    }

}

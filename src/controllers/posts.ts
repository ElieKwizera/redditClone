import { Request, Response } from "express";
import Comment from "../entities/Comment";
import Post from "../entities/Post";
import SubReddit from "../entities/SubReddit";

const getPosts = async (req: Request, res: Response) =>
{
   try {
       const posts = await Post.find( 
           {
               order: { createdAt: 'DESC'}
           }
       );

       return res.status(200).json(
           {
               sucess:true,
               data:posts
           }
       );
   } catch (error) 
    {
    return res.status(404).json(
        {
            sucess:false,
            message: error.message
        }
    );
   }
}

const getPost = async (req: Request, res: Response) => 
{
    const {identifier, slug}  = req.params;

    try 
    {
        const post = await Post.findOneOrFail({ identifier , slug}, { relations: ['subReddit', 'user']});

        return res.status(200).json(
            {
                sucess:true,
                data:post
            }
        );
    } 
    catch (error) 
    {
        return res.status(404).json(
            {
                sucess:false,
                message: "post not found"
            }
        );
    }
}



const createPost = async (req: Request, res: Response) => 
{
    const { body, title, subReddit} = req.body;
    const user = res.locals.user;

    if(title === '')
    {
        return res.status(400).json(
            {
                success: false,
                message: "Title must not be empty"
            }
        );
    }
    try 
    {
        const sub = await SubReddit.findOneOrFail({ name: subReddit});
        const post  = new Post({title, body, subReddit: sub, user});   
        await post.save();
        return res.status(201).json(
            {
                success: true,
                data : post
            }
        );

    } catch (error) {
        console.log(error);
        return res.status(500).json(
            {
                success: false,
                message: "Something went wrong"
            }
        );
    }
}

const createComment = async (req:Request, res:Response) => 
{
    const {identifier, slug}  = req.params;
    const {body} = req.body;
    const user = res.locals.user;

    try 
    {
        const post = await Post.findOneOrFail({ identifier , slug}, { relations: ['subReddit', 'user']});
        const comment = new Comment({ body,post ,user});
        await comment.save()
    } 
    catch (error) 
    {
        return res.status(404).json(
            {
                sucess:false,
                message: "Something went wrong!"
            }
        );
    }
}


export {getPosts,getPost,createPost, createComment};
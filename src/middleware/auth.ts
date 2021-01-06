import { NextFunction, Request, Response } from "express";
import {User} from '../entities/User'
import jwt from 'jsonwebtoken';

export default async (req: Request, res: Response, next: NextFunction)=>
{
    try 
    {
        const token = req.cookies.token;
        if(!token) throw new Error('not authenticated');

        const { username } : any = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ username});
        if(!user)  throw new Error('not authenticated');
        
        res.locals.user = user;
        return next();

    } 
    catch (error) 
    {
        return res.status(401).json({
            success: false,
            message: error.message
            
        });
    }    
}
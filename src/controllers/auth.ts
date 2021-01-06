import { validate } from "class-validator";
import { Request, Response } from "express";
import { User } from "../entities/User";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';

const register = async (req: Request, res: Response)=>
{
    const {email, username,password} = req.body;
    try 
    {
        const existingEmail = await User.findOne({ email });
        const existingUsername =  await User.findOne({ username });

        if(existingEmail || existingUsername)
        {
            return res.status(400).json({
            success: false,
            message: "user already exist"
            });
        }
        const user = new User({email, username,password});
        const errors = await validate(user); 
        if(errors.length > 0)
        {
            let mappedErrors = {};
            errors.forEach(element => 
            {
                const key = element.property;
                const value = Object.values(element.constraints)[0];
                mappedErrors[key] = value;
            });

           return res.status(400).json(mappedErrors);
        }
        
        await user.save(); 
        return res.status(201).json(
            {
                message: "User created successfully",
                data: user
            });

    } 
    catch (error) 
    {
        res.status(500).json(error);
    }
}

const login = async ( req: Request, res: Response)=>
{
    const {username,password} = req.body; 
    try {
         const user = await User.findOne({ username});

         if(!user)
         {
             return res.status(404).json(
                 {
                     success: false,
                     message: "User not found"
                 }
             );

         }
         const paswordsMatch = await bcrypt.compare(password, user.password);

         if(!paswordsMatch)
         {
            return res.status(401).json(
                {
                    success: false,
                    message: "Incorrect password"
                }
            );
         }

         const token = await jwt.sign( {username} , process.env.JWT_SECRET);
         
         res.set('Set-Cookie', cookie.serialize('token', token, {
            httpOnly:true, 
            secure:process.env.NODE_ENV === 'production' ? true : false,
            sameSite: 'strict',
            maxAge: 3600,
            path: '/'
         }));

         return res.status(200).json(
             {
                 success: true,
                 user,
                 token
             }
         );

    } catch (error) {
        
    }
};

const me = (req: Request, res: Response) =>
{
    
    return res.json(res.locals.user);
}

const logout  = (req: Request, res: Response) =>
{
    res.set('Set-cookie', cookie.serialize('token', '', {
        httpOnly:true, 
        secure:process.env.NODE_ENV === 'production' ? true : false,
        sameSite: 'strict',
        expires: new Date(0),
        path: '/'
    }));

    return res.status(200).json(
        {
            success: true
        }
    );
} 
export {register, login, me, logout};
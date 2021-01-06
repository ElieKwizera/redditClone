import { Request, Response } from "express";
import {User} from '../entities/User'
import {isEmpty} from 'class-validator'
import {getRepository} from 'typeorm'
import SubReddit from '../entities/SubReddit';

const createSubReddit = async (req: Request, res: Response) => 
{
    const { name, title, description } = req.body;
    const user:User = res.locals.user;

    try 
    {
        let errors:any = {};
        
        if(isEmpty(name)) errors.name= "Name can not be empty ";
        if(isEmpty(title)) errors.name= "Title can not be empty ";

        const subReddit = await getRepository(SubReddit).createQueryBuilder('subReddit').where('lower(subReddit.name) = :name', {name: name.toLowerCase()}).getOne();
        if(subReddit) errors.existingSub = "Sureddit alreasy exists";

        if(Object.keys(errors).length > 0)
        {
            throw errors
        }
    }
    catch (error) 
    {
        return res.status(500).json(error);
    }

    try 
    {
        const newSub = new SubReddit({name, description, title, user});
        await newSub.save();

        return res.status(201).json({
            success:true,
            data: newSub
        });
    } 
    catch (error) 
    {
        console.log(error.message);
        return res.status(400).json({
            success:false,
            message: error.message
        });
    }

}


export { createSubReddit};

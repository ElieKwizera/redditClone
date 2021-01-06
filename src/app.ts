import "reflect-metadata";
import {createConnection} from "typeorm";
import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth';
import postRoutes from './routes/posts';
import subRedditRoutes from './routes/subReddits';
import trim from './middleware/trim';
import cors from 'cors';


dotenv.config();
const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(trim);
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200
}));

app.use('/api/auth', authRoutes);
app.use('/api/subs', subRedditRoutes);
app.use('/api/posts', postRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, async ()=>
{
    console.log(`Server running on port ${PORT}`);
    try 
    {   
        await createConnection();
        console.log("Connection to database created");  
    }
    catch (error) 
    {
        console.log(error);
    }
    
})

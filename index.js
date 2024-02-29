import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import { dbConnection } from "./database/dbConnection.js"; 
import {errorMiddleware} from "./error/errors.js"
import userRouter from './routes/userRoute.js'
import recipeRouter from './routes/recipeRoute.js'

const app = express();
dotenv.config({path : '.env'});

// we use cors to connect the frontend and backend
app.use(cors({
    origin: ["http://localhost:3000"],
    methods:["POST"],
    credentials:true,
    exposedHeaders: ["set-cookie"]
}));

    
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use('/api/v1/users', userRouter);
app.use('/api/v1/recipes', recipeRouter);

dbConnection();
app.use(errorMiddleware);

app.listen(process.env.PORT, () =>{
    console.log(`Server Running On Port ${process.env.PORT}`);
});
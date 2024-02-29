import mongoose from "mongoose";
import dotenv from 'dotenv';



export const dbConnection = () =>{
    dotenv.config({path : '.env'});

    mongoose.connect(process.env.MONGO_URI,{
        dbName: "culina_recipes",
    }).then(()=>{
        console.log("Connected to database successfully!");
    }).catch(err=>{
        console.log(`Some error is occurred while connecting to database! ${err}`);
    });

};

import mongoose from "mongoose";

export const dbConnection = () =>{

    mongoose.connect(process.env.MONGO_URI,{
        dbName: "culina_recipes",
    }).then(()=>{
        console.log("Connected to database successfully!");
    }).catch(err=>{
        console.log(`Some error is occurred while connecting to database! ${err}`);
    });

};

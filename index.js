import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import { dbConnection } from "./database/dbConnection.js"; 
import {errorMiddleware} from "./error/errors.js"
import userRouter from './routes/userRoute.js'
import recipeRouter from './routes/recipeRoute.js'

const app = express();
dotenv.config({path : '.env'});

const allowedOrigins = ['https://devyang2002.github.io', 'http://localhost:3000'];

app.use((req, res, next) => {
  const origin = req.headers.origin;

  // Check if the origin is in the allowedOrigins array or if it's undefined (for non-browser clients)
  if (allowedOrigins.includes(origin) || !origin) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials', 'true'); // Enable credentials

    if (req.method === 'OPTIONS') {
      // Pre-flight request. Respond successfully:
      res.status(200).end();
    } else {
      // Regular request. Continue to the next middleware:
      next();
    }
  } else {
    res.status(403).json({ message: 'Forbidden' });
  }
});
    
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use('/api/v1/users', userRouter);
app.use('/api/v1/recipes', recipeRouter);

dbConnection();
app.use(errorMiddleware);

const PORT = process.env.PORT;

// if(process.env.NODE.ENV == "production"){
//     app.use(express.static("./culinashare/build"));
// }

app.listen(PORT, () =>{
    console.log(`Server Running On Port ${PORT}`);
});

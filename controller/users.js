import { deleteModel } from "mongoose";
import ErrorHandler from "../error/errors.js";
import {users} from "../models/userSchema.js";


export const createUser = async (req, res, next) =>{
    const {name , email, password} = req.body;

    if(!name || !email || !password){
        return next(new ErrorHandler("Please fill all the particulars!",400));
    }
    try{
        const existingUser = await users.findOne({ email });
        if (existingUser) {
            return next(new ErrorHandler("Email is already registered", 400));
        }
        const newUser = new users({ name, email, password });
        await newUser.save();

        res.status(200).json({
            success: true,
            message: "Submitted successfully"
        });
    } catch(error){
        if(error.name === "ValidationError"){
            const validationErrors = Object.values(error.errors).map(
                (err) => err.message
            );
            return next(new ErrorHandler(validationErrors.join(" , "),400));
        }
        return next(error)
    }
};

export const loginUser = async (req, res, next) => {
    const {email, password} = req.body;

    if(!email || !password){
        return next(new ErrorHandler("Please fill all the particulars!",400));
    }
    try{
        const existingUser = await users.findOne({ email });
        if (existingUser) {
            if(password === existingUser.password) {
                const { password, ...userWithoutPassword } = existingUser.toObject();
                return res.status(200).json({
                    success: true,
                    message: "Signed in successfully",
                    data: userWithoutPassword,
                });
            }
            return next(new ErrorHandler("Wrong Password", 400));
        }
        else{
            return next(new ErrorHandler("Email doesn't exist. Please Sign up!", 404))
        }
    } catch(error){
        return next(error)
    }
}

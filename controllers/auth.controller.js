import mongoose from "mongoose";
import User from "../model/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {JWT_EXPIRES_IN, JWT_SECRET} from "../config/env.js";

export const signUp = async (req, res,next) => {
    //logic to sign up a user
    const session = await mongoose.startSession();
    session.startTransaction();
    try{
        //in this were try to create a user
        const {name, email, password} = req.body;

        const existingUser = await User.findOne({ email }).exec();
        if(existingUser){
            const error = new Error("User already exists");
            error.statusCode = 409;
            throw error;
        }

        //password encryption
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUsers = await User.create([{name, email, password: hashedPassword}], { session });
        const token = jwt.sign({userId:newUsers[0]}._id,JWT_SECRET,{expiresIn: JWT_EXPIRES_IN});

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({
            success: true,
            message: "User created successfully",
            data: {
                token,
                user: newUsers[0],
            }
        });

    }catch(error){
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
}
export const signIn = async (req, res,next) => {
    //logic to sign in a user
}
export const signOut = async (req, res,next) => {
    //logic to sign out a user
}
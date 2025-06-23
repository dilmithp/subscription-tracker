import mongoose from "mongoose";
import User from "../model/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js";

export const signUp = async (req, res, next) => {
    // Debug: log the incoming request body
    console.log('SIGNUP BODY:', req.body);

    // Validate payload exists and is not empty
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({
            success: false,
            error: "payload is required",
            status: 400
        });
    }

    const { name, email, password } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
        return res.status(400).json({
            success: false,
            error: "All fields (name, email, password) are required",
            status: 400
        });
    }

    const session = await mongoose.startSession();
    try {
        session.startTransaction();

        // Check if user already exists
        const existingUser = await User.findOne({ email }).exec();
        if (existingUser) {
            await session.abortTransaction();
            session.endSession();
            return res.status(409).json({
                success: false,
                error: "User already exists",
                status: 409
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const [newUsers] = await User.create(
            [{ name, email, password: hashedPassword }],
            { session }
        );

        // Generate JWT
        const token = jwt.sign(
            { userId: newUsers._id },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN }
        );

        await session.commitTransaction();
        session.endSession();

        return res.status(201).json({
            success: true,
            message: "User created successfully",
            data: {
                token,
                user: newUsers,
            }
        });

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.error("Error in signUp:", error);
        return next(error);
    }
};

export const signIn = async (req, res, next) => {
    // Placeholder for sign-in logic
    res.status(501).json({ success: false, error: "Not implemented", status: 501 });
};

export const signOut = async (req, res, next) => {
    // Placeholder for sign-out logic
    res.status(501).json({ success: false, error: "Not implemented", status: 501 });
};

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        minlength: [3, "Name must be at least 3 characters long"],
        maxlength: [100, "Name must not exceed 50 characters"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
        lowercase: true,
        match:[/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, "Please fill a valid email address"],
        maxLength:255,
        minLength:3,

    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters long"],
    },
},{ timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;
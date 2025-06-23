import User from '../model/user.model.js';

export const getAllUsers = async (req, res, next) => {
    try{
        const users = await User.find().select('-password');
        res.status(200).json({
            success: true,
            message: "Users fetched successfully",
            data: users
        });
    }catch (e) {
        console.error(e);
        next(e);
    }
}
export const getUser = async (req, res, next) => {
    try{
        const user = await User.findById(req.params.id).select('-password');
        if(!user) {
            const error = new Error("User not found");
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({
            success: true,
            message: "Users fetched successfully",
            data: user
        });
    }catch (e) {
        console.error(e);
        next(e);
    }
}
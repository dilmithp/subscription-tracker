import express from "express";
import coockieParser from "cookie-parser";

import {PORT} from "./config/env.js";
import userRouter from "./routes/user.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import authRouter from "./routes/auth.routes.js";
import connectDB from "./database/mongoDB.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import arcjetMiddleware from "./middlewares/arcjet.middleware.js";

const app = express();
// Middleware from express.js
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(coockieParser());
app.use(arcjetMiddleware);

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);
app.use('/api/v1/users', userRouter);
app.use(errorMiddleware);

app.get("/",(req,res)=>{
    res.send("welcome to subscription demo service")
});

app.listen(PORT,async () => {
    console.log(`Sub Tracker running on http://localhost:${PORT}`);

    await connectDB();
});

export default app;
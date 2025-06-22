import express from "express";

import {PORT} from "./config/env.js";
import userRouter from "./routes/user.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import authRouter from "./routes/auth.routes.js";
import connectDB from "./database/mongoDB.js";

const app = express();
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/subscription', subscriptionRouter);
app.use('/api/v1/user', userRouter);

app.get("/",(req,res)=>{
    res.send("welcome to subscription demo service")
});

app.listen(PORT,async () => {
    console.log(`Sub Tracker running on http://localhost:${PORT}`);

    await connectDB();
});

export default app;
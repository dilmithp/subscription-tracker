import express from "express";

import {PORT} from "./config/env.js";

const app = express();

app.get("/",(req,res)=>{
    res.send("welcome to subscription demo service")
});

app.listen(3000,() => {
    console.log(`Sub Tracker running on http://localhost:${PORT}`);
});

export default app;
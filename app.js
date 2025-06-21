import express from "express";

const app = express();

app.get("/",(req,res)=>{
    res.send("welcome to subscription demo service")
})
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

const app = express();
dotenv.config();

const mongooseOptions = {
    useNewUrlParser: true
}

mongoose.connect(
    String(process.env.STRCONN), mongooseOptions, () => console.log("Connect to DB")
);

app.get("/", (req,res) => {
    return res.json({ message: "Hello world" });
});

app.listen(3000); 
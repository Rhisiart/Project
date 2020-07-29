import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import {postRoute as registerUser, getRoute as authUser} from "./routes/auth";


const mongooseOptions = {
    useUnifiedTopology: true,
    useNewUrlParser: true
}

const app = express();
dotenv.config();

//connect to mongoDB
mongoose.connect(
    String(process.env.STRCONN), mongooseOptions,() => console.log("Connect to DB")
);

//Middlewares
app.use(express.json());

//Route Middlewares 
app.use("/api/user", registerUser);
app.use("/api/user",authUser);

app.listen(3000); 
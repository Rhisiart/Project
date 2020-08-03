import express from "express";
import mongoose from "mongoose";
import {registerUser, loginUser,refreshToken} from "./routes/auth";
import dotenv from "dotenv";
import {test} from "./routes/Test";
import cookie from "cookie-parser";


const mongooseOptions = {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true
}

const app = express();
dotenv.config();

app.disable("x-powered-by");

//connect to mongoDB
mongoose.connect(
    String(process.env.STR_CONN!), mongooseOptions,() => console.log("Connect to DB")
);

//Middlewares
app.use(express.json());
app.use(cookie());

//Route Middlewares 
app.use("/api/user", registerUser);
app.use("/api/user", loginUser);
app.use("/api/user", refreshToken);
app.use("/api",test);

app.listen(3000); 
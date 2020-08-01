import express from "express";
import mongoose from "mongoose";
import {registerUser, loginUser} from "./routes/auth";
import dotenv from "dotenv";
import {test} from "./routes/Test";


const mongooseOptions = {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true
}

const app = express();
dotenv.config();

//connect to mongoDB
mongoose.connect(
    String(process.env.STR_CONN!), mongooseOptions,() => console.log("Connect to DB")
);

//Middlewares
app.use(express.json());

//Route Middlewares 
app.use("/api/user", registerUser);
app.use("/api/user", loginUser);
app.use("/api",test);

app.listen(3000); 
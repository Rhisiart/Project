import express from "express";
import mongoose from "mongoose";
import {registerUser, loginUser,revokeToken, LogOut} from "./routes/auth";
import dotenv from "dotenv";
import {test} from "./routes/Test";
import cookie from "cookie-parser";
import cors from "cors";


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
app.use(cors({
    origin:"http://localhost:3000",
    credentials: true
}));
app.use(express.json());
app.use(cookie());


//Route Middlewares 
app.use("/api/user", registerUser);
app.use("/api/user", loginUser);
app.use("/api/user", revokeToken);
app.use("/api/user", LogOut);
app.use("/api",test);

app.listen(2000); 
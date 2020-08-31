import express from "express";
import {middlewareVerifyToken as verifyToken} from "../token/authTokens";

export const test = express.Router().get("/test",verifyToken,(req,res) => {
    res.send({id: "1", email: "ricardobenfiquista13@gmail.com"});
});

export * from "./Test"
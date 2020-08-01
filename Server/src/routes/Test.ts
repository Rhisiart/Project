import express from "express";
import {middlewareVerifyToken as verifyToken} from "../token/authTokens"

export const test = express.Router().get("/test",verifyToken,(req,res) => {
    res.send({id: req.body.userId, email: req.body.userEmail});
});

export * from "./Test"
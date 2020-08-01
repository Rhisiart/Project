import jwt from "jsonwebtoken";
import express from "express";
import {IUser} from "../model/User"

export const createAccessToken = (user: {id: any, email : String }) => 
{
    return jwt.sign({userId: user.id, userEmail: user.email}, process.env.AUTH_TOKEN_SECRET!,{
        expiresIn: "15min"
    });
};

export const createRefreshToken = (user: {id: any, email : String }) => 
{
    return jwt.sign({userId: user.id, userEmail: user.email}, process.env.REFRESH_TOKEN_SECRET!,{
        expiresIn: "7d"
    });
};

export const middlewareVerifyToken : express.RequestHandler  = (req,res,next) => {
    const authorization = req.headers["authorization"];
     
    if(!authorization) return res.status(401).send("Access Denid!");

    try
    {
        const token = authorization.split(" ")[1];
        const payload = jwt.verify(token , process.env.AUTH_TOKEN_SECRET!);
        req.body = payload;
    }catch(err)
    {
        res.status(400).send("Invalid Token");
    }

    return next();
}

export * from "./authTokens"
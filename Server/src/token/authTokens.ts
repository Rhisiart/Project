import jwt from "jsonwebtoken";
import express from "express";

export interface IUserToken {
    id: string, 
    email : String 
}

export const createAccessToken = (user: IUserToken) => 
{
    return jwt.sign(user, process.env.AUTH_TOKEN_SECRET!,{
        expiresIn: "30s"
    });
};

export const createRefreshToken = (user: IUserToken) => 
{
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET!,{
        expiresIn: "7d"
    });
};

export const sendRefreshToken = (res : express.Response, token: String) =>
{
    res.cookie("seasonId", token, {
        httpOnly: true, 
        //path: "/user/revoke"
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
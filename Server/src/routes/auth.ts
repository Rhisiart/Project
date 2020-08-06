import express from "express";
import User from "../model/User";
import bcrypt from "bcrypt";
import {createAccessToken,createRefreshToken,UserToken,sendNewRefreshToken} from "../token/authTokens";
import { verify } from "jsonwebtoken";

const route = express.Router();

export const registerUser = route.post("/register", async (req,res) => {

    const regexEmail = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    const regexPw = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/);

    if(!regexEmail.test(req.body.email) || !regexPw.test(req.body.password)) 
        return res.status(400).send({message: "Invalid Email or Password"});

    const pwHash = await bcrypt.hash(req.body.password, await bcrypt.genSalt(10));
    
    const user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        fullname: req.body.firstname + " " + req.body.lastname,
        email: req.body.email,
        password: pwHash
    });
    
    try
    {
        const a = await user.save();
        res.send("User register");
    }
    catch(err)
    {
        res.status(400).send(err);
    }
});


export const loginUser = route.post("/login", async (req,res) => {

    await User.findOne({email: req.body.email}, async (_err,response) => {
        if(!response) return res.status(404).send("Not found user");

        const userObj : UserToken = {id: response._id, email: response.email};
       
        await bcrypt.compare(req.body.password, response.password, (_err,match) => {
            if(!match) return res.status(400).send({message: "Invalid Email or Password"});

            sendNewRefreshToken(res,createRefreshToken(userObj));
            const token = createAccessToken(userObj)
            res.header("Authorization", token).send({token: token});
        });
    });
});

export const refreshToken = route.post("/refresh", async (req,res) => {
    const cookieToken = req.cookies.seasonId;
    if(!cookieToken) return res.send("Incorrect token");

    let payload : UserToken;
    try
    {
        payload = verify(cookieToken,process.env.REFRESH_TOKEN_SECRET!) as UserToken;
    }catch(err)
    {
        return res.send("Incorrect token");
    }

    const user = await User.findById(payload.id);
    if(!user) return res.send("Invalid user");

    sendNewRefreshToken(res,createRefreshToken(payload));
    return res.send({message : "access token refreshed", access_token : createAccessToken({id: user._id, email: user.email})});
});

export * from "./auth";

import express from "express";
import User from "../model/User";
import bcrypt from "bcrypt";
import {createAccessToken,createRefreshToken,IUserToken,sendRefreshToken, middlewareVerifyToken} from "../token/authTokens";
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

        const user : IUserToken = {id: response._id, email: response.email};
       
        await bcrypt.compare(req.body.password, response.password, (_err,match) => {
            if(!match) return res.status(400).send({message: "Invalid Email or Password"});

            sendRefreshToken(res,createRefreshToken(user));
            const token = createAccessToken(user)
            res.header("Authorization", token).send({token: token, user});
        });
    });
});

export const revokeToken = route.post("/revoke", async (req,res) => {
    const cookieToken = req.cookies.seasonId;
    if(!cookieToken) return res.status(400).send({message : "Incorrect token"});

    let payload : IUserToken;
    try
    {
        payload = verify(cookieToken,process.env.REFRESH_TOKEN_SECRET!) as IUserToken;
    }catch(err)
    {
        return res.send("Incorrect token");
    }

    const user = await User.findById(payload.id);
    if(!user) return res.send("Invalid user");


    const userInfo : IUserToken = {
        id: user._id,
        email: user.email
    }
    const newAccessToken = createRefreshToken(userInfo);
    sendRefreshToken(res,newAccessToken);
    return res.send({message : "access token refreshed", access_token : newAccessToken, user: userInfo});
});

export const LogOut = route.post("/logout",middlewareVerifyToken, (req,res) => {
    sendRefreshToken(res,"");
    return res.send({message: "logout"});
})

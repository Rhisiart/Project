import express, { Request } from "express";
import User, { IUser } from "../model/User";
import bcrypt from "bcrypt";

const route = express.Router();

export const registerUser = route.post("/register", async (req,res) => {

    const regexEmail = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    const regexPw = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/);

    if(!regexEmail.test(req.body.email) || !regexPw.test(req.body.password)) 
        return res.status(400).send({message: "Incorrect Email or Password"});

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
        const savedUser = await user.save();
        res.send(savedUser);
    }
    catch(err)
    {
        res.status(400).send(err);
    }
});


export const loginUser = route.post("/login", async (req,res) => {
    
    const userExist = await User.findOne({email: req.body.email});

    if(!userExist) 
        return  res.status(404).send("Not found user");

    //Vulnerable time attacks
    const pwMatch = await bcrypt.compare(req.body.password, userExist.password);

    if(pwMatch) 
        console.log("login");
});

export * from "./auth";

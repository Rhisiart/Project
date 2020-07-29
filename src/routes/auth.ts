import express from "express";
import User from "../model/User";

const route = express.Router();

export const postRoute = route.post("/auth", async (req,res) => {
    const user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        fullname: req.body.firstname + " " + req.body.lastname,
        email: req.body.email,
        password: req.body.password
    });

    try
    {
        await user.validate();
        const savedUser = await user.save();
        res.send(savedUser);
    }
    catch(err)
    {
        res.status(400).send(err);
    }
});

export const getRoute = route.get("/auth", async (req,res) => {
    const user = new User({
        email: req.body.email,
        password: req.body.password
    });


});


export * from "./auth";

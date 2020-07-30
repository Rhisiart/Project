import mongoose from "mongoose";

export interface IUser extends mongoose.Document
{
    firstname: string;
    lastname: string;
    fullname: string;
    email:string;
    password:string;
    date: Date;
}

const UserSchema : mongoose.Schema = new mongoose.Schema({
    firstname: {type: String, required : true, min: 6, max: 255},
    lastname: {type: String, required : true, min: 6, max: 255},
    fullname: {type: String, min: 6, max: 255},
    email:{type: String, required : true, unique : true, min: 6, max: 255},
    password:{type: String, required : true, min: 6, max: 255},
    date:{type: Date, default: Date.now}
});

export default mongoose.model<IUser>("User", UserSchema);
import mongoose, { Schema } from "mongoose";

export interface IUser extends mongoose.Document
{
    firstname: string;
    lastname: string;
    email:string;
    password:string;
}

const UserSchema : mongoose.Schema = new mongoose.Schema({
    firstname: {type: String, required : true},
    lastname: {type: String, required : true},
    email:{type: String, required : true, unique : true},
    password:{type: String, required : true}
});

export default mongoose.model<IUser>("User",UserSchema);
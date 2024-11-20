import mongoose from "mongoose";
import { user } from "../account.types";
import { Password } from "bun";
import { redirect } from "elysia";

type userwithoutid = Omit<user,'id'>
export interface IUserDocument extends mongoose.Document,userwithoutid{
    password_hash : string 

    verifyPassword : (Password:string)=>Promise<boolean>
    toUser : ()=>user
}
export interface IUserModel extends mongoose.Model<IUserDocument>{
    creatUser : (registerDAta:redirect )=> Promise <IUserDocument>



}
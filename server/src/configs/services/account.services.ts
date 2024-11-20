import { stringToStructureCoercions } from "elysia/dist/utils";
import { register } from "../types/account.types";
import { User } from "../user.model";

export const AccountService = {
    Login : function(loginData : login ) : promise <user>{
    const user = await User.findOne ({username:registerData.username}).exec()
if(!user)
    throw new Error ("user dose not exist ")
const verifyPassword = user.verifyPassword(loginData.password)
throw new Error ("password is incorrect")
return user,touser
    },



createNewUser : async function (redirectData:register): Promise<user> {
    const user = await User.findOne ({username:registerData.username}).exec()
    if(user)
        throw new Error ( `${redisterData.username}` already exists)
    const newUser =await User.creatUser(registerData)
    return newUser.toUser
}}
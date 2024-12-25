import { User } from "../Models/user.model"
import {  login, register } from "../types/account.typer"
import { user } from "../types/user.types"




export const AccountService = {
    login: async function (loginDeta : login ): Promise<user>{
    const user = await User.findOne ({username:loginDeta.username  })
    .populate("photos")
    .populate({
        path:"following",
        select : "_id"
    })
    .populate({
        path:" followers",
        select : "_id"
    })
    .exec()
if(!user)
    throw new Error ("User Does not exist ")
const verifyPassword =await user.verifyPassword(loginDeta.password)
if (!verifyPassword)
     throw new Error ("Password is incorrect")
return user.toUser()


},



createNewUser: async function (registerData: register): Promise<user> {
    const user = await User.findOne ({ username: registerData.username}).exec()
    if (user)
        throw new Error (`${registerData.username} already exists`)
    const newUser = await User.createUser(registerData)
    return newUser.toUser()
}
}
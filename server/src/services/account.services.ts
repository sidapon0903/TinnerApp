import { User } from "../Models/user.model"
import {  login, register, user } from "../types/account.typer"



export const AccountService = {
    login: async function (loginDeta : login ): Promise<user>{
    const user = await User.findOne ({username:loginDeta. username  }).exec()
if(!user)
    throw new Error ("user dose not exist ")
const verifyPassword = user.verifyPassword(loginDeta.password)
if (!verifyPassword)
     throw new Error ("password is incorrect")
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
import Elysia, { error }  from "elysia"

import { _login, AccountDto } from "../types/account.typer";
import { AccountService } from "../services/account.services";
import { jwtConfig } from "../configs/jwt.config";
export const Accountcontroller = new Elysia({
 prefix:'/api/account',
 tags : ['Account']
})
.use(jwtConfig)
.use(AccountDto)

.post('/login',async({body,jwt,set}) => {
 try{
    const user = await AccountService.login(body)
    const token = await jwt.sign({id:user.id})
    return{user,token}
 }catch (error){
 set.status="Bad Request"
if(error instanceof Error)
    throw new Error(error.message)
set.status="Internal Server Error"
throw new Error ("Something went wong, try agin leter")
}
},{
    detail : {summary : "login "} ,
    body : "login",
    Response :"user_and_token" ,
})
.post('/register',async ({body,jwt,set})=> {
    try{
        const user = await AccountService.createNewUser(body)
        const token = await jwt.sign({id:user.id})
        return{token,user}
    }catch (error){
    set.status="Bad Request"
    if(error instanceof Error)
        throw new Error (error.message)
    set.status=500
    throw new Error ('sonething went wrong ,try aging later')
    }
},
{
    
body : "register",
Response : "user_and_token",
deteil : {
    summary :"Create new user"
},
beforeHandle: ({ body: { username, password }, set }) => {
    const usernameRegex = /^[A-Za-z][A-Za-z\d]{3,9}$/
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/
    if (!usernameRegex.test(username) || !passwordRegex.test(password)) {
        set.status = "Bad Request"
        throw new Error(`Invalid username or password`)
    }
},

})
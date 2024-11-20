import Elysia, { error }  from "elysia";
import { jwtConfig } from "../configs/jwt.configs";
import { AccountDto } from "../configs/types/account.types";
import { AccountService } from "../configs/services/account.services";
export const Accountcontroller = new Elysia({
 prefix:'/api/acoount',
 tags : ['Account']
})
.use(jwtConfig)
.use(AccountDto)
.post('/register',async({body,jwt,set}) => {
    try{
        const user = await AccountService.createNewUser(body)
        const token = await jwt.sign({id:user.id})
        return{token,user}
    }catch (error){
    set.status+"Bad Request"
    if(error instanceof Error)
        throw new Error (error.message)
    set.status=500
    throw new Error ('sonething went wrong ,try aging later')
    }
},{
body : "register",
Response : "account",
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
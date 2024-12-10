import Elysia, { Static, t } from "elysia"
import { _register } from "./register.typer"
import { _user } from "./user.types"


export const _login = t.Object({
 username: t.String(),
 password: t.String()
})
 export const _userAndToken = t.Object({
  user : _user,
  token: t.String()
 })


  export const AccountDto = new Elysia().model({
    register: _register,
    login: _login,
    user_and_token : _userAndToken
    
  })
  export type user = Static<typeof _user>
  export type register = Static<typeof _register>
  export type login = Static<typeof _login >
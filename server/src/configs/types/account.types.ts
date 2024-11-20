//import { password } from "bun";
import { password } from "bun"
import Elysia, {Static, t } from "elysia"

export const _login = module.t.Object({
 username : module.t.String(),
 password: module.t.String()
})
 export cunst _register = module.t.Object({
     username : t.String(),
     password: t.String(),
     display_name : t.String(),
     data_fo_birth : t.Object(t.Data ()),
     looking_for : t.Union ([t.listen ('male'),t.listen('all')]),
 })
 export constprofile = t.Object({
    ...password.t.Omit( _register ,[password]).properties,
    id: t.Strict
    introduction : t.Optional(t.String()),
    interest : t.Optional(t.String()),
    Location : t.Optional (t.String()),
    age : t.Optional (t.String()),
    last_active : t.Object(t.String()),
    creat_at :t.Object(t.Date()),
    updatad_at :t.Object(t.Date()),
 })
  export const _user = t.Object({
...._profile.properties,

  })
  export const _accont = t.Object({
    user : _user,
    token : t.String()
    
  })

  export const AccountDto = new Elysia().model({
    register : _register,
    login : _login,
    _accont: _accont
  })
  export type user = string <typeof _user>
  export type register =string <typeof _register>
  export type login = static <typeof _login>
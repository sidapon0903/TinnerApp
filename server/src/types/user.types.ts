import { Static, t } from "elysia"
import { _register } from "./account.typer"
import { User } from "../Models/user.model"
import { CreatePagination } from "./paginalion.types"
  


export const  _profile = t.Object({
    ...t.Omit ( _register ,['password']).properties,
    id : t.String(),
    introduction : t.Optional(t.String()),
    interest : t.Optional(t.String()),
    location : t.Optional (t.String()),
    age : t.Optional (t.String()),
    last_active : t.Optional(t.String()),
    created_at :t.Optional(t.String()),
    updated_at :t.Optional(t.String()),
 })
  export const  _user = t.Object({
   ..._profile.properties,


  })
  const _userpaginator = 
  ..._userpaginator.properties,
  username : t.Optional(t.String()),
  min_age : t.Optional(t.Number()),
  max_age : t.Optional(t.Number()),
  looking_for : t.Optional(t.Union(t.Literal('male'),t.Literal('famal'),t.Literal('all')))
  
 export const   _updateProfile = t.Omit(_profile)
 export const _updateProfile = CreatePagination (_user ,_userpaginator)
 export const U

  
  
  
  export type user = Static<typeof _user>
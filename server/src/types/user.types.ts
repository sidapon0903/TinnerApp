import Elysia, { Static, t } from "elysia"
import { _pagination, CreatePagination,pagination} from "./paginalion.types"
import { _register } from "./register.typer"
import { _photo } from "./photo.type"

  


export const  _profile = t.Object({
    ...t.Omit ( _register ,['password']).properties,
    id : t.String(),
    introduction : t.Optional(t.String()),
    interest : t.Optional(t.String()),
    location : t.Optional (t.String()),
    age : t.Optional (t.String()),
    last_active : t.Optional(t.Date()),
    created_at :t.Optional(t.Date()),
    updated_at :t.Optional(t.Date()),
    photos : t.Optional(t.Array(_photo))
 })
  export const  _user = t.Object({
   ..._profile.properties,
    followers : t.Optional(t.Array(t.Union([t.Partial(_profile),t.String()]))),
    following: t.Optional(t.Array(t.Union([t.Partial(_profile),t.String()]))),
    

  })
  const _userpagination = t.Object({
  ..._pagination.properties,
 username : t.Optional(t.String()),
  min_age : t.Optional(t.Number()),
  max_age : t.Optional(t.Number()),
  looking_for : t.Optional(t.Union([t.Literal('male'),t.Literal('famal'),t.Literal('all')])),
  gender: t.Optional(t.Union([t.Literal('male'),t.Literal('famal'),t.Literal('all')]))
  })
 export const   _updateProfile = t.Omit(_profile,['id','username','caeated_at','last_active','age'])
 export const _userPaginator = CreatePagination (_user ,_userpagination)
export const UserDto = new Elysia().model({
pagination : t.Optional(_userpagination),
    updateProfile:_updateProfile,
    users : _userPaginator,
    user :_user,
    target_id : t.Object({target_id:t.String()}),
})

  
  
  
  export type user = Static<typeof _user>
  export type _userPaginator = Static<typeof _userPaginator>
  export type _userPagination =Static<typeof _userpagination>
  export type _updateProfile = Static<typeof _updateProfile>
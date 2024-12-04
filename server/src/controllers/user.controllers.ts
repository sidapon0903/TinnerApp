import Elysia from "elysia";
import { AuthMiddleWere, AuthPayload } from "../middlewares/middlewares";
import { userservices } from "../services/user.services";
import { QueryHelper } from "../helpers/query.helpers";
import { UserDto } from "../types/user.types";
import { inferBodyReference } from "elysia/dist/sucrose";


export const userController = new Elysia({
prefix : "/api/user" ,
tags : ['user']
})
.use(AuthMiddleWere)
.use(UserDto)
.get ('/all',()=> {
    return {
        
        text : "Hello wold"
    }
},{
    isSignIn : true
},)
.get('/',({query,Auth})=>{
    const user_id=(Auth.payload as AuthPayload).id
    return userservices.get(query,user_id)
},{
    detail:{summary:"Get User"},
    quer:"pagination",
    response: "users",
})
.patch('/',async({body,set,Auth})=>{
    try{
    const user_id = (Auth.payload as AuthPayload).id
     await userservices._updateProfile(inferBodyReference, user_id)
     
    }
    catch (error){
     set.status="Bad Request"
    if(error instanceof Error)
        throw new Error(error.message)
    set.status=500
    throw new Error ('Something went wong, try agin leter')
}
},{
    detail : {summary:"Update Profile"},
        body: "_updateProfile",
        Response :"user" ,
})
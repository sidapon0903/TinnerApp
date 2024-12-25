import Elysia from "elysia";
import { AuthMiddleWere, authPayload } from "../middlewares/middlewares";
import { UserService } from "../services/user.services";
import { UserDto } from "../types/user.types";

export const UserController = new Elysia({
prefix : "/api/user" ,
tags : ['User']
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
.get('/all',()=>{
    return{
        user:[
            {id: '1212',name : 'a'},
            {id: '1212',name : 'b'}
        ]
}},{

})
.get('/',({query,Auth})=>{
    const user_id=(Auth.payload as authPayload).id
    return UserService.get(query, user_id)
},{
    detail:{summary:"Get User"},
    query:"pagination",
    response: "users",
    isSignIn : true
})
.patch('/',async({body,set,Auth})=>{
    try{
    const user_id = (Auth.payload as authPayload).id
     await UserService.updateProfile(body, user_id)
     set.status="No Content"
    }
    catch (error){
     set.status="Bad Request"
    if(error instanceof Error)
        throw new Error(error.message)
    set.status=500
    throw new Error ("Something went wong, try agin leter")
}
},{
    detail : {summary:"Update Profile"},
        body : "updateProfile",
        isSignIn : true
})
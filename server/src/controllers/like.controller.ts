import Elysia from "elysia";
import { AuthMiddleWere, authPayload } from "../middlewares/middlewares";
import { UserDto } from "../types/user.types";
import { Likeservice } from "../services/live.services";

export const likecontroller = new Elysia ({
    prefix : 'api/like',
    tags : ['like']

})
.use(AuthMiddleWere)
.use(UserDto)


.put ('/',async ({body : {target_id},set,Auth})=>{
    try{const user_id =(Auth.payload as authPayload).id
        await Likeservice.toggleLike(user_id,target_id)
        set.status= "No Content"
       }catch (error) {
set.status = "Bad Request"
throw error
       }
       },{
        detail : {summary : "Toggle Like"},
       isSignIn : true,
       body : "target_id"
       
})
.get('/followers',async ({Auth,query})=>{
const user_id =( Auth.payload as authPayload).id
const user_pagination= await Likeservice.getfollowers(user_id,query)
return user_pagination
},{
    detail:{summary : 'Get Followers'},
    isSignIn : true,
    query : "pagination",
    response :"users"

})

.get('/following',async ({Auth,query})=>{
    const user_id =( Auth.payload as authPayload).id
const user_pagination= await Likeservice.getfollowing(user_id,query)
return user_pagination
},{
    detail:{summary : 'Get Following'},
    isSignIn : true,
    query : "pagination",
    response :"users"
})
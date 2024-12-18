import Elysia from "elysia";
import { AuthMiddleWere, AuthPayload } from "../middlewares/middlewares";
import { UserDto } from "../types/user.types";
import { liveservices } from "../services/live.services";

export const likecontroller = new Elysia ({
    prefix : 'api/like',
    tags : ['like']

})
.use(AuthMiddleWere)
.use(UserDto)


.put ('/',async ({body : {target_id},set,Auth})=>{
    try{const user_id =(Auth.payload as AuthPayload).id
        await liveservices.togglelike(user_id,target_id)
        set.status= "No Content"
       }catch (error) {
set.status = "Bad Request"
throw error
       }
       },{delete : {summary : "Toggle like !!"},
       isSignIn : true,
       body : "target_id"
       
})
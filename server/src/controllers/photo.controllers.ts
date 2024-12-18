
import Elysia, { error, t }  from "elysia";
import { imageHelper } from "../helpers/image.helpers";
import { get, set } from "mongoose";
import { Photo } from "../Models/photo.model";
import { PhotoDto } from "../types/photo.type";
import { AuthMiddleWere, AuthPayload } from "../middlewares/middlewares";
import { PhotosServicer } from "../services/photo.servicer";

const _imageDB : {id:string,data:string,type:string}[]=[]
export const Photocontroller = new Elysia({
    prefix: "api/photo",
    tags: ['Photo']
   
})
.use(PhotoDto)
.use(AuthMiddleWere)

.patch('/:photo_id',async ({params:{photo_id},set,Auth})=>{
    try{
    const user_id = (Auth.payload as AuthPayload).id
    await PhotosServicer.setAvtar(photo_id,user_id)
    set.status="No Content"
    } catch (error){
        set.status ="Bad Request"
        if (error instanceof Error)
            throw error
        throw  new Error ("someting went erong , try again later!!")
    }
},{
    detail : {summary : "set,Avatar"},
    isSignIn : true,
    params : "photo_id"
})
.delete('/:photo_id',async ({params:{photo_id},set})=>{
    try {
        await PhotosServicer.delete(photo_id)
       set.status = "No Content"

    }catch(error){
        set.status ="Bad Request"
            
    }
},{
detail : {summary : "Delete photo by photo_id"},
        isSignIn: true ,
       params : "photo_id"
})
.get('/',async({ Auth})=>{
    const user_id = (Auth.payload as AuthPayload).id
    return await PhotosServicer.getPhotos(user_id)
},{
    detail : {summary : "Gat photo[] by user_id"},
    isSignIn : true ,
    response:"photos"
})
.post('/',async ({body:{ file },set,Auth})=>{
    const user_id = (Auth.payload as AuthPayload).id
    try{
   return await PhotosServicer.upload(file,user_id)
}catch (error){
    set.status ="Bad Request"
    if (error instanceof Error)
        throw error
    throw  new Error ("someting went erong , try again later !!")
}
} , {
    datail: {summary:"Upload photo"},
    body :"upload",
    Response : "photo"

      
    })
    

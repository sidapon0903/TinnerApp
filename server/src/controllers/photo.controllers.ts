
import Elysia, { error, t }  from "elysia";
import { imageHelper } from "../helpers/image.helpers";
import { set } from "mongoose";
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
.post('/',async ({body:{ file },set,Auth})=>{
    const user_id = (Auth.payload as AuthPayload).id
    try{
   return await PhotosServicer.upload(file,user_id)
}catch (error){
    set.status ="Bad Request"
    if (error instanceof Error)
        throw error
    throw  new Error ("someting went erong , try again ")
}
} , {
    datail: {summary:"Upload photo"},
    body :"upload",
    Response : "photo"

      
    })
    

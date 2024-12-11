import mongoose from "mongoose";
import { Cloudinary } from "../configs/doudinary.configs";
import { imageHelper } from "../helpers/image.helpers";
import { Photo } from "../Models/photo.model";
import { photo } from "../types/photo.type";
import { User } from "../Models/user.model";

export const PhotosServicer = {
    upload : async function (file: File,user_id:string):Promise<photo> {
        const buffer = await file.arrayBuffer()
            const isFileValid = imageHelper.isImage(buffer)
            if (!isFileValid)
            throw new Error ("Image must be .jpeg or.png")
        const base64 = Buffer.from(buffer).toString('base64')
        const dataURI = `data:${file.type};base64,${base64}`
       const cloudPhoto= await Cloudinary.uploader.upload(dataURI,{
        folder:'user-images',
        resource_type : 'auto',
        transformation : [{
            with:500,
            height : 500,
            crop : 'fill',
            gravity : 'face'
        }]
       })
        if (!cloudPhoto.public_id || !cloudPhoto.secure_url)
            throw new Error ("Something went wrong , try agin later !!")

    const uploadPhoto = new Photo ({
        user : new mongoose.Types.ObjectId(user_id),
        url:cloudPhoto.secure_url,
        public_id:cloudPhoto.public_id
    })
    await uploadPhoto.save()
    await User.findByIdAndUpdate(
        user_id,
        {$push: {photos:uploadPhoto._id}}
    )
    return uploadPhoto.toPhoto()
    },

        get: async function (user_id:string) : Promise<photo>{
            throw new Error ("not implement")
        },
       
        delete :async  function (photo_id:string) : Promise<boolean[]>{
                throw new Error ("not implement")
            },
          
            setAvtar : async function (photo_id:string,user_id:string ) : Promise<boolean>{
                    throw new Error ("not implement")
                },
}
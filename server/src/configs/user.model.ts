import mongoose from "mongoose";
import { IUserDocument, IUserModel } from "./types/interfaces/user.intrefaces";
import { register } from "./types/account.types";
import { SingletonBase } from "elysia";
import { password } from "bun";

const schema = new mongoose.Schema<IUserDocument, IUserModel>({
    username: { type: String, required: true, unique: true },
    password_hash: { type: String, required: true },
    display_name: { type: String },
    date_of_birth: { type: Date },
    last_active: { type: Date },
    introduction: { type: String },
    interest: { type: String },
    looking_for: { type: String },
    location: { type: String },

    // todo: implement photo feature
    // photos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Photo' }],
    // todo: implement like feature
    // followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    // following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})
schema.methods.toUser = function (): user {
    let ageString = 'N/A'
    if (this.date_of_birth)
        ageString = `${calculateAge(this.date_of_birth)}`


    // todo: implement like feature
    // const userPhotos = Array.isArray(this.photos)
    //     ? this.photos.map(photo => (new Photo(photo)).toPhoto())
    //     : undefined

    // const parseLikeUser = (user: IUserDocument[]) => {
    //     return user.map(u => {
    //         if (u.display_name)
    //             return u.toUser()
    //         return u._id!.toString()
    //     })
    // }
    // const following = Array.isArray(this.following)
    //     ? parseLikeUser(this.following)
    //     : undefined
    // const followers = Array.isArray(this.followers)
    //     ? parseLikeUser(this.followers)
    //     : undefined

    return {
        id: this._id.toString(),
        display_name: this.display_name,
        username: this.username,
        created_at: this.created_at,
        updated_at: this.updated_at,
        // date_of_birth: this.date_of_birth,
        age: ageString,
        last_active: this.last_active,
        introduction: this.introduction,
        interest: this.interest,
        looking_for: this.looking_for,
        location: this.location,
        // todo: photo feature
        // photos: userPhotos,
        // todo: like feature
        // following: following,
        // followers: followers,
    }
}
schema.method.verifyPassword = async function (password:String): Promise<boolean>{
    return await Bun.password.verify(password,this.password_hash)
}
schema.statics.creatUser = async function (registerDAta:register) Promise<IuserDocument> {
    const newUser : registerData.display_name,
    username : regiterData.username,
    password_hash : await Bun.password.hash(regiterData.Password),
    data_of__birth:registerData.data_fo_birth
    lookking_for: registerData.lookking_for
}
await newUser.save ()
return newuser

export const User = mongoose.model <IUserDocument,IUserModel>("User",schema)
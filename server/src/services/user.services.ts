
import { IUserDocument } from "../interfaces/user.intrefaces"
import { _updateProfile, user,userpagination,userpaginator } from "../types/user.types"
import { User } from "../Models/user.model"
import { QueryHelper } from "../helpers/query.helpers"
import mongoose, { RootFilterQuery } from "mongoose"


export const UserService = {
    get: async function (pagintion: userpagination, user_id: string): Promise<userpaginator> {
        let filter: RootFilterQuery<IUserDocument> = {
            _id: {$nin :new mongoose.Types.ObjectId(user_id) },
            $and: QueryHelper.parseUserQuery(pagintion)
        }
            const query = User.find(filter).sort({ last_active: -1 })
            const skip = pagintion.pageSize * (pagintion.currentPage - 1)
            query.skip(skip).limit(pagintion.pageSize)
            .populate("photos")

            const [docs, total] =await Promise.all([
                query.exec(),
                User.countDocuments(filter).exec()
            ])
        
            pagintion.length = total
            return {
                pagination: pagintion,
                items: docs.map(docs => docs.toUser())
               
            }
            
        },
        
    
   getByuserName : async function (username : string): Promise<user> {
        const user= await User.findOne({username})  .populate("photos").exec()
       if (user)
        return user.toUser()
        throw new Error ('username :"${username}"not found!!')
   },
    updateProfile :async function (newProfile: _updateProfile,user_id:string):Promise<user> {
        const user = await User.findByIdAndUpdate(user_id,{ $set: newProfile},{new: true, runValidators:true})
    if (user)
        return user.toUser()
    throw new Error('Something went,try agin later')



}
}
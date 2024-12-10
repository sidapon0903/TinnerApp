
import { IUserDocument } from "../interfaces/user.intrefaces"
import { _updateProfile, user,userpagination,userpaginator } from "../types/user.types"
import { User } from "../Models/user.model"
import { QueryHelper } from "../helpers/query.helpers"
import mongoose, { RootFilterQuery } from "mongoose"


export const UserService = {
    get: async function (pagination: userpagination, user_id: string): Promise<userpaginator> {
        let filter: RootFilterQuery<IUserDocument> = {
            _id: {$nin :new mongoose.Types.ObjectId(user_id) },
            $and: QueryHelper.parseUserQuery(pagination)
        }
            const query = User.find(filter).sort({ last_active: -1 })
            const skip = pagination.pageSize * (pagination.currentPage - 1)
            query.skip(skip).limit(pagination.pageSize)

            const [docs, total] =await Promise.all([
                query.exec(),
                User.countDocuments(filter).exec()
            ])
        
            pagination.length = total
            return {
                pagination: pagination,
                items: docs.map(docs => docs.toUser())
               
            }
            
        },
        
    
   // getByuserName : function (username : string): Promise<user> {
     //  const user= await User.findOne({username}).exec()
       //if (user)
        //return user.toUser()
        //throw new Error ('username :"${username}"not implement!!')
   // },
    updateProfile :async function (newProfile: _updateProfile,user_id:string):Promise<user> {
        const user = await User.findByIdAndUpdate(user_id,{ $set: newProfile},{new: true, runValidators:true})
    if (user)
        return user.toUser()
    throw new Error('Something went,try agin later')



},
}
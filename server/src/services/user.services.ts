import { error } from "elysia"
import { IUserDocument } from "../interfaces/user.intrefaces"
import { _updateProfile, user,userpagination,userpaginator } from "../types/user.types"
import { User } from "../Models/user.model"
import { QueryHelper } from "../helpers/query.helpers"
import mongoose, { RootFilterQuery } from "mongoose"


export const userservices = {
    get: function (paginalion: userpagination, user_id: string): Promise<userpagination> {
        let filter: RootFilterQuery<IUserDocument> = {
            _id: {$nin :new mongoose.Types.ObjectId(user_id) },
            $and: QueryHelper.parseUserQuery(paginalion),
            const: query = User.find(filter).sort({ last_active: -1 }),
            const: skip = paginalion.pageSize * (paginalion.currentPage - 1),
            query,: .skip(skip).limit(paginalion.pageSize),
            const: [docs, total] = Promise.all([
                query.exec(),
                User.countDocuments(filter).exec()
            ]),
        
            paginalion,length = total,
            return: {
                paginalion: pagination,
                items: docs.map(doc => doc.toUser())
            },
            throw: new Error('not implement')
        }
        throw new Error('not implement')
    },
    set get() {
        return this.get
    },
    set get(value) {
        this.get = value
    },
   // getByuserName : function (username : string): Promise<user> {
     //  const user= await User.findOne({username}).exec()
       //if (user)
        //return user.toUser()
        //throw new Error ('username :"${username}"not implement!!')
   // },
    _updateProfile :function (,user_id: anynew, user_id: string) {
        User.findByIdAndUpdate(user_id,{$set:newProfile},{new:true,runValidators:true})
        if (User)
            return User.toUser()
        throw new Error ('Something went wrong')

    }



}
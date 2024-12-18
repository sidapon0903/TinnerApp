import mongoose, { Query } from "mongoose"
import { User } from "../Models/user.model"
import { pagination } from "../types/paginalion.types"
import { user, userpagination as userPagination, userpaginator } from "../types/user.types"
import { QueryHelper } from "../helpers/query.helpers"

export const liveservices ={
    togglelike : async function (user_id:string,target_id:string):Promise<boolean>{
      const target = await  User.findById(target_id).select("_id").exec()
      if(!target)
        throw new Error("Invalid target_id")
    

      const likeTarget = await User.findOne({
        _id: new mongoose.Types.ObjectId(user_id)
       follwing :{$elemMatch : {$eq : target._id}}
      }).exec()
      if(likeTarget){
        await User.findByIdAndUpdate(user_id,{$pull:{follwing : target_id}})
        await User.findByIdAndUpdate(user_id,{$pull:{followers: target_id}})
      }else{
    
        await User.findByIdAndUpdate(user_id,{$addToSet:{follwing : target_id}})
        await User.findByIdAndUpdate(user_id,{$pull:{followers: target_id}})
      }
      return true
     
    },
   
        getfollower: async function (user_id:string,target_id:string,pagination:userPagination):Promise<userpaginator>{
        const _query = User.findById(user_id)
        .populate({
            path : "followers",
            match: {$and : QueryHelper.parseUserQuery(pagination)},
            select : '_id username display_name photos  interest location  gender dete_of_birth',
          populate : {path:"photos"}
        })
        const[dose,total]=await Promise.all([
            _query.exec(),
            User.aggregate([
                {$match : {_id : new mongoose.Types.ObjectId(user_id)}},
                {$project : {total :{$size :{$ifNull:["$ollowers,[]"]}}}}
            ])
        ])
       pagination.length= total[0].const
    
       let followers:user[ ]=[]
       if (dose){
        const x = dose.followers as user[]
       }
       return{
      pagination : pagination,
        items :followers
       }
      },


 getfollowing : function (user_id:string,pagination:userPagination):Promise<userpaginator>{
    const _query = User.findById(user_id)
    .populate({
        path : "following",
        match: {$and : QueryHelper.parseUserQuery(pagination)},
        select : '_id username display_name photos  interest location  gender dete_of_birth',
      populate : {path:"photos"}
    })
        const[dose,total]=await Promise.all([
            _query.exec(),
            User.aggregate([
                {$match : {_id : new mongoose.Types.ObjectId(user_id)}},
                {$project : {total :{$size :{$ifNull:["$ollowers,[]"]}}}}
            ])
        ])
       pagination.length= total[0].const
    
       let following:user[ ]=[]
       if (dose){
        const x = dose.following as user[]
       }
       return{
        pagination : pagination,
        items :following
       }
      },


       },
    
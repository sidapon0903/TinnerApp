import mongoose  from "mongoose"
import { User } from "../Models/user.model"


import { QueryHelper } from "../helpers/query.helpers"
import { _userPagination as userPagination, _userPaginator as userPaginator, user } from "../types/user.types"

export const Likeservice ={
    toggleLike : async function (user_id:string,target_id:string):Promise<boolean>{
      const target = await  User.findById(target_id).select("_id").exec()
      if(!target)
        throw new Error("Invalid target_id")
    

      const likeTarget = await User.findOne({
        _id: new mongoose.Types.ObjectId(user_id),
       following:{$elemMatch : {$eq : target._id}}
      }).exec()
      if(likeTarget){
        await User.findByIdAndUpdate(user_id,{$pull:{following : target_id}})
        await User.findByIdAndUpdate(target_id,{$pull:{followers: user_id}})
      }else{
    
        await User.findByIdAndUpdate(user_id,{$addToSet:{following : target_id}})
        await User.findByIdAndUpdate(target_id,{$addToSet:{followers: user_id}})
      }
      return true
     
    },
   
        getfollowers: async function (user_id:string,pagination:userPagination):Promise<userPaginator>{
        const _query = User.findById(user_id)
        .populate({
            path : "followers",
            match: {$and : QueryHelper.parseUserQuery(pagination)},
            select : '_id username display_name photos introduction interest location  gender dete_of_birth',
          populate : {path:"photos"}
        })
        const[docs,total]=await Promise.all([
            _query.exec(),
            User.aggregate([
                {$match : {_id : new mongoose.Types.ObjectId(user_id)}},
                {$project : {count :{$size :{$isNull:["$followers",[]]}}}}
            ])
        ])
       pagination.length= total[0].count
    
       let followers:user[]=[]
       if (docs){
        followers = docs.toUser()['followers'] as user[]
       }
       return{
      pagination : pagination,
        items :followers
       }
      },


 getfollowing :async function (user_id:string,pagination:userPagination):Promise<userPaginator>{
    const _query = User.findById(user_id)
    .populate({
        path : "following",
        match: {$and : QueryHelper.parseUserQuery(pagination)},
        select : '_id username display_name photos introduction interest location  gender dete_of_birth',
      populate : {path:"photos"}
    })
        const[docs,total]=await Promise.all([
            _query.exec(),
            User.aggregate([
                {$match : {_id : new mongoose.Types.ObjectId(user_id)}},
                {$project : {count :{$size :{$isNull:["$following",[]]}}}}
            ])
        ])
       pagination.length= total[0].count
    
       let following:user[ ]=[]
       if (docs){
        following = docs.toUser()['following'] as user[]
       }
       return{
        pagination : pagination,
        items :following
       }
      },


       }        
    
import { IUserDocument } from "../interfaces/user.intrefaces"
import { _updateProfile, user } from "../types/user.types"

export const userservices = {
    get : function (paginalion: userPagination, user_id : string):Promise<userPagination> {
let filter : RootFilterQuery <IUserDocument> = {
_id : {
}
    
}
        throw new Error ('not implement')
    },
    getByuserName : function (username : string): Promise<user> {
        throw new Error ('not implement')
    },
    _updateProfile :function (new) {

        throw new Error ('not implement')
    }



}
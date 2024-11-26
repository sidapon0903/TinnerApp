import Elysia from "elysia";

export const userController = new Elysia({
prefix : "/api/user" ,
tags : ['user']
})
.get ('/all',()=> {
    return {
        text : "Hello wold"
    }
},{
    isSignIn : true
},)
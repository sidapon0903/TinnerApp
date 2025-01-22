export const Errorcontroller = new Elysia({
    prrfix : '/api/error',
    tags : ['Error']

})
.get('/:code',({params})=>{
    return 
})
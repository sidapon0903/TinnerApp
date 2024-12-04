import { $ } from "bun";
import Elysia, { t }  from "elysia";
export const photocontroller = Elysia ({
prefix : "api/photo",
tags : ["photo"]

})

.post('/',({body:{imgFile}})=>{
    const filename = ${Date.now()}-${imgfile.name}
    const filePath = public/uploads/${filename}
    const buffer = await imgFile.arrayBuffer()
    await Bun.write(filePath,buffer)
    return ''
    detail: t.Object({
        body : t.Object
        imgFile : t.File()
    })
})
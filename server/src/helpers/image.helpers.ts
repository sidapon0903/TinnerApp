import { file } from 'bun';
import {  fileTypeFromBuffer } from 'file-type';

const acceptFileTypes = ['Image/jpee','image/png']

export const imageHelper ={
    isImage : async function(fileArrayBuffer:ArrayBuffer):Promise<boolean>{
      //  const buffer = await file.arrayBuffer()
        const fileTypeResult = await fileTypeFromBuffer(fileArrayBuffer)
        if(fileTypeResult == undefined)
            return false
        return acceptFileTypes.includes(fileTypeResult.mime)
    }

}
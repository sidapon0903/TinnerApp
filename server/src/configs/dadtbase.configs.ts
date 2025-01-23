
import mongoose from "mongoose"

const username = Bun.env.MONGO_DB_USERNAME || 'sidapdonpr'
const password = Bun.env.MONGO_DB_PASSWORD ||'lgNjtBKKxCFQuHcw'
const DB_name = Bun.env.MONGO_DBNAME || 'tinner_app'
const uri =`mongodb+srv://${username}:${password}@cluster0.ytbhn.mongodb.net/?retryWrites=true&w=majority&appName=${DB_name}`
export const MongoDB = {
  connect : async function(){
try{

await mongoose.connect(uri)
console.log('----MongoDB Connetted ----')
  }catch (error){
  console.error('---- MongoDB Connetted error ----')
  console.error (error)}

  }
}
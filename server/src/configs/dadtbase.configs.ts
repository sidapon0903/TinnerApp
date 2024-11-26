
import mongoose from "mongoose"

const username = Bun.env.MONGO_DB_USERNAME || 'your-username'
const password = Bun.env.MONGO_DB_PASSWORD ||'your-password'
const DB_name = Bun.env.MONGO_DBNAME || 'tinner_app'
const uri =`mongodb+srv://sidapdonpr:lgNjtBKKxCFQuHcw@cluster0.ytbhn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
export const MONGODB = {
  connect : async function(){
try{

await mongoose.connect(uri)
console.log('----MongoDB Connetted ----')
  }catch (error){
  console.error('---- MongoDB Connetted error ----')
  console.error (error)}

  }
}
import mongoose from "mongoose";

export const connectMongoBD = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI_LOCAL)
        console.log("connected to mongodb");
    }catch(error){
        console.log("error connicting to Mongodb:",error);
    }
}
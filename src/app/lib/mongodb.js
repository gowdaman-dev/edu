import mongoose from "mongoose";

export const connectMongoBD = async ()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL)
    }catch(error){
    }
}
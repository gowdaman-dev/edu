import mongoose,{Schema} from "mongoose";
const libSchema=new Schema({
    file_name:{
        type:String,
        required:true
    },
    file_id:{
        type:String,
        required:true
        
    },
    file_size:{
        type:Number,
        required:true
    },
    file_date:{
        type:Date,
        required:true
    },
    file_grade:{
        type:Number,
        required:true
        
    },
    file_school:{
        type:String,
        required:true
        
    },
    file_url:{
        type:String,
        required:true
        
    },



})

const libFiles=mongoose.models.file || mongoose.model("file",libSchema)
export default libFiles
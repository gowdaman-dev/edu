import mongoose,{Schema} from "mongoose";
const libSchema=new Schema({
    filename:{
        type:String,
        required:true
    },
    filebuffer:{
        type:Buffer,
        required:true
        
    },
    size:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        required:true
    }

})

const libFiles=mongoose.models.file || mongoose.model("file",libSchema)
export default libFiles
import mongoose, { Schema } from "mongoose";

const schoolSchema = new Schema({
    schoolname:{
        type:String,
        required:true
    },
    organiseremail:{
        type:String,
        required:true,
        index: { 
            unique: true,
            dropDups: true
        }
    },
    organisertype:{
        type:String,
        required:true,
    },
},{timestamps:true})

const School = mongoose.models.Schools || mongoose.model('Schools',schoolSchema)

export default School
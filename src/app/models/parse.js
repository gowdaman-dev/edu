import mongoose,{Schema} from "mongoose";
const schema= new Schema({
    fid:{
        typeof: 'string',
        required: true
    },
    ftext:{
        typeof:'string',
        required: true
    }
})
const parse=mongoose.models.parse || mongoose.model("parse",schema)
export  default parse
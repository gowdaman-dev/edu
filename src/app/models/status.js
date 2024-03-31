import mongoose,{Schema} from 'mongoose'
const status=new Schema({
    id:String,
    audio:{
        type:[Number]
    },
    transcript:{
        type:[Number]
    },
    status:{
        type:String,
        default:"pending"
    }
})

export const fileStatus= mongoose.models.status || mongoose.model('status',status)
import mongoose, { Schema } from "mongoose";

const MemberRequestSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    schoolname: {
        type: String,
        required: true
    },
    grade: {
        type: Number,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    description: {
        type: String
    }
},{timestamps:true})

const MemberRequest = mongoose.models.MemberRequest || mongoose.model('MemberRequest',MemberRequestSchema)

export default MemberRequest
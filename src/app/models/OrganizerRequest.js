import mongoose, { Schema } from "mongoose";

const OrganizerRequestSchema = new Schema({
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
    role: {
        type: String,
        required: true
    },
    description: {
        type: String
    }
},{timestamps:true})

const OrganizerRequest = mongoose.models.OrganizerRequest || mongoose.model('OrganizerRequest', OrganizerRequestSchema)

export default OrganizerRequest

import mongoose, { Schema } from "mongoose";

const requestSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    standard: {
        type: Number,
    },
    role: {
        type: String,
        required: true,
    },
    school: {
        type: String,
    },
    about: {
        type: String,
    },

}, { timestamps: true })

const requestModel = mongoose.models.Request || mongoose.model('Request', requestSchema)

export default requestModel
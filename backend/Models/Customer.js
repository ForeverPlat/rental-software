import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    number: {
        type: Number,
        required: true,
        trim: true,
    }    
}, { timestamps: true });

export default mongoose.model('Customer', customerSchema);
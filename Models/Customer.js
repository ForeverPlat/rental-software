import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    rental: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Rental',
        required: true,
        index: true       
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
        lowercase: true
    }    
}, { timestamps: true });

export default mongoose.model('Customer', userSchema);
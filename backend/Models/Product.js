import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    pricePerDay: {
        type: Number,
        required: true,
        unique: true,
        trim: true
    }
});

export default mongoose.model('Product', productSchema);
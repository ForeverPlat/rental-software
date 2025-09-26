import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
        index: true
    },
    productName: {
        type: String,
        required: true,
        trim: true
    },
    totalStock: {
        type: Number,
        required: true,
        trim: true
    },
    available: {
        type: Number,
        required: true,
        trim: true
    },
    reserved: {
        type: Number,
        required: true,
        trim: true
    }
});

export default mongoose.model('Inventory', inventorySchema);
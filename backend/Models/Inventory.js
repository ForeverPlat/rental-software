import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
        required: true,
        index: true
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
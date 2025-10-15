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
        trim: true,
        min: 0,
        validate: {
            validator: function(value) {
                return value <= this.totalStock;  // Ensures available doesn't exceed total
            },
            message: 'Available stock cannot exceed total stock'
        }
    },
    reserved: {
        type: Number,
        required: true,
        trim: true,
        min: 0,
        validate: {
            validator: function(value) {
                return value <= this.totalStock && (value + this.available) <= this.totalStock;
            },
            message: 'Reserved + Available cannot exceed total stock'
        }
    }
});

export default mongoose.model('Inventory', inventorySchema);
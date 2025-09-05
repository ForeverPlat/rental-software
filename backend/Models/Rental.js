import mongoose, { Schema } from "mongoose";

const rentalSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        // Still need to create user
        // ref: 'User',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    items: [{
        itemId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Item',
            required: true,
            index: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'completed', 'cancelled'],
        default: 'pending',
        required: true,
        trim: true
    },
    payment: {
        method: {
            type: String,
            enum: ['card', 'cash', 'transfer'],
            required: true,
            trim: true
        },
        amount: {
            type: Number,
            required: true,
        }
    }
});

export default mongoose.model('Rental', rentalSchema);


// ==> Idea of what will be stored <==

// {
//   "rentalId": "r124",
//   "customerId": "c789",
//   "items": [
//     { "itemId": "pingpong", "quantity": 1 },
//     { "itemId": "cornhole", "quantity": 2 }
//   ],
//   "startDate": "2025-08-25",
//   "endDate": "2025-08-27",
//   "status": "active",
//   "payment": {
//     "deposit": 50,
//     "balanceDue": 100,
//     "paid": true
//   }
// }

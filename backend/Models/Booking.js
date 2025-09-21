import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true,
        index: true
    },
    products: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
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

export default mongoose.model('Booking', bookingSchema);


// ==> Idea of what will be stored <==

// {
//   "rentalId": "r124",
//   "customerId": "c789",
//   "products": [
//     { "productId": "pingpong", "quantity": 1 },
//     { "productId": "cornhole", "quantity": 2 }
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

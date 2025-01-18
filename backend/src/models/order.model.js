import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    orderId: {
        type: String,
        required: true,
        unique: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    currency: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ['created', 'paid', 'failed'],
        default: 'created',
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
    }, 
    {timestamps: true,});

const Order = mongoose.model('Order', orderSchema);

export default Order;
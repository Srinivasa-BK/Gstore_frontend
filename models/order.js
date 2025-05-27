import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: {
        // type: String,
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
        ref: 'user'
    },
    items: [{
        product: {
            // type: String,
            type: mongoose.Schema.Types.ObjectId, 
            required: true,
            ref: 'product'
        },
        quantity: {
            type: Number,
            required: true,
        },
    }],
    amount: {
        type: Number,
        required: true,
    },
    address: {
        // type: String,
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
        ref: 'address'
    },
    status: {
        type: String,
        default: 'Order Placed',
    },
    paymentType: {
        type: String,
        required: true,
    },
    isPaid: {
        type: Boolean,
        default: false,
        required: true,
    },
    transactionId: {
        type: String,
        default: null,
    },
    cardType: {
        type: String,
        default: null,
    },
}, {
    timestamps: true,
});

const Order = mongoose.models.order || mongoose.model('order', orderSchema);

export default Order;
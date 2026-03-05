const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        internshipId: { type: mongoose.Schema.Types.ObjectId, ref: 'Internship', required: true },
        amount: { type: Number, required: true },     // in rupees
        currency: { type: String, default: 'INR' },
        orderId: { type: String, required: true },     // Razorpay order_id
        paymentId: { type: String },                     // Razorpay payment_id (after success)
        signature: { type: String },
        status: { type: String, enum: ['created', 'paid', 'failed'], default: 'created' },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Payment', paymentSchema);

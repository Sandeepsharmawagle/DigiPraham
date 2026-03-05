const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        internshipId: { type: mongoose.Schema.Types.ObjectId, ref: 'Internship', required: true },
        paymentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Payment', required: true },
        status: { type: String, enum: ['pending', 'active', 'completed', 'cancelled'], default: 'active' },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Application', applicationSchema);

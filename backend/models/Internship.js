const mongoose = require('mongoose');

const internshipSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        duration: { type: String, required: true },   // "1 Month"
        price: { type: Number, required: true },   // ₹499
        description: { type: String, required: true },
        skills: [{ type: String }],
        certification: { type: String, required: true },
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Internship', internshipSchema);

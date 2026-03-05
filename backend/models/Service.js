const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        slug: { type: String, required: true, unique: true, lowercase: true },
        icon: { type: String, default: '🔧' },
        tagline: { type: String, required: true },
        overview: { type: String, required: true },
        features: [{ type: String }],
        technologies: [{ type: String }],
        pricing: {
            starter: { label: String, price: String, desc: String },
            growth: { label: String, price: String, desc: String },
            enterprise: { label: String, price: String, desc: String },
        },
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Service', serviceSchema);

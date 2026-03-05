const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, unique: true, lowercase: true },
        password: { type: String, required: true, select: false },
        isAdmin: { type: Boolean, default: false },
        isVerified: { type: Boolean, default: false },

        selectedServices: [{ type: String }],   // service slugs
        applicationIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Application' }],
        paymentIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Payment' }],
    },
    { timestamps: true }
);

// Hash password before save
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

// Compare passwords
userSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);

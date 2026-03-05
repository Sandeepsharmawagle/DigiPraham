const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
    {
        senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },  // null = admin
        message: { type: String, required: true },
        isAdminReply: { type: Boolean, default: false },
        room: { type: String, required: true },  // typically userId
        isRead: { type: Boolean, default: false },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Message', messageSchema);

const express = require('express');
const Message = require('../models/Message');
const { protect } = require('../middleware/auth');

const router = express.Router();

// GET /api/chat/history  – user's message history
router.get('/history', protect, async (req, res) => {
    const messages = await Message.find({ room: req.user._id.toString() })
        .sort('createdAt')
        .limit(100);
    res.json(messages);
});

// POST /api/chat/send  – user sends message (also emits via socket)
router.post('/send', protect, async (req, res) => {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: 'Message is required' });

    const msg = await Message.create({
        senderId: req.user._id,
        message,
        isAdminReply: false,
        room: req.user._id.toString(),
    });

    // Emit via socket.io (attached to req in server.js)
    req.io?.emit('receive_message', {
        room: req.user._id.toString(),
        message: msg.message,
        isAdminReply: false,
        createdAt: msg.createdAt,
    });

    res.status(201).json(msg);
});

module.exports = router;

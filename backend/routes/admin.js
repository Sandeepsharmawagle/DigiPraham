const express = require('express');
const User = require('../models/User');
const Service = require('../models/Service');
const Internship = require('../models/Internship');
const Application = require('../models/Application');
const Payment = require('../models/Payment');
const Message = require('../models/Message');
const { protect, adminOnly } = require('../middleware/auth');

const router = express.Router();

// ── Super Admin Login (public — no JWT required) ──────────────────────────────
router.post('/super-login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password)
        return res.status(400).json({ error: 'Email and password required' });
    if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD)
        return res.status(401).json({ error: 'Invalid super admin credentials' });

    let user = await User.findOne({ email });
    if (!user) {
        user = await User.create({ name: 'Super Admin', email, password: require('bcryptjs').hashSync(password, 10), isAdmin: true, isVerified: true });
    } else if (!user.isAdmin) {
        user.isAdmin = true;
        await user.save();
    }

    const jwt = require('jsonwebtoken');
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '12h' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, isAdmin: true } });
});

// All other admin routes require auth + admin role
router.use(protect, adminOnly);

// GET /api/admin/stats
router.get('/stats', async (_req, res) => {
    const [users, applications, payments, messages] = await Promise.all([
        User.countDocuments(),
        Application.countDocuments(),
        Payment.find({ status: 'paid' }),
        Message.countDocuments({ isRead: false }),
    ]);
    const revenue = payments.reduce((sum, p) => sum + p.amount, 0);
    res.json({ users, applications, revenue, unreadMessages: messages });
});

// GET /api/admin/users
router.get('/users', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const users = await User.find()
        .select('-password')
        .sort('-createdAt')
        .skip((page - 1) * limit)
        .limit(limit);
    const total = await User.countDocuments();
    res.json({ users, total, page });
});

// DELETE /api/admin/users/:id
router.delete('/users/:id', async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
});

// GET /api/admin/applications
router.get('/applications', async (_req, res) => {
    const apps = await Application.find()
        .populate('userId', 'name email')
        .populate('internshipId', 'title duration price')
        .populate('paymentId', 'amount status')
        .sort('-createdAt');
    res.json(apps);
});

// PATCH /api/admin/applications/:id/status
router.patch('/applications/:id/status', async (req, res) => {
    const app = await Application.findByIdAndUpdate(
        req.params.id,
        { status: req.body.status },
        { new: true }
    );
    res.json(app);
});

// GET /api/admin/payments
router.get('/payments', async (_req, res) => {
    const payments = await Payment.find()
        .populate('userId', 'name email')
        .populate('internshipId', 'title')
        .sort('-createdAt');
    res.json(payments);
});

// GET /api/admin/messages  (all user chats)
router.get('/messages', async (req, res) => {
    const rooms = await Message.distinct('room');
    const chats = await Promise.all(
        rooms.map(async (room) => {
            const last = await Message.findOne({ room }).sort('-createdAt');
            const unread = await Message.countDocuments({ room, isAdminReply: false, isRead: false });
            return { room, lastMessage: last, unread };
        })
    );
    res.json(chats);
});

// POST /api/admin/messages/reply
router.post('/messages/reply', async (req, res) => {
    const { room, message } = req.body;
    const msg = await Message.create({
        senderId: req.user._id,
        message,
        isAdminReply: true,
        room,
    });
    await Message.updateMany({ room, isAdminReply: false }, { isRead: true });

    req.io?.to(room).emit('receive_message', {
        room, message: msg.message, isAdminReply: true, createdAt: msg.createdAt,
    });

    res.status(201).json(msg);
});

// Services CRUD (admin)
router.post('/services', async (req, res) => {
    const service = await Service.create(req.body);
    res.status(201).json(service);
});

router.put('/services/:id', async (req, res) => {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(service);
});

router.delete('/services/:id', async (req, res) => {
    await Service.findByIdAndDelete(req.params.id);
    res.json({ message: 'Service deleted' });
});

module.exports = router;

const express = require('express');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { protect } = require('../middleware/auth');

const router = express.Router();

const signToken = (id) =>
    jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE || '7d' });

// ── Register ──────────────────────────────────────────────────────────────────
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
        return res.status(400).json({ error: 'All fields are required' });

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ error: 'Email already registered' });

    const user = await User.create({ name, email, password });

    // Send verification email (non-blocking — don't fail registration if email fails)
    try {
        const { sendEmail, verifyEmailTemplate } = require('../utils/email');
        const token = crypto.randomBytes(32).toString('hex');

        await User.findByIdAndUpdate(user._id, {
            emailVerifyToken: token,
            emailVerifyExpire: Date.now() + 24 * 60 * 60 * 1000,
        });

        const link = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;
        await sendEmail(user.email, 'Verify your DigiPratham email', verifyEmailTemplate(user.name, link));
    } catch (err) {
        console.warn('[Email] Could not send verification email:', err.message);
    }

    const jwtToken = signToken(user._id);
    res.status(201).json({
        token: jwtToken,
        user: { id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin, selectedServices: user.selectedServices },
    });
});

// ── Login ─────────────────────────────────────────────────────────────────────
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password)
        return res.status(400).json({ error: 'Email and password are required' });

    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.comparePassword(password)))
        return res.status(401).json({ error: 'Invalid credentials' });

    const token = signToken(user._id);
    res.json({
        token,
        user: { id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin, selectedServices: user.selectedServices },
    });
});

// ── Me ────────────────────────────────────────────────────────────────────────
router.get('/me', protect, async (req, res) => {
    res.json({
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        isAdmin: req.user.isAdmin,
        isVerified: req.user.isVerified,
        selectedServices: req.user.selectedServices,
        createdAt: req.user.createdAt,
    });
});

// ── Email Verification ────────────────────────────────────────────────────────

// POST /api/auth/send-verify-email  (resend)
router.post('/send-verify-email', protect, async (req, res) => {
    const { sendEmail, verifyEmailTemplate } = require('../utils/email');
    const user = await User.findById(req.user._id).select('+emailVerifyToken +emailVerifyExpire');
    if (!user) return res.status(404).json({ error: 'User not found' });
    if (user.isVerified) return res.status(400).json({ error: 'Email already verified' });

    const token = crypto.randomBytes(32).toString('hex');
    user.emailVerifyToken = token;
    user.emailVerifyExpire = Date.now() + 24 * 60 * 60 * 1000;
    await user.save();

    const link = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;
    await sendEmail(user.email, 'Verify your DigiPratham email', verifyEmailTemplate(user.name, link));
    res.json({ message: 'Verification email sent. Please check your inbox.' });
});

// GET /api/auth/verify-email/:token
router.get('/verify-email/:token', async (req, res) => {
    const user = await User.findOne({
        emailVerifyToken: req.params.token,
        emailVerifyExpire: { $gt: Date.now() },
    }).select('+emailVerifyToken +emailVerifyExpire');

    if (!user) return res.status(400).json({ error: 'Invalid or expired verification link' });

    user.isVerified = true;
    user.emailVerifyToken = undefined;
    user.emailVerifyExpire = undefined;
    await user.save();
    res.json({ message: 'Email verified successfully! You can now log in.' });
});

// ── Password Reset ────────────────────────────────────────────────────────────

// POST /api/auth/forgot-password
router.post('/forgot-password', async (req, res) => {
    const { sendEmail, resetPasswordTemplate } = require('../utils/email');
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email is required' });

    const user = await User.findOne({ email }).select('+resetPasswordToken +resetPasswordExpire');
    // Always respond OK to prevent email enumeration attacks
    if (!user) return res.json({ message: 'If that email exists, a reset link has been sent.' });

    const token = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpire = Date.now() + 60 * 60 * 1000; // 1 hour
    await user.save();

    const link = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
    await sendEmail(user.email, 'Reset your DigiPratham password', resetPasswordTemplate(user.name, link));
    res.json({ message: 'If that email exists, a reset link has been sent.' });
});

// POST /api/auth/reset-password/:token
router.post('/reset-password/:token', async (req, res) => {
    const { password } = req.body;
    if (!password || password.length < 6)
        return res.status(400).json({ error: 'Password must be at least 6 characters' });

    const user = await User.findOne({
        resetPasswordToken: req.params.token,
        resetPasswordExpire: { $gt: Date.now() },
    }).select('+password +resetPasswordToken +resetPasswordExpire');

    if (!user) return res.status(400).json({ error: 'Invalid or expired reset link' });

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    res.json({ message: 'Password reset successfully. You can now log in.' });
});

module.exports = router;

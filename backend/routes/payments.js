const express = require('express');
const crypto = require('crypto');
const Internship = require('../models/Internship');
const Payment = require('../models/Payment');
const Application = require('../models/Application');
const User = require('../models/User');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Lazy-initialize Razorpay per-request so that env vars set in Render dashboard
// take effect immediately after a redeploy without needing a code push.
function getRazorpay() {
    const Razorpay = require('razorpay');
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
        throw new Error('Razorpay keys not configured. Please set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in Render environment variables.');
    }
    return new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
}

// POST /api/payments/create-order
router.post('/create-order', protect, async (req, res) => {
    try {
        const { internshipId } = req.body;
        const internship = await Internship.findById(internshipId);
        if (!internship) return res.status(404).json({ error: 'Internship not found' });

        // Fresh DB fetch to get the latest isTestUser flag
        const user = await User.findById(req.user._id);
        const isTestUser = !!(user?.isTestUser);

        // Test user gets ₹2 (200 paise) for real Razorpay testing
        const chargeAmount = isTestUser ? 2 : internship.price;

        const razorpay = getRazorpay();

        const options = {
            amount: chargeAmount * 100, // paise
            currency: 'INR',
            receipt: `rcpt_${req.user._id.toString().slice(-6)}_${Date.now()}`,
            notes: {
                internshipId: internshipId.toString(),
                userId: req.user._id.toString(),
                isTestUser: String(isTestUser),
            },
        };

        const order = await razorpay.orders.create(options);

        // Save pending payment record
        const payment = await Payment.create({
            userId: req.user._id,
            internshipId: internship._id,
            amount: chargeAmount,
            orderId: order.id,
            status: 'created',
        });

        await User.findByIdAndUpdate(req.user._id, { $push: { paymentIds: payment._id } });

        res.json({
            orderId: order.id,
            amount: options.amount,
            currency: 'INR',
            keyId: process.env.RAZORPAY_KEY_ID,
            paymentDbId: payment._id,
            isTestUser,
            displayAmount: chargeAmount, // frontend uses this to show correct price
        });
    } catch (err) {
        console.error('[Payments] create-order error:', err.message);
        const msg = err.message.includes('Razorpay keys not configured')
            ? err.message
            : 'Could not create payment order. Please try again.';
        res.status(500).json({ error: msg });
    }
});

// POST /api/payments/verify
router.post('/verify', protect, async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, internshipId } = req.body;

        const expectedSig = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest('hex');

        if (expectedSig !== razorpay_signature)
            return res.status(400).json({ error: 'Payment verification failed – invalid signature' });

        // Update payment record
        await Payment.findOneAndUpdate(
            { orderId: razorpay_order_id },
            { paymentId: razorpay_payment_id, signature: razorpay_signature, status: 'paid' }
        );

        const payment = await Payment.findOne({ orderId: razorpay_order_id });

        // Create application
        const application = await Application.create({
            userId: req.user._id,
            internshipId: internshipId,
            paymentId: payment._id,
            status: 'active',
        });

        await User.findByIdAndUpdate(req.user._id, {
            $push: { applicationIds: application._id },
        });

        res.json({
            message: 'Payment successful! Application submitted.',
            applicationId: application._id,
        });
    } catch (err) {
        console.error('[Payments] verify error:', err.message);
        res.status(500).json({ error: 'Payment verification error.' });
    }
});

// GET /api/payments/my
router.get('/my', protect, async (req, res) => {
    const payments = await Payment.find({ userId: req.user._id })
        .populate('internshipId', 'title duration')
        .sort('-createdAt');
    res.json(payments);
});

// GET /api/payments/user-info  — used by frontend to get server-side isTestUser
// (avoids depending on stale localStorage data)
router.get('/user-info', protect, async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('isTestUser');
        res.json({ isTestUser: !!(user?.isTestUser) });
    } catch (err) {
        res.status(500).json({ isTestUser: false });
    }
});

// GET /api/payments/offer-letter/:applicationId
router.get('/offer-letter/:applicationId', protect, async (req, res) => {
    try {
        const application = await Application.findById(req.params.applicationId)
            .populate('internshipId', 'title duration price')
            .populate('paymentId', 'amount paymentId createdAt status');

        if (!application) return res.status(404).json({ error: 'Application not found' });
        if (application.userId.toString() !== req.user._id.toString())
            return res.status(403).json({ error: 'Not authorised to view this offer letter' });
        if (application.paymentId?.status !== 'paid')
            return res.status(400).json({ error: 'Payment not confirmed for this application' });

        if (!application.offerLetterIssuedAt) {
            application.offerLetterIssuedAt = new Date();
            await application.save();
        }

        const internship = application.internshipId;
        const payment = application.paymentId;

        res.json({
            studentName: req.user.name,
            studentEmail: req.user.email,
            internshipTitle: internship?.title || 'Internship Program',
            domain: req.user.selectedDomain || internship?.domain || internship?.title?.replace(/\d+\s*Month.*$/i, '').trim() || 'Technology',
            duration: internship?.duration || '1 Month',
            amount: payment?.amount || internship?.price,
            paymentId: payment?.paymentId || 'N/A',
            issuedAt: application.offerLetterIssuedAt,
            applicationId: application._id,
            certification: internship?.duration?.includes('2')
                ? 'DigiPratham Certificate of Excellence'
                : 'DigiPratham Certificate of Completion',
        });
    } catch (err) {
        console.error('[Payments] offer-letter error:', err.message);
        res.status(500).json({ error: 'Could not fetch offer letter data.' });
    }
});

module.exports = router;

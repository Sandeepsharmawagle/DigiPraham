const express = require('express');
const Application = require('../models/Application');
const Payment = require('../models/Payment');
const User = require('../models/User');
const Service = require('../models/Service');
const { protect } = require('../middleware/auth');

const router = express.Router();

// GET /api/dashboard/summary
router.get('/summary', protect, async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');

    const [applications, payments] = await Promise.all([
        Application.find({ userId: req.user._id })
            .populate('internshipId', 'title duration')
            .sort('-createdAt'),
        Payment.find({ userId: req.user._id })
            .populate('internshipId', 'title')
            .sort('-createdAt'),
    ]);

    // Resolve service details for selected services
    const services = await Service.find({ slug: { $in: user.selectedServices } });

    res.json({
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
        },
        selectedServices: services,
        applications,
        payments,
    });
});

// DELETE /api/dashboard/services/:slug – remove service from profile
router.delete('/services/:slug', protect, async (req, res) => {
    await User.findByIdAndUpdate(req.user._id, {
        $pull: { selectedServices: req.params.slug },
    });
    res.json({ message: 'Service removed from your profile' });
});

module.exports = router;

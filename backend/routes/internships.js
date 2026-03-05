const express = require('express');
const Internship = require('../models/Internship');
const Application = require('../models/Application');
const User = require('../models/User');
const { protect } = require('../middleware/auth');

const router = express.Router();

const SEED = [
    {
        title: '1 Month Internship',
        duration: '1 Month',
        price: 499,
        description: 'A focused, intensive internship covering core fundamentals of your chosen domain with real-world hands-on projects and mentorship from industry professionals.',
        skills: ['Domain fundamentals', 'Problem solving', 'Real-world project experience', 'Team collaboration', 'Industry tools & practices'],
        certification: 'DigiPratham Certificate of Completion',
        isActive: true,
    },
    {
        title: '2 Month Internship',
        duration: '2 Months',
        price: 599,
        description: 'An in-depth internship featuring advanced topics, a capstone project, and detailed code review from our expert team. Build a portfolio-worthy project.',
        skills: ['Advanced domain skills', 'Capstone project', 'Industry best practices', 'Presentation & communication', 'Portfolio building', 'Code review process'],
        certification: 'DigiPratham Certificate of Excellence',
        isActive: true,
    },
];

(async () => {
    try {
        const count = await Internship.countDocuments();
        if (count === 0) await Internship.insertMany(SEED);
    } catch { /* DB not ready yet */ }
})();

// GET /api/internships
router.get('/', async (_req, res) => {
    const internships = await Internship.find({ isActive: true });
    res.json(internships);
});

// GET /api/internships/:id
router.get('/:id', async (req, res) => {
    const internship = await Internship.findById(req.params.id);
    if (!internship) return res.status(404).json({ error: 'Internship not found' });
    res.json(internship);
});

// GET /api/internships/my/applications  (auth required)
router.get('/my/applications', protect, async (req, res) => {
    const apps = await Application.find({ userId: req.user._id })
        .populate('internshipId', 'title duration price')
        .populate('paymentId', 'amount status createdAt')
        .sort('-createdAt');
    res.json(apps);
});

module.exports = router;

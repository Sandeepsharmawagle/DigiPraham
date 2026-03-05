const express = require('express');
const Service = require('../models/Service');
const User = require('../models/User');
const { protect, adminOnly } = require('../middleware/auth');

const router = express.Router();

// Seed data for 4 DigiPratham services
const SEED = [
    {
        title: 'AI & Machine Learning', slug: 'ai-ml', icon: '🤖',
        tagline: 'Intelligent solutions powered by cutting-edge AI',
        overview: 'We build end-to-end AI and Machine Learning systems — from data pipelines and model training to deployment and monitoring.',
        features: ['Custom ML model development', 'Natural Language Processing (NLP)', 'Computer Vision solutions', 'Predictive analytics', 'AI system integration', 'Model optimization & deployment'],
        technologies: ['Python', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'OpenCV', 'Hugging Face', 'LangChain', 'FastAPI'],
        pricing: {
            starter: { label: 'Starter', price: '₹15,000', desc: 'Basic ML model development' },
            growth: { label: 'Growth', price: '₹35,000', desc: 'Full pipeline + deployment' },
            enterprise: { label: 'Enterprise', price: 'Custom', desc: 'End-to-end AI solution' },
        },
    },
    {
        title: 'Data Analytics', slug: 'data-analytics', icon: '📊',
        tagline: 'Transform raw data into actionable business insights',
        overview: 'Our analytics team helps you collect, clean, visualize, and interpret data to drive smarter decisions and competitive advantage.',
        features: ['Business intelligence dashboards', 'Data pipeline design & ETL', 'Statistical analysis & reporting', 'Real-time data monitoring', 'Data warehousing', 'Customer behaviour analytics'],
        technologies: ['Python', 'Pandas', 'Power BI', 'Tableau', 'Apache Spark', 'PostgreSQL', 'MongoDB', 'dbt'],
        pricing: {
            starter: { label: 'Starter', price: '₹10,000', desc: 'Dashboard + basic reporting' },
            growth: { label: 'Growth', price: '₹25,000', desc: 'Full ETL + BI dashboards' },
            enterprise: { label: 'Enterprise', price: 'Custom', desc: 'Enterprise data platform' },
        },
    },
    {
        title: 'Web Development', slug: 'web-development', icon: '🌐',
        tagline: 'Modern, fast, and scalable web applications',
        overview: 'We design and develop high-performance web applications — from landing pages to full-stack SaaS products using cutting-edge frameworks.',
        features: ['Responsive UI/UX design', 'Full-stack web development', 'RESTful & GraphQL APIs', 'CMS integration', 'SEO optimization', 'Performance & security auditing'],
        technologies: ['React.js', 'Next.js', 'Node.js', 'Express.js', 'MongoDB', 'PostgreSQL', 'Tailwind CSS', 'Docker'],
        pricing: {
            starter: { label: 'Starter', price: '₹8,000', desc: 'Landing page / portfolio' },
            growth: { label: 'Growth', price: '₹25,000', desc: 'Full-stack web application' },
            enterprise: { label: 'Enterprise', price: 'Custom', desc: 'SaaS / enterprise platform' },
        },
    },
    {
        title: 'App Development', slug: 'app-development', icon: '📱',
        tagline: 'Native & cross-platform mobile apps users love',
        overview: 'We build beautiful, performant cross-platform and native mobile applications for iOS and Android from MVP to production.',
        features: ['Cross-platform apps (React Native/Flutter)', 'Native iOS & Android', 'App Store & Play Store deployment', 'Push notifications & offline support', 'Payment integration', 'Backend API integration'],
        technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase', 'Node.js', 'MongoDB', 'Expo'],
        pricing: {
            starter: { label: 'Starter', price: '₹20,000', desc: 'MVP cross-platform app' },
            growth: { label: 'Growth', price: '₹50,000', desc: 'Full-featured app' },
            enterprise: { label: 'Enterprise', price: 'Custom', desc: 'Enterprise mobile solution' },
        },
    },
];

// Auto-seed on startup
(async () => {
    try {
        const count = await Service.countDocuments();
        if (count === 0) await Service.insertMany(SEED);
    } catch { /* DB not ready yet */ }
})();

// GET /api/services
router.get('/', async (_req, res) => {
    const services = await Service.find({ isActive: true });
    res.json(services);
});

// GET /api/services/:slug
router.get('/:slug', async (req, res) => {
    const service = await Service.findOne({ slug: req.params.slug });
    if (!service) return res.status(404).json({ error: 'Service not found' });
    res.json(service);
});

// POST /api/services/inquire  (public)
router.post('/inquire', async (req, res) => {
    const { name, email, phone, message, serviceSlug } = req.body;
    if (!name || !email || !message)
        return res.status(400).json({ error: 'Name, email, and message are required' });
    // Store in a generic collection
    await Service.db.collection('inquiries').insertOne({
        name, email, phone, message, serviceSlug, createdAt: new Date(),
    });
    res.status(201).json({ message: 'Inquiry received! We will contact you shortly.' });
});

// POST /api/services/select/:slug  (auth required)
router.post('/select/:slug', protect, async (req, res) => {
    const service = await Service.findOne({ slug: req.params.slug });
    if (!service) return res.status(404).json({ error: 'Service not found' });

    await User.findByIdAndUpdate(req.user._id, {
        $addToSet: { selectedServices: req.params.slug },
    });
    res.json({ message: `${service.title} added to your profile` });
});

// Admin: create service
router.post('/', protect, adminOnly, async (req, res) => {
    const service = await Service.create(req.body);
    res.status(201).json(service);
});

// Admin: update service
router.put('/:id', protect, adminOnly, async (req, res) => {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(service);
});

module.exports = router;

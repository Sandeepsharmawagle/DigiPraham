'use client';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Link from 'next/link';

const servicesData = {
    'ai-ml': {
        icon: '🤖', title: 'AI & Machine Learning', color: '#6C63FF',
        tagline: 'Intelligent solutions powered by cutting-edge AI',
        overview: 'We build end-to-end AI and Machine Learning systems tailored to your business needs — from data pipelines and model training to deployment and monitoring. Our team of AI engineers has delivered solutions across healthcare, finance, retail, and manufacturing.',
        features: [
            { icon: '🧠', title: 'Custom ML Models', desc: 'Bespoke models trained on your data for maximum accuracy' },
            { icon: '💬', title: 'Natural Language Processing', desc: 'Chatbots, sentiment analysis, text classification' },
            { icon: '👁️', title: 'Computer Vision', desc: 'Image recognition, object detection, video analysis' },
            { icon: '📈', title: 'Predictive Analytics', desc: 'Forecast trends and make data-driven decisions' },
            { icon: '🔗', title: 'AI Integration', desc: 'Embed AI into your existing systems and workflows' },
            { icon: '⚡', title: 'Model Optimization', desc: 'Deploy faster, lighter models to production' },
        ],
        technologies: ['Python', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'OpenCV', 'Hugging Face', 'LangChain', 'FastAPI', 'Docker', 'AWS SageMaker'],
        pricing: {
            starter: { label: 'Starter', price: '₹15,000', desc: 'For small businesses needing a single ML model', features: ['1 custom model', '2-week delivery', 'API endpoint', '1 month support'] },
            growth: { label: 'Growth', price: '₹35,000', desc: 'Full data pipeline with model deployment', features: ['Multiple models', 'ETL pipeline', 'Dashboard', '3 months support', 'CI/CD setup'] },
            enterprise: { label: 'Enterprise', price: 'Custom', desc: 'End-to-end AI solution for large organizations', features: ['Unlimited models', 'Custom MLOps', 'Dedicated engineer', '24/7 support', 'SLA guarantee'] },
        },
    },
    'data-analytics': {
        icon: '📊', title: 'Data Analytics', color: '#FF6584',
        tagline: 'Transform raw data into actionable business insights',
        overview: 'Our data analytics team helps you collect, clean, visualize, and interpret data to drive smarter decisions. From real-time dashboards to complex statistical analyses, we turn your data into your biggest business asset.',
        features: [
            { icon: '📱', title: 'BI Dashboards', desc: 'Interactive real-time dashboards in Power BI or Tableau' },
            { icon: '🔄', title: 'ETL Pipelines', desc: 'Automated data extraction, transformation, and loading' },
            { icon: '📉', title: 'Statistical Analysis', desc: 'In-depth statistical models and hypothesis testing' },
            { icon: '🔔', title: 'Real-time Monitoring', desc: 'Alerting and monitoring systems for key KPIs' },
            { icon: '🗄️', title: 'Data Warehousing', desc: 'Scalable cloud data warehouses (Snowflake, BigQuery)' },
            { icon: '👥', title: 'Customer Analytics', desc: 'Understand behaviour, churn, and lifetime value' },
        ],
        technologies: ['Python', 'Pandas', 'NumPy', 'Power BI', 'Tableau', 'Apache Spark', 'PostgreSQL', 'MongoDB', 'dbt', 'Snowflake'],
        pricing: {
            starter: { label: 'Starter', price: '₹10,000', desc: 'Dashboard + basic reporting setup', features: ['1 dashboard', 'Basic KPIs', 'PDF reports', '1 month support'] },
            growth: { label: 'Growth', price: '₹25,000', desc: 'Full ETL pipeline + BI dashboards', features: ['3 dashboards', 'ETL automation', 'Scheduled reports', '3 months support'] },
            enterprise: { label: 'Enterprise', price: 'Custom', desc: 'Enterprise-grade data platform', features: ['Unlimited dashboards', 'Data warehouse', 'Custom models', 'Dedicated team'] },
        },
    },
    'web-development': {
        icon: '🌐', title: 'Web Development', color: '#43E97B',
        tagline: 'Modern, fast, and scalable web applications',
        overview: 'We design and develop high-performance web applications using the latest frameworks and best practices — from landing pages and portfolios to full-stack SaaS products. Every site we build is responsive, SEO-optimized, and built to scale.',
        features: [
            { icon: '🎨', title: 'UI/UX Design', desc: 'Pixel-perfect, responsive designs users love' },
            { icon: '⚙️', title: 'Full-Stack Dev', desc: 'Frontend + backend + database, all handled' },
            { icon: '🔌', title: 'API Development', desc: 'RESTful and GraphQL APIs built for scale' },
            { icon: '📝', title: 'CMS Integration', desc: 'WordPress, Strapi, Contentful setup' },
            { icon: '🔍', title: 'SEO Optimization', desc: 'Technical and on-page SEO built in from day one' },
            { icon: '🛡️', title: 'Security Audit', desc: 'OWASP hardening and performance auditing' },
        ],
        technologies: ['React.js', 'Next.js', 'Node.js', 'Express.js', 'Python FastAPI', 'MongoDB', 'PostgreSQL', 'Tailwind CSS', 'Docker', 'Vercel/Nginx'],
        pricing: {
            starter: { label: 'Starter', price: '₹8,000', desc: 'Landing page or portfolio site', features: ['Up to 5 pages', 'Mobile responsive', 'CMS', '1 month support'] },
            growth: { label: 'Growth', price: '₹25,000', desc: 'Full-stack web application', features: ['Unlimited pages', 'User auth', 'Database', 'API', '3 months support'] },
            enterprise: { label: 'Enterprise', price: 'Custom', desc: 'SaaS / enterprise platform', features: ['Custom features', 'Microservices', 'DevOps', 'SLA'] },
        },
    },
    'app-development': {
        icon: '📱', title: 'App Development', color: '#FFB347',
        tagline: 'Native & cross-platform mobile apps users love',
        overview: 'We build beautiful, performant native and cross-platform mobile applications for iOS and Android. From MVP to production-ready products, we handle design, development, testing, and App Store deployment.',
        features: [
            { icon: '📲', title: 'Cross-Platform', desc: 'One codebase for iOS and Android (React Native / Flutter)' },
            { icon: '🍎', title: 'Native iOS', desc: 'Swift-based native apps for maximum performance' },
            { icon: '🤖', title: 'Native Android', desc: 'Kotlin-based native Android apps' },
            { icon: '🔔', title: 'Push Notifications', desc: 'Engage users with targeted push notifications' },
            { icon: '💳', title: 'Payment Integration', desc: 'In-app purchases and payment gateways' },
            { icon: '🚀', title: 'App Store Launch', desc: 'End-to-end App Store and Play Store deployment' },
        ],
        technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase', 'Node.js', 'MongoDB', 'Expo', 'Fastlane', 'TestFlight'],
        pricing: {
            starter: { label: 'Starter', price: '₹20,000', desc: 'MVP cross-platform app (iOS + Android)', features: ['Core features', 'Basic auth', 'API integration', '1 month support'] },
            growth: { label: 'Growth', price: '₹50,000', desc: 'Full-featured production app', features: ['All features', 'Payment', 'Notifications', 'Admin panel', '3 months support'] },
            enterprise: { label: 'Enterprise', price: 'Custom', desc: 'Enterprise mobile solution', features: ['Custom architecture', 'Offline mode', 'Analytics', 'Dedicated team'] },
        },
    },
};

export default function ServiceDetailPage() {
    const { slug } = useParams();
    const [inquiryData, setInquiryData] = useState({ name: '', email: '', phone: '', message: '' });
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const service = servicesData[slug];
    if (!service) return (
        <>
            <Navbar />
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem' }}>
                <h2 style={{ color: '#E8E9FF', fontSize: '2rem' }}>Service not found</h2>
                <Link href="/services" className="btn-primary">Browse All Services</Link>
            </div>
            <Footer />
        </>
    );

    const handleInquiry = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const { submitInquiry } = await import('../../lib/api');
            await submitInquiry({ ...inquiryData, serviceSlug: slug });
            setSubmitted(true);
        } catch {
            alert('Something went wrong. Please try again.');
        }
        setSubmitting(false);
    };

    return (
        <>
            <Navbar />
            <main>
                {/* ── Hero ─────────────────────────────────────────────── */}
                <section className="hero-bg" style={{ paddingTop: 100, paddingBottom: '4rem' }}>
                    <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                        <Link href="/services" style={{ color: '#9495B8', textDecoration: 'none', fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center', gap: '0.35rem', marginBottom: '1.5rem' }}>
                            ← Back to Services
                        </Link>
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '2rem', flexWrap: 'wrap' }}>
                            <div style={{ width: 80, height: 80, borderRadius: 20, background: `${service.color}18`, border: `2px solid ${service.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', flexShrink: 0 }}>
                                {service.icon}
                            </div>
                            <div>
                                <div className="badge" style={{ marginBottom: '0.75rem' }}>{service.title}</div>
                                <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, marginBottom: '0.75rem' }}>
                                    <span className="gradient-text">{service.title}</span>
                                </h1>
                                <p style={{ color: '#9495B8', fontSize: '1.1rem', maxWidth: 600 }}>{service.tagline}</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── Overview ─────────────────────────────────────────── */}
                <section className="section" style={{ paddingTop: '3rem' }}>
                    <div className="container">
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem' }}>
                            {/* Left: Overview + Features */}
                            <div>
                                <h2 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '1rem' }}>Service Overview</h2>
                                <p style={{ color: '#9495B8', lineHeight: 1.8, marginBottom: '2.5rem' }}>{service.overview}</p>

                                <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.25rem' }}>Features & Benefits</h3>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                                    {service.features.map(f => (
                                        <div key={f.title} className="glass-card" style={{ padding: '1.25rem' }}>
                                            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{f.icon}</div>
                                            <h4 style={{ fontWeight: 600, color: '#E8E9FF', marginBottom: '0.35rem', fontSize: '0.95rem' }}>{f.title}</h4>
                                            <p style={{ color: '#9495B8', fontSize: '0.825rem', lineHeight: 1.6 }}>{f.desc}</p>
                                        </div>
                                    ))}
                                </div>

                                {/* Technologies */}
                                <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem', marginTop: '2.5rem' }}>Technologies Used</h3>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                    {service.technologies.map(t => (
                                        <span key={t} style={{ background: `${service.color}15`, border: `1px solid ${service.color}35`, borderRadius: 8, padding: '0.35rem 0.85rem', fontSize: '0.825rem', color: service.color, fontWeight: 500 }}>{t}</span>
                                    ))}
                                </div>
                            </div>

                            {/* Right: Pricing */}
                            <div>
                                <h2 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '1.5rem' }}>Pricing</h2>
                                <div style={{ display: 'grid', gap: '1rem', marginBottom: '2rem' }}>
                                    {Object.entries(service.pricing).map(([key, plan]) => (
                                        <div key={key} className="glass-card" style={{ padding: '1.5rem', border: key === 'growth' ? `2px solid ${service.color}60` : '1px solid rgba(108,99,255,0.2)' }}>
                                            {key === 'growth' && <div className="badge" style={{ marginBottom: '0.75rem', background: `${service.color}20`, color: service.color, borderColor: `${service.color}40` }}>Most Popular</div>}
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                                                <h4 style={{ fontWeight: 700, color: '#E8E9FF', fontSize: '1.1rem' }}>{plan.label}</h4>
                                                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: key === 'enterprise' ? '#E8E9FF' : service.color, fontFamily: 'Space Grotesk' }}>{plan.price}</div>
                                            </div>
                                            <p style={{ color: '#9495B8', fontSize: '0.875rem', marginBottom: '0.75rem' }}>{plan.desc}</p>
                                            <div style={{ marginTop: '0.75rem', display: 'grid', gap: '0.3rem' }}>
                                                {plan.features.map(f => (
                                                    <div key={f} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', fontSize: '0.825rem', color: '#9495B8' }}>
                                                        <span style={{ color: service.color }}>✓</span> {f}
                                                    </div>
                                                ))}
                                            </div>
                                            <a href="#inquire" className="btn-primary" style={{ marginTop: '1.25rem', display: 'block', textAlign: 'center', background: key === 'enterprise' ? 'linear-gradient(135deg,#FF6584,#ff8fa3)' : undefined }}>
                                                {key === 'enterprise' ? 'Get Custom Quote' : 'Apply Now'}
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── Inquiry Form ──────────────────────────────────────── */}
                <section id="inquire" style={{ padding: '5rem 1.5rem', background: 'rgba(108,99,255,0.04)' }}>
                    <div className="container" style={{ maxWidth: 680 }}>
                        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                            <div className="badge" style={{ marginBottom: '1rem' }}>Apply / Inquire</div>
                            <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.25rem)', fontWeight: 700, marginBottom: '0.75rem' }}>
                                Interested in <span className="gradient-text">{service.title}?</span>
                            </h2>
                            <p style={{ color: '#9495B8' }}>Fill out the form below and our team will get back to you within 24 hours.</p>
                        </div>

                        {submitted ? (
                            <div className="glass-card" style={{ padding: '3rem', textAlign: 'center' }}>
                                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.75rem', color: '#43E97B' }}>Inquiry Received!</h3>
                                <p style={{ color: '#9495B8' }}>We'll contact you at <strong style={{ color: '#E8E9FF' }}>{inquiryData.email}</strong> within 24 hours.</p>
                                <button onClick={() => setSubmitted(false)} className="btn-outline" style={{ marginTop: '1.5rem' }}>Submit Another</button>
                            </div>
                        ) : (
                            <form onSubmit={handleInquiry} className="glass-card" style={{ padding: '2.5rem' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', marginBottom: '1.25rem' }}>
                                    <div>
                                        <label style={{ display: 'block', color: '#9495B8', fontSize: '0.85rem', marginBottom: '0.4rem', fontWeight: 500 }}>Full Name *</label>
                                        <input className="input-field" placeholder="John Doe" required value={inquiryData.name} onChange={e => setInquiryData({ ...inquiryData, name: e.target.value })} />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', color: '#9495B8', fontSize: '0.85rem', marginBottom: '0.4rem', fontWeight: 500 }}>Email Address *</label>
                                        <input className="input-field" type="email" placeholder="you@example.com" required value={inquiryData.email} onChange={e => setInquiryData({ ...inquiryData, email: e.target.value })} />
                                    </div>
                                </div>
                                <div style={{ marginBottom: '1.25rem' }}>
                                    <label style={{ display: 'block', color: '#9495B8', fontSize: '0.85rem', marginBottom: '0.4rem', fontWeight: 500 }}>Phone Number</label>
                                    <input className="input-field" placeholder="+91 98765 43210" value={inquiryData.phone} onChange={e => setInquiryData({ ...inquiryData, phone: e.target.value })} />
                                </div>
                                <div style={{ marginBottom: '2rem' }}>
                                    <label style={{ display: 'block', color: '#9495B8', fontSize: '0.85rem', marginBottom: '0.4rem', fontWeight: 500 }}>Message / Requirements *</label>
                                    <textarea className="input-field" rows={5} placeholder={`Tell us about your ${service.title} requirements...`} required value={inquiryData.message} onChange={e => setInquiryData({ ...inquiryData, message: e.target.value })} style={{ resize: 'vertical' }} />
                                </div>
                                <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '0.875rem', fontSize: '1rem' }} disabled={submitting}>
                                    {submitting ? 'Sending...' : `Send Inquiry for ${service.title}`}
                                </button>
                            </form>
                        )}
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}

'use client';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const internships = [
    {
        id: '1m', title: '1 Month Internship', duration: '1 Month', price: 499, badge: '🔥 Popular',
        description: 'A fast-paced, intensive internship covering real-world project experience with hands-on work and mentorship.',
        skills: ['Domain fundamentals', 'Problem solving', 'Team collaboration', 'Real project experience', 'Industry tools'],
        certification: 'DigiPratham Certificate of Completion',
        color: '#6C63FF',
    },
    {
        id: '2m', title: '2 Month Internship', duration: '2 Months', price: 599, badge: '⭐ Best Value',
        description: 'An in-depth program with advanced topics, a capstone project, portfolio review, and expert feedback.',
        skills: ['Advanced domain skills', 'Capstone project', 'Industry best practices', 'Presentation skills', 'Portfolio building', 'Code review process'],
        certification: 'DigiPratham Certificate of Excellence',
        color: '#FF6584',
    },
];

export default function CareersPage() {
    const handleApply = async (intern) => {
        const user = typeof window !== 'undefined' ? localStorage.getItem('dp_user') : null;
        if (!user) { window.location.href = '/register'; return; }
        try {
            const { createOrder } = await import('../lib/api');
            const { data } = await createOrder({ internshipId: intern.id });
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            document.body.appendChild(script);
            script.onload = () => {
                const options = {
                    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                    amount: data.amount, currency: 'INR',
                    name: 'DigiPratham', description: intern.title, order_id: data.orderId,
                    handler: async (response) => {
                        const { verifyPayment } = await import('../lib/api');
                        await verifyPayment({ ...response, internshipId: intern.id });
                        alert('🎉 Payment successful! Application submitted.');
                        window.location.href = '/dashboard';
                    },
                    theme: { color: '#6C63FF' },
                };
                new window.Razorpay(options).open();
            };
        } catch { alert('Something went wrong. Please login and try again.'); }
    };

    return (
        <>
            <Navbar />
            <main>
                {/* Hero */}
                <section className="hero-bg" style={{ paddingTop: 120, paddingBottom: '5rem', textAlign: 'center' }}>
                    <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                        <div className="badge animate-fade-up" style={{ marginBottom: '1.25rem' }}>🎓 Internships</div>
                        <h1 className="animate-fade-up delay-100" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.75rem)', fontWeight: 800, marginBottom: '1.25rem', color: 'var(--text-main)' }}>
                            Launch Your <span className="gradient-text">Tech Career</span>
                        </h1>
                        <p className="animate-fade-up delay-200" style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: 600, margin: '0 auto' }}>
                            Gain real-world experience, build your portfolio, and earn a certification — starting at just ₹499.
                        </p>
                    </div>
                </section>

                {/* Plans */}
                <section className="section" style={{ paddingTop: '3rem' }}>
                    <div className="container">
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', maxWidth: 900, margin: '0 auto' }}>
                            {internships.map(intern => (
                                <div key={intern.id} className="glass-card animate-fade-up" style={{ padding: '2.5rem', border: `2px solid ${intern.color}35` }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                                        <div>
                                            <div className="badge" style={{ background: `${intern.color}18`, color: intern.color, borderColor: `${intern.color}40`, marginBottom: '0.75rem' }}>{intern.badge}</div>
                                            <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-main)' }}>{intern.title}</h3>
                                            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.25rem' }}>Duration: {intern.duration}</p>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <div style={{ fontSize: '2rem', fontWeight: 800, color: intern.color, fontFamily: 'Space Grotesk' }}>₹{intern.price}</div>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>one time</div>
                                        </div>
                                    </div>

                                    <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '1.5rem', fontSize: '0.925rem' }}>{intern.description}</p>

                                    <h4 style={{ fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.75rem', fontSize: '0.95rem' }}>Skills Covered</h4>
                                    <div style={{ marginBottom: '1.5rem' }}>
                                        {intern.skills.map(s => (
                                            <div key={s} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.4rem' }}>
                                                <span style={{ color: intern.color, fontWeight: 700, fontSize: '0.85rem' }}>✓</span>
                                                <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{s}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div style={{ background: 'var(--input-bg)', borderRadius: 10, border: '1px solid var(--border)', padding: '1rem', display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '1.75rem' }}>
                                        <span style={{ fontSize: '1.5rem' }}>🏆</span>
                                        <div>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>Certification</div>
                                            <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-main)' }}>{intern.certification}</div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => handleApply(intern)}
                                        className="btn-primary"
                                        style={{ width: '100%', justifyContent: 'center', padding: '0.875rem', fontSize: '1rem', background: `linear-gradient(135deg, ${intern.color}, ${intern.color}cc)` }}
                                    >
                                        Apply Now – ₹{intern.price}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Process */}
                <section style={{ padding: '5rem 1.5rem', background: 'var(--input-bg)' }}>
                    <div className="container" style={{ textAlign: 'center' }}>
                        <div className="badge" style={{ marginBottom: '1rem' }}>How it works</div>
                        <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '3rem', color: 'var(--text-main)' }}>3 Simple <span className="gradient-text">Steps</span></h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', maxWidth: 700, margin: '0 auto' }}>
                            {[
                                { step: '01', title: 'Register', desc: 'Create a free account on DigiPratham', icon: '📝' },
                                { step: '02', title: 'Pay & Apply', desc: 'Choose a plan and complete secure payment', icon: '💳' },
                                { step: '03', title: 'Get Certified', desc: 'Complete tasks, get reviewed, earn your certificate', icon: '🏆' },
                            ].map(s => (
                                <div key={s.step} className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
                                    <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>{s.icon}</div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 700, letterSpacing: '0.1em', marginBottom: '0.5rem' }}>STEP {s.step}</div>
                                    <h4 style={{ fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.5rem' }}>{s.title}</h4>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: 1.6 }}>{s.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}

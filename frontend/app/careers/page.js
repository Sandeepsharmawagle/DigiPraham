'use client';
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeroReveal from '../components/HeroReveal';
import ScrollReveal from '../components/ScrollReveal';

const FALLBACK_PLANS = [
    {
        _id: '1m', title: '1 Month Internship', duration: '1 Month', price: 499, badge: '🔥 Popular',
        description: 'A fast-paced, intensive internship covering real-world project experience with hands-on work and mentorship.',
        skills: ['Domain fundamentals', 'Problem solving', 'Team collaboration', 'Real project experience', 'Industry tools'],
        certification: 'DigiPratham Certificate of Completion',
        color: '#6C63FF',
    },
    {
        _id: '2m', title: '2 Month Internship', duration: '2 Months', price: 599, badge: '⭐ Best Value',
        description: 'An in-depth program with advanced topics, a capstone project, portfolio review, and expert feedback.',
        skills: ['Advanced domain skills', 'Capstone project', 'Industry best practices', 'Presentation skills', 'Portfolio building', 'Code review process'],
        certification: 'DigiPratham Certificate of Excellence',
        color: '#FF6584',
    },
];

export default function CareersPage() {
    const [internships, setInternships] = useState([]);
    const [paying, setPaying] = useState(null);
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                const { getInternships } = await import('../lib/api');
                const { data } = await getInternships();
                setInternships(Array.isArray(data) && data.length > 0 ? data : FALLBACK_PLANS);
            } catch {
                setInternships(FALLBACK_PLANS);
            }
        })();
    }, []);

    const displayInternships = internships.length > 0 ? internships : FALLBACK_PLANS;

    const handleApply = (intern) => {
        const user = typeof window !== 'undefined' ? localStorage.getItem('dp_user') : null;
        if (!user) { window.location.href = '/register'; return; }
        setPaying(intern);
    };

    const handleMockPay = async () => {
        if (!paying) return;
        setProcessing(true);
        try {
            const { mockPay } = await import('../lib/api');
            await mockPay({ internshipId: paying._id });
            sessionStorage.setItem('dp_payment_success', `Your application for "${paying.title}" has been confirmed!`);
            window.location.href = '/dashboard';
        } catch (err) {
            alert(err?.response?.data?.error || 'Payment failed. Please try again.');
            setProcessing(false);
        }
    };

    return (
        <>
            <Navbar />
            <main>
                {/* Hero */}
                <section className="hero-bg" style={{ paddingTop: 120, paddingBottom: '5rem', textAlign: 'center' }}>
                    <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                        <HeroReveal delay={0}><div className="badge" style={{ marginBottom: '1.25rem' }}>🎓 Internships</div></HeroReveal>
                        <HeroReveal delay={0.15}>
                            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.75rem)', fontWeight: 800, marginBottom: '1.25rem', color: 'var(--text-main)' }}>
                                Launch Your <span className="gradient-text">Tech Career</span>
                            </h1>
                        </HeroReveal>
                        <HeroReveal delay={0.3}>
                            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: 600, margin: '0 auto' }}>
                                Gain real-world experience, build your portfolio, and earn a certification — starting at just ₹499.
                            </p>
                        </HeroReveal>
                    </div>
                </section>

                {/* Plans */}
                <section className="section" style={{ paddingTop: '3rem' }}>
                    <div className="container">
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', maxWidth: 900, margin: '0 auto' }}>
                            {displayInternships.map(intern => (
                                <div key={intern._id || intern.id} className="glass-card animate-fade-up" style={{ padding: '2.5rem', border: `2px solid ${intern.color || '#6C63FF'}35` }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                                        <div>
                                            {intern.badge && <div className="badge" style={{ background: `${intern.color || '#6C63FF'}18`, color: intern.color || '#6C63FF', borderColor: `${intern.color || '#6C63FF'}40`, marginBottom: '0.75rem' }}>{intern.badge}</div>}
                                            <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-main)' }}>{intern.title}</h3>
                                            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.25rem' }}>Duration: {intern.duration}</p>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <div style={{ fontSize: '2rem', fontWeight: 800, color: intern.color || '#6C63FF', fontFamily: 'Space Grotesk' }}>₹{intern.price}</div>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>one time</div>
                                        </div>
                                    </div>

                                    {intern.description && <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '1.5rem', fontSize: '0.925rem' }}>{intern.description}</p>}

                                    {intern.skills?.length > 0 && (
                                        <>
                                            <h4 style={{ fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.75rem', fontSize: '0.95rem' }}>Skills Covered</h4>
                                            <div style={{ marginBottom: '1.5rem' }}>
                                                {intern.skills.map(s => (
                                                    <div key={s} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.4rem' }}>
                                                        <span style={{ color: intern.color || '#6C63FF', fontWeight: 700, fontSize: '0.85rem' }}>✓</span>
                                                        <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{s}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </>
                                    )}

                                    {intern.certification && (
                                        <div style={{ background: 'var(--input-bg)', borderRadius: 10, border: '1px solid var(--border)', padding: '1rem', display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '1.75rem' }}>
                                            <span style={{ fontSize: '1.5rem' }}>🏆</span>
                                            <div>
                                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>Certification</div>
                                                <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-main)' }}>{intern.certification}</div>
                                            </div>
                                        </div>
                                    )}

                                    <button
                                        onClick={() => handleApply(intern)}
                                        className="btn-primary"
                                        style={{ width: '100%', justifyContent: 'center', padding: '0.875rem', fontSize: '1rem', background: `linear-gradient(135deg, ${intern.color || '#6C63FF'}, ${intern.color || '#6C63FF'}cc)` }}
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
                        <ScrollReveal text="How it works" tag="div" className="badge" style={{ marginBottom: '1rem' }} />
                        <ScrollReveal text="3 Simple Steps" tag="h2" style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '3rem', color: 'var(--text-main)' }} />
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', maxWidth: 700, margin: '0 auto' }}>
                            {[
                                { step: '01', title: 'Register', desc: 'Create a free account on DigiPratham', icon: '📝' },
                                { step: '02', title: 'Pay & Apply', desc: 'Choose a plan and complete payment instantly', icon: '💳' },
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

            {/* ── Payment Modal ── */}
            {paying && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(12px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
                    <div style={{ background: '#13102A', border: '1px solid rgba(108,99,255,0.3)', borderRadius: 20, padding: '2.5rem', maxWidth: 440, width: '100%', boxShadow: '0 40px 120px rgba(0,0,0,0.5)' }}>
                        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                            <div style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>💳</div>
                            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#E8E9FF', marginBottom: '0.4rem' }}>Confirm Payment</h3>
                            <p style={{ color: '#9495B8', fontSize: '0.875rem' }}>Secure · Instant · Refund-eligible</p>
                        </div>

                        <div style={{ background: 'rgba(108,99,255,0.08)', border: '1px solid rgba(108,99,255,0.2)', borderRadius: 12, padding: '1.25rem', marginBottom: '1.75rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
                                <span style={{ color: '#9495B8', fontSize: '0.875rem' }}>Program</span>
                                <span style={{ color: '#E8E9FF', fontWeight: 600, fontSize: '0.875rem' }}>{paying.title}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
                                <span style={{ color: '#9495B8', fontSize: '0.875rem' }}>Duration</span>
                                <span style={{ color: '#E8E9FF', fontWeight: 600, fontSize: '0.875rem' }}>{paying.duration}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '0.6rem', borderTop: '1px solid rgba(108,99,255,0.15)' }}>
                                <span style={{ color: '#E8E9FF', fontWeight: 700 }}>Total</span>
                                <span style={{ color: '#43E97B', fontWeight: 800, fontSize: '1.2rem', fontFamily: 'Space Grotesk' }}>₹{paying.price}</span>
                            </div>
                        </div>

                        <button
                            onClick={handleMockPay}
                            disabled={processing}
                            style={{ width: '100%', padding: '1rem', background: processing ? 'rgba(108,99,255,0.4)' : 'linear-gradient(135deg,#6C63FF,#9f65ff)', border: 'none', borderRadius: 12, color: '#fff', fontWeight: 700, fontSize: '1.05rem', cursor: processing ? 'default' : 'pointer', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem', boxShadow: processing ? 'none' : '0 8px 32px rgba(108,99,255,0.4)', transition: 'all 0.2s' }}
                        >
                            {processing ? (
                                <>
                                    <span style={{ width: 18, height: 18, border: '2px solid rgba(255,255,255,0.4)', borderTopColor: '#fff', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.7s linear infinite' }} />
                                    Processing...
                                </>
                            ) : '✅ Tap to Pay – ₹' + paying.price}
                        </button>
                        <button onClick={() => setPaying(null)} style={{ width: '100%', padding: '0.75rem', background: 'transparent', border: '1px solid rgba(108,99,255,0.25)', borderRadius: 12, color: '#9495B8', cursor: 'pointer', fontSize: '0.875rem' }}>
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </>
    );
}

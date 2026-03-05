import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Link from 'next/link';

const team = [
    { name: 'Founder', role: 'CEO & Visionary', desc: 'Leading DigiPratham with a passion for technology and empowering businesses through AI.', avatar: 'F' },
    { name: 'Tech Lead', role: 'Chief Technology Officer', desc: 'Architecting scalable AI solutions and driving technical excellence across all projects.', avatar: 'T' },
    { name: 'Design Lead', role: 'Head of UX/UI', desc: 'Creating stunning, user-centric experiences that make complex technology feel simple.', avatar: 'D' },
];

export default function AboutPage() {
    return (
        <>
            <Navbar />
            <main>
                {/* Hero */}
                <section className="hero-bg" style={{ paddingTop: 120, paddingBottom: '5rem', textAlign: 'center' }}>
                    <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                        <div className="badge" style={{ marginBottom: '1.25rem' }}>About Us</div>
                        <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.75rem)', fontWeight: 800, marginBottom: '1.25rem', color: 'var(--text-main)' }}>
                            Our <span className="gradient-text">Story</span>
                        </h1>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: 600, margin: '0 auto' }}>
                            We are a team of passionate technologists on a mission to make AI and digital transformation accessible to every business.
                        </p>
                    </div>
                </section>

                {/* Vision & Mission */}
                <section className="section" style={{ paddingTop: '3rem' }}>
                    <div className="container">
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
                            {[
                                { icon: '🎯', title: 'Our Vision', color: '#6C63FF', desc: 'To be the most trusted digital innovation partner for businesses across India and beyond — delivering AI-powered solutions that create lasting impact.' },
                                { icon: '🚀', title: 'Our Mission', color: '#FF6584', desc: 'To democratize access to cutting-edge AI and digital services, empowering businesses of all sizes to compete in the digital economy.' },
                                { icon: '💡', title: 'Our Values', color: '#43E97B', desc: "Excellence, transparency, and client-first thinking guide every project. We don't just deliver code — we deliver business outcomes." },
                            ].map(v => (
                                <div key={v.title} className="glass-card" style={{ padding: '2rem' }}>
                                    <div style={{ width: 56, height: 56, borderRadius: 14, background: `${v.color}18`, border: `1px solid ${v.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.75rem', marginBottom: '1.25rem' }}>{v.icon}</div>
                                    <h3 style={{ fontWeight: 700, fontSize: '1.15rem', color: 'var(--text-main)', marginBottom: '0.75rem' }}>{v.title}</h3>
                                    <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, fontSize: '0.925rem' }}>{v.desc}</p>
                                </div>
                            ))}
                        </div>

                        {/* Why Choose Us */}
                        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                            <div className="badge" style={{ marginBottom: '1rem' }}>Why DigiPratham</div>
                            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-main)' }}>What Sets Us <span className="gradient-text">Apart</span></h2>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '4rem' }}>
                            {[
                                { icon: '🤖', title: 'AI-Native', desc: "AI is not an add-on for us — it's at the core of everything we build." },
                                { icon: '📊', title: 'Data-Driven', desc: 'Every decision and solution is backed by data, not guesswork.' },
                                { icon: '🎓', title: 'Talent Pipeline', desc: 'Our internship program develops the next generation of tech professionals.' },
                                { icon: '⚡', title: 'Agile Delivery', desc: 'Rapid iterations with transparent communication throughout.' },
                            ].map(w => (
                                <div key={w.title} className="glass-card" style={{ padding: '1.75rem', textAlign: 'center' }}>
                                    <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{w.icon}</div>
                                    <h4 style={{ fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.5rem', fontSize: '0.95rem' }}>{w.title}</h4>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.6 }}>{w.desc}</p>
                                </div>
                            ))}
                        </div>

                        {/* Team */}
                        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                            <div className="badge" style={{ marginBottom: '1rem' }}>The Team</div>
                            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 700, color: 'var(--text-main)' }}>Meet our <span className="gradient-text">Team</span></h2>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '4rem' }}>
                            {team.map(t => (
                                <div key={t.name} className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
                                    <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'linear-gradient(135deg,#6C63FF,#FF6584)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.75rem', fontWeight: 800, color: '#fff', margin: '0 auto 1.25rem', boxShadow: '0 4px 20px rgba(108,99,255,0.3)' }}>{t.avatar}</div>
                                    <h4 style={{ fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.25rem' }}>{t.name}</h4>
                                    <p style={{ color: 'var(--primary)', fontSize: '0.85rem', marginBottom: '0.75rem', fontWeight: 500 }}>{t.role}</p>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: 1.6 }}>{t.desc}</p>
                                </div>
                            ))}
                        </div>

                        {/* CTA */}
                        <div style={{ textAlign: 'center', padding: '3rem', background: 'var(--input-bg)', borderRadius: 20, border: '1px solid var(--border)' }}>
                            <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-main)' }}>Ready to work with us?</h2>
                            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '1.05rem' }}>Let's build something great together.</p>
                            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                                <Link href="/contact" className="btn-primary">Get in Touch</Link>
                                <Link href="/services" className="btn-outline">View Services</Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}

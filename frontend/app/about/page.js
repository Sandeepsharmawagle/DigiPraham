import Image from 'next/image';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Link from 'next/link';
import HeroReveal from '../components/HeroReveal';
import ScrollReveal from '../components/ScrollReveal';

const team = [
    {
        name: 'Founder',
        role: 'CEO & Visionary',
        desc: 'Leading DigiPratham with a passion for technology and empowering businesses through AI.',
        img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80',
        color: '#7C6FFF',
    },
    {
        name: 'Tech Lead',
        role: 'Chief Technology Officer',
        desc: 'Architecting scalable AI solutions and driving technical excellence across all projects.',
        img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80',
        color: '#FF6B9D',
    },
    {
        name: 'Design Lead',
        role: 'Head of UX/UI',
        desc: 'Creating stunning, user-centric experiences that make complex technology feel simple.',
        img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
        color: '#43E97B',
    },
];

export default function AboutPage() {
    return (
        <>
            <Navbar />
            <main>
                {/* Hero */}
                <section className="hero-bg" style={{ paddingTop: 0, paddingBottom: 0, position: 'relative', minHeight: 380, display: 'flex', alignItems: 'center' }}>
                    {/* Background image */}
                    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
                        <Image
                            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80"
                            alt="Modern tech company office"
                            fill
                            style={{ objectFit: 'cover', opacity: 0.18 }}
                            priority
                        />
                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, var(--bg-main) 0%, transparent 40%, var(--bg-main) 100%)' }} />
                    </div>
                    <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center', paddingTop: 120, paddingBottom: '5rem' }}>
                        <HeroReveal delay={0.1} y={20} blur={8} as="div">
                            <div className="badge" style={{ marginBottom: '1.25rem' }}>About Us</div>
                        </HeroReveal>
                        <HeroReveal delay={0.3} y={40} blur={14} as="h1" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.75rem)', fontWeight: 800, marginBottom: '1.25rem', color: 'var(--text-main)' }}>
                            Our <span className="gradient-text">Story</span>
                        </HeroReveal>
                        <HeroReveal delay={0.5} y={24} blur={10} as="p" style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: 600, margin: '0 auto' }}>
                            We are a team of passionate technologists on a mission to make AI and digital transformation accessible to every business.
                        </HeroReveal>
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

                        {/* Culture / Office Image Banner */}
                        <div style={{ position: 'relative', borderRadius: 20, overflow: 'hidden', height: 260, marginBottom: '4rem' }}>
                            <Image
                                src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1400&q=80"
                                alt="Our team collaborating in a modern workspace"
                                fill
                                style={{ objectFit: 'cover' }}
                            />
                            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(124,111,255,0.65) 0%, rgba(255,107,157,0.35) 100%)' }} />
                            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                                <div>
                                    <div style={{ fontSize: '2rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', marginBottom: '0.5rem' }}>We Build. We Innovate. We Empower.</div>
                                    <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1rem' }}>Turning complex technology into real-world solutions since 2023.</p>
                                </div>
                            </div>
                        </div>

                        {/* Why Choose Us */}
                        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                            <ScrollReveal as="div" style={{ marginBottom: '1rem' }}><div className="badge">Why DigiPratham</div></ScrollReveal>
                            <ScrollReveal text="What Sets Us Apart" as="h2" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-main)' }} baseOpacity={0.05} enableBlur stagger={0.08} />
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
                            <ScrollReveal as="div" style={{ marginBottom: '1rem' }}><div className="badge">The Team</div></ScrollReveal>
                            <ScrollReveal text="Meet our Team" as="h2" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 700, color: 'var(--text-main)' }} baseOpacity={0.05} enableBlur stagger={0.09} />
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', marginBottom: '4rem' }}>
                            {team.map(t => (
                                <div key={t.name} className="glass-card" style={{ overflow: 'hidden' }}>
                                    {/* Team member photo */}
                                    <div style={{ position: 'relative', height: 220 }}>
                                        <Image
                                            src={t.img}
                                            alt={`${t.name} - ${t.role}`}
                                            fill
                                            style={{ objectFit: 'cover' }}
                                        />
                                        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.6) 100%)` }} />
                                        <div style={{ position: 'absolute', bottom: 12, left: 12, right: 12 }}>
                                            <div style={{ display: 'inline-block', padding: '0.2rem 0.65rem', background: `${t.color}30`, border: `1px solid ${t.color}60`, borderRadius: 20, color: t.color, fontSize: '0.72rem', fontWeight: 700, backdropFilter: 'blur(8px)' }}>{t.role}</div>
                                        </div>
                                    </div>
                                    {/* Info */}
                                    <div style={{ padding: '1.5rem', textAlign: 'center' }}>
                                        <h4 style={{ fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.5rem', fontSize: '1.05rem' }}>{t.name}</h4>
                                        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: 1.6 }}>{t.desc}</p>
                                    </div>
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

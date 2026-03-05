import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Link from 'next/link';

const services = [
    {
        icon: '🤖', title: 'AI & Machine Learning', slug: 'ai-ml', color: '#6C63FF',
        tagline: 'Intelligent solutions powered by cutting-edge AI',
        features: ['Custom ML models', 'NLP & Computer Vision', 'Predictive analytics', 'AI system integration'],
        techs: ['Python', 'TensorFlow', 'PyTorch', 'LangChain'],
        pricing: { starter: '₹15,000', growth: '₹35,000' },
    },
    {
        icon: '📊', title: 'Data Analytics', slug: 'data-analytics', color: '#FF6584',
        tagline: 'Transform raw data into actionable insights',
        features: ['BI Dashboards', 'ETL Pipelines', 'Statistical Analysis', 'Real-time Monitoring'],
        techs: ['Python', 'Power BI', 'Tableau', 'Spark'],
        pricing: { starter: '₹10,000', growth: '₹25,000' },
    },
    {
        icon: '🌐', title: 'Web Development', slug: 'web-development', color: '#43E97B',
        tagline: 'Modern, fast, and scalable web applications',
        features: ['Responsive UI/UX', 'Full-stack apps', 'API Development', 'SEO Optimization'],
        techs: ['React', 'Next.js', 'Node.js', 'MongoDB'],
        pricing: { starter: '₹8,000', growth: '₹25,000' },
    },
    {
        icon: '📱', title: 'App Development', slug: 'app-development', color: '#FFB347',
        tagline: 'Native & cross-platform mobile apps users love',
        features: ['React Native / Flutter', 'iOS & Android', 'App Store Deployment', 'Push Notifications'],
        techs: ['React Native', 'Flutter', 'Firebase', 'Expo'],
        pricing: { starter: '₹20,000', growth: '₹50,000' },
    },
];

export default function ServicesPage() {
    return (
        <>
            <Navbar />
            <main>
                {/* Hero */}
                <section className="hero-bg" style={{ paddingTop: 120, paddingBottom: '5rem', textAlign: 'center' }}>
                    <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                        <div className="badge animate-fade-up" style={{ marginBottom: '1.25rem' }}>🛠️ What We Offer</div>
                        <h1 className="animate-fade-up delay-100" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.75rem)', fontWeight: 800, marginBottom: '1.25rem', color: 'var(--text-main)' }}>
                            Our <span className="gradient-text">Services</span>
                        </h1>
                        <p className="animate-fade-up delay-200" style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: 600, margin: '0 auto' }}>
                            Explore our full range of digital services. Click any service to learn more, see pricing, and apply.
                        </p>
                    </div>
                </section>

                {/* Services Grid */}
                <section className="section" style={{ paddingTop: '3rem' }}>
                    <div className="container">
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                            {services.map((svc, i) => (
                                <div key={svc.slug} className="glass-card animate-fade-up" style={{ padding: '2rem', animationDelay: `${i * 0.1}s`, opacity: 0 }}>
                                    <div style={{ width: 64, height: 64, borderRadius: 16, background: `${svc.color}18`, border: `1px solid ${svc.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', marginBottom: '1.5rem' }}>
                                        {svc.icon}
                                    </div>
                                    <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.5rem' }}>{svc.title}</h3>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>{svc.tagline}</p>

                                    {/* Features */}
                                    <div style={{ marginBottom: '1.5rem' }}>
                                        {svc.features.map(f => (
                                            <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                                                <span style={{ color: svc.color, fontSize: '0.85rem', fontWeight: 700 }}>✓</span>
                                                <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{f}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Tech tags */}
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.5rem' }}>
                                        {svc.techs.map(t => (
                                            <span key={t} style={{ background: 'var(--input-bg)', border: '1px solid var(--border)', borderRadius: 6, padding: '0.2rem 0.6rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t}</span>
                                        ))}
                                    </div>

                                    {/* Pricing preview */}
                                    <div style={{ background: 'var(--input-bg)', borderRadius: 10, border: '1px solid var(--border)', padding: '1rem', marginBottom: '1.5rem' }}>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Starting from</div>
                                        <div style={{ display: 'flex', gap: '1.5rem' }}>
                                            <div>
                                                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: svc.color, fontFamily: 'Space Grotesk' }}>{svc.pricing.starter}</div>
                                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Starter</div>
                                            </div>
                                            <div>
                                                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', fontFamily: 'Space Grotesk' }}>{svc.pricing.growth}</div>
                                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Growth</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                                        <Link href={`/services/${svc.slug}`} className="btn-primary" style={{ flex: 1, justifyContent: 'center', padding: '0.6rem 1rem' }}>View Details</Link>
                                        <Link href={`/services/${svc.slug}#inquire`} className="btn-outline" style={{ flex: 1, justifyContent: 'center', padding: '0.6rem 1rem' }}>Inquire</Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Why Choose Us */}
                <section style={{ padding: '5rem 1.5rem', background: 'var(--input-bg)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
                    <div className="container" style={{ textAlign: 'center' }}>
                        <div className="badge" style={{ marginBottom: '1rem' }}>Why DigiPratham</div>
                        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 700, marginBottom: '3rem', color: 'var(--text-main)' }}>
                            Built for <span className="gradient-text">Results</span>
                        </h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
                            {[
                                { icon: '⚡', title: 'Fast Delivery', desc: 'Agile development with rapid iterations' },
                                { icon: '🔒', title: 'Secure & Scalable', desc: 'Enterprise-grade security by design' },
                                { icon: '🎯', title: 'Goal-Oriented', desc: 'Focus on measurable business outcomes' },
                                { icon: '🤝', title: '24/7 Support', desc: 'Dedicated support throughout the project' },
                            ].map(w => (
                                <div key={w.title} className="glass-card" style={{ padding: '1.75rem', textAlign: 'center' }}>
                                    <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{w.icon}</div>
                                    <h4 style={{ fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.5rem' }}>{w.title}</h4>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: 1.6 }}>{w.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section style={{ padding: '5rem 1.5rem', textAlign: 'center' }}>
                    <div className="container">
                        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.75rem)', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-main)' }}>
                            Not sure which service? <span className="gradient-text">Let's talk.</span>
                        </h2>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '1.05rem' }}>Our team will help you pick the right solution for your needs.</p>
                        <Link href="/contact" className="btn-primary" style={{ fontSize: '1rem', padding: '0.875rem 2.5rem' }}>Contact Us</Link>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}

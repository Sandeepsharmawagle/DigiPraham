'use client';
import Link from 'next/link';

const services = [
    { label: 'AI & Machine Learning', href: '/services/ai-ml' },
    { label: 'Data Analytics', href: '/services/data-analytics' },
    { label: 'Web Development', href: '/services/web-development' },
    { label: 'App Development', href: '/services/app-development' },
];

export default function Footer() {
    return (
        <footer style={{ background: '#080918', borderTop: '1px solid rgba(108,99,255,0.15)', padding: '4rem 1.5rem 2rem' }}>
            <div style={{ maxWidth: 1200, margin: '0 auto' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
                    {/* Brand */}
                    <div>
                        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                            <img src="https://res.cloudinary.com/dunualrkz/image/upload/v1772440278/Digipratham_xiukmb.png" alt="DigiPratham Logo" style={{ width: 36, height: 36, objectFit: 'contain', borderRadius: 8 }} />
                            <span style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '1.2rem', color: 'var(--text-main)' }}>Digi<span style={{ color: '#6C63FF' }}>Pratham</span></span>
                        </Link>
                        <p style={{ color: '#9495B8', fontSize: '0.9rem', lineHeight: 1.7 }}>
                            Empowering businesses with intelligent digital solutions — AI, data, and beyond.
                        </p>
                        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.25rem', flexWrap: 'wrap' }}>
                            {['LinkedIn', 'Twitter', 'Instagram', 'GitHub'].map(s => (
                                <span key={s} style={{ background: 'rgba(108,99,255,0.1)', border: '1px solid rgba(108,99,255,0.25)', borderRadius: 8, padding: '0.4rem 0.65rem', fontSize: '0.75rem', color: '#9f8fff', cursor: 'pointer', whiteSpace: 'nowrap' }}>{s}</span>
                            ))}
                        </div>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 style={{ color: '#E8E9FF', fontWeight: 600, marginBottom: '1rem', fontFamily: 'Space Grotesk' }}>Services</h4>
                        {services.map(s => (
                            <Link key={s.href} href={s.href} style={{ display: 'block', color: '#9495B8', textDecoration: 'none', fontSize: '0.9rem', marginBottom: '0.6rem', transition: 'color 0.2s' }}
                                onMouseOver={e => e.target.style.color = '#6C63FF'}
                                onMouseOut={e => e.target.style.color = '#9495B8'}>
                                {s.label}
                            </Link>
                        ))}
                    </div>

                    {/* Company */}
                    <div>
                        <h4 style={{ color: '#E8E9FF', fontWeight: 600, marginBottom: '1rem', fontFamily: 'Space Grotesk' }}>Company</h4>
                        {[{ label: 'About Us', href: '/about' }, { label: 'Careers', href: '/careers' }, { label: 'Contact', href: '/contact' }, { label: 'Dashboard', href: '/dashboard' }].map(l => (
                            <Link key={l.href} href={l.href} style={{ display: 'block', color: '#9495B8', textDecoration: 'none', fontSize: '0.9rem', marginBottom: '0.6rem', transition: 'color 0.2s' }}
                                onMouseOver={e => e.target.style.color = '#6C63FF'}
                                onMouseOut={e => e.target.style.color = '#9495B8'}>
                                {l.label}
                            </Link>
                        ))}
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 style={{ color: '#E8E9FF', fontWeight: 600, marginBottom: '1rem', fontFamily: 'Space Grotesk' }}>Contact</h4>
                        <p style={{ color: '#9495B8', fontSize: '0.9rem', marginBottom: '0.6rem' }}>📧 admin@digipratham.com</p>
                        <p style={{ color: '#9495B8', fontSize: '0.9rem', marginBottom: '1rem' }}>📍 India</p>
                        <Link href="/contact" className="btn-primary" style={{ padding: '0.6rem 1.25rem', fontSize: '0.85rem', display: 'inline-flex' }}>
                            Get in Touch
                        </Link>
                    </div>
                </div>

                <div style={{ borderTop: '1px solid rgba(108,99,255,0.15)', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                    <p style={{ color: '#9495B8', fontSize: '0.85rem' }}>© {new Date().getFullYear()} DigiPratham. All rights reserved.</p>
                    <div style={{ display: 'flex', gap: '1.5rem' }}>
                        {['Privacy Policy', 'Terms of Service', 'Refund Policy'].map(t => (
                            <span key={t} style={{ color: '#9495B8', fontSize: '0.85rem', cursor: 'pointer' }}>{t}</span>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}

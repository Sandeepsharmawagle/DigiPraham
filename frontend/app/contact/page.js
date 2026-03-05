'use client';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function ContactPage() {
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { submitInquiry } = await import('../lib/api');
            await submitInquiry({ ...form, serviceSlug: 'general' });
            setSent(true);
        } catch {
            alert('Failed to send. Please try again.');
        }
        setLoading(false);
    };

    return (
        <>
            <Navbar />
            <main style={{ paddingTop: 100 }}>
                {/* Hero */}
                <section style={{ textAlign: 'center', padding: '4rem 1.5rem 2rem' }}>
                    <div className="badge" style={{ marginBottom: '1rem' }}>📬 Get in Touch</div>
                    <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 800, marginBottom: '1rem', color: 'var(--text-main)' }}>
                        Contact <span className="gradient-text">Us</span>
                    </h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: 550, margin: '0 auto' }}>
                        Have a project in mind or want to learn more? We'd love to hear from you.
                    </p>
                </section>

                <section className="section" style={{ paddingTop: '2rem' }}>
                    <div className="container">
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', maxWidth: 1000, margin: '0 auto' }}>
                            {/* Contact Info */}
                            <div>
                                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem', color: 'var(--text-main)' }}>Our Details</h2>
                                {[
                                    { icon: '📧', label: 'Email', value: 'admin@digipratham.com' },
                                    { icon: '📍', label: 'Location', value: 'India' },
                                    { icon: '⏰', label: 'Hours', value: 'Mon–Sat, 9AM–6PM IST' },
                                ].map(c => (
                                    <div key={c.label} className="glass-card" style={{ padding: '1.25rem', marginBottom: '1rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                        <div style={{ fontSize: '1.5rem', width: 44, height: 44, background: 'var(--input-bg)', border: '1px solid var(--border)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{c.icon}</div>
                                        <div>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>{c.label}</div>
                                            <div style={{ fontWeight: 600, color: 'var(--text-main)' }}>{c.value}</div>
                                        </div>
                                    </div>
                                ))}

                                <h3 style={{ fontWeight: 600, marginBottom: '1rem', marginTop: '1.5rem', fontSize: '0.95rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Follow Us</h3>
                                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                                    {['LinkedIn', 'Twitter', 'Instagram', 'GitHub'].map(s => (
                                        <span key={s} style={{ background: 'var(--input-bg)', border: '1px solid var(--border)', borderRadius: 8, padding: '0.5rem 0.875rem', fontSize: '0.825rem', color: 'var(--primary)', cursor: 'pointer', transition: 'all 0.2s' }}>{s}</span>
                                    ))}
                                </div>
                            </div>

                            {/* Form */}
                            <div>
                                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem', color: 'var(--text-main)' }}>Send a Message</h2>
                                {sent ? (
                                    <div className="glass-card" style={{ padding: '3rem', textAlign: 'center' }}>
                                        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
                                        <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#43E97B', marginBottom: '0.75rem' }}>Message Sent!</h3>
                                        <p style={{ color: 'var(--text-muted)' }}>We'll reply to <strong style={{ color: 'var(--text-main)' }}>{form.email}</strong> within 24 hours.</p>
                                        <button onClick={() => setSent(false)} className="btn-outline" style={{ marginTop: '1.5rem' }}>Send Another</button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="glass-card" style={{ padding: '2rem' }}>
                                        {[
                                            { key: 'name', label: 'Your Name', type: 'text', placeholder: 'John Doe' },
                                            { key: 'email', label: 'Email Address', type: 'email', placeholder: 'you@example.com' },
                                        ].map(f => (
                                            <div key={f.key} style={{ marginBottom: '1.25rem' }}>
                                                <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.4rem', fontWeight: 500 }}>{f.label}</label>
                                                <input className="input-field" type={f.type} placeholder={f.placeholder} required value={form[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })} />
                                            </div>
                                        ))}
                                        <div style={{ marginBottom: '1.75rem' }}>
                                            <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.4rem', fontWeight: 500 }}>Message</label>
                                            <textarea className="input-field" rows={5} placeholder="Tell us about your project or question..." required value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} style={{ resize: 'vertical' }} />
                                        </div>
                                        <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '0.875rem' }} disabled={loading}>
                                            {loading ? 'Sending...' : 'Send Message'}
                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}

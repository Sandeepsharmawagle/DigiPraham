'use client';
import { useState } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); setError('');
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/auth/forgot-password`,
                { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email }) }
            );
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Something went wrong');
            setSent(true);
        } catch (err) {
            setError(err.message);
        }
        setLoading(false);
    };

    return (
        <>
            <Navbar />
            <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: 80, paddingBottom: '4rem' }}>
                <div className="container" style={{ maxWidth: 460, margin: '0 auto', width: '100%' }}>
                    <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔑</div>
                        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)' }}>Forgot Password</h1>
                        <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Enter your email and we'll send you a reset link</p>
                    </div>

                    {sent ? (
                        <div className="glass-card" style={{ padding: '2.5rem', textAlign: 'center' }}>
                            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📧</div>
                            <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#43E97B', marginBottom: '0.75rem' }}>Check Your Email</h3>
                            <p style={{ color: 'var(--text-muted)', marginBottom: '1.75rem', lineHeight: 1.7 }}>
                                If <strong style={{ color: 'var(--text-main)' }}>{email}</strong> is registered, you'll receive a password reset link shortly.
                            </p>
                            <Link href="/login" className="btn-primary" style={{ display: 'inline-flex' }}>Back to Login</Link>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="glass-card" style={{ padding: '2.5rem' }}>
                            {error && (
                                <div style={{ background: 'rgba(255,101,132,0.1)', border: '1px solid rgba(255,101,132,0.3)', borderRadius: 10, padding: '0.875rem 1rem', marginBottom: '1.5rem', color: '#FF6584', fontSize: '0.875rem' }}>
                                    {error}
                                </div>
                            )}
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.4rem', fontWeight: 500 }}>Email Address</label>
                                <input className="input-field" type="email" placeholder="you@example.com" required value={email} onChange={e => setEmail(e.target.value)} />
                            </div>
                            <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '0.875rem', fontSize: '1rem' }} disabled={loading}>
                                {loading ? 'Sending...' : 'Send Reset Link'}
                            </button>
                            <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '1.5rem' }}>
                                Remember your password?{' '}<Link href="/login" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>Sign in</Link>
                            </p>
                        </form>
                    )}
                </div>
            </main>
            <Footer />
        </>
    );
}

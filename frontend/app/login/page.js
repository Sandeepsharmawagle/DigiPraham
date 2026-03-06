'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function LoginPage() {
    const [form, setForm] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); setError('');
        try {
            const { login } = await import('../lib/api');
            const { data } = await login(form);
            localStorage.setItem('dp_token', data.token);
            localStorage.setItem('dp_user', JSON.stringify(data.user));
            router.push('/dashboard');
        } catch (err) {
            setError(err.response?.data?.error || 'Login failed. Please try again.');
        }
        setLoading(false);
    };

    return (
        <>
            <Navbar />
            <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: 80, paddingBottom: '4rem', background: 'var(--bg-dark)' }}>
                <div className="container" style={{ maxWidth: 460, margin: '0 auto', width: '100%' }}>
                    <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                        <img src="https://res.cloudinary.com/dunualrkz/image/upload/v1772440278/Digipratham_xiukmb.png" alt="DigiPratham" style={{ width: 64, height: 64, objectFit: 'contain', margin: '0 auto 1.5rem', display: 'block' }} />
                        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)' }}>Welcome Back</h1>
                        <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Sign in to your DigiPratham account</p>
                    </div>

                    <form onSubmit={handleSubmit} className="glass-card" style={{ padding: '2.5rem' }}>
                        {error && (
                            <div style={{ background: 'rgba(255,101,132,0.1)', border: '1px solid rgba(255,101,132,0.3)', borderRadius: 10, padding: '0.875rem 1rem', marginBottom: '1.5rem', color: '#FF6584', fontSize: '0.875rem' }}>
                                {error}
                            </div>
                        )}

                        <div style={{ marginBottom: '1.25rem' }}>
                            <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.4rem', fontWeight: 500 }}>Email Address</label>
                            <input className="input-field" type="email" placeholder="you@example.com" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                        </div>

                        <div style={{ marginBottom: '0.75rem' }}>
                            <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.4rem', fontWeight: 500 }}>Password</label>
                            <input className="input-field" type="password" placeholder="••••••••" required value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
                        </div>

                        <div style={{ textAlign: 'right', marginBottom: '1.75rem' }}>
                            <Link href="/forgot-password" style={{ color: 'var(--primary)', fontSize: '0.85rem', fontWeight: 500, textDecoration: 'none' }}>Forgot password?</Link>
                        </div>

                        <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '0.875rem', fontSize: '1rem' }} disabled={loading}>
                            {loading ? 'Signing in...' : 'Sign In'}
                        </button>

                        <div className="divider" />

                        <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                            Don't have an account?{' '}
                            <Link href="/register" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>Register free</Link>
                        </p>
                    </form>
                </div>
            </main>
            <Footer />
        </>
    );
}

'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function ResetPasswordForm() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const token = searchParams.get('token');

    const [form, setForm] = useState({ password: '', confirm: '' });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!token) setError('Invalid or missing reset token. Please request a new link.');
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (form.password !== form.confirm) return setError('Passwords do not match');
        if (form.password.length < 6) return setError('Password must be at least 6 characters');
        setLoading(true); setError('');
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/auth/reset-password/${token}`,
                { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password: form.password }) }
            );
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Reset failed');
            setSuccess(true);
            setTimeout(() => router.push('/login'), 3000);
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
                        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔒</div>
                        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)' }}>Reset Password</h1>
                        <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Enter your new password below</p>
                    </div>

                    {success ? (
                        <div className="glass-card" style={{ padding: '2.5rem', textAlign: 'center' }}>
                            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
                            <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#43E97B', marginBottom: '0.75rem' }}>Password Reset!</h3>
                            <p style={{ color: 'var(--text-muted)', marginBottom: '1.75rem' }}>Your password has been updated. Redirecting to login...</p>
                            <Link href="/login" className="btn-primary" style={{ display: 'inline-flex' }}>Go to Login</Link>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="glass-card" style={{ padding: '2.5rem' }}>
                            {error && (
                                <div style={{ background: 'rgba(255,101,132,0.1)', border: '1px solid rgba(255,101,132,0.3)', borderRadius: 10, padding: '0.875rem 1rem', marginBottom: '1.5rem', color: '#FF6584', fontSize: '0.875rem' }}>
                                    {error}
                                </div>
                            )}
                            {[
                                { key: 'password', label: 'New Password', placeholder: 'Min 6 characters' },
                                { key: 'confirm', label: 'Confirm Password', placeholder: 'Repeat password' },
                            ].map(f => (
                                <div key={f.key} style={{ marginBottom: '1.25rem' }}>
                                    <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.4rem', fontWeight: 500 }}>{f.label}</label>
                                    <input className="input-field" type="password" placeholder={f.placeholder} required value={form[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })} />
                                </div>
                            ))}
                            <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '0.875rem', fontSize: '1rem' }} disabled={loading || !token}>
                                {loading ? 'Resetting...' : 'Reset Password'}
                            </button>
                        </form>
                    )}
                </div>
            </main>
            <Footer />
        </>
    );
}

export default function ResetPasswordPage() {
    return (
        <Suspense fallback={<div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9495B8' }}>Loading...</div>}>
            <ResetPasswordForm />
        </Suspense>
    );
}

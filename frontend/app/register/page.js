'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function RegisterPage() {
    const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (form.password !== form.confirm) return setError('Passwords do not match');
        setLoading(true); setError('');
        try {
            const { register } = await import('../lib/api');
            const { data } = await register({ name: form.name, email: form.email, password: form.password });
            localStorage.setItem('dp_token', data.token);
            localStorage.setItem('dp_user', JSON.stringify(data.user));
            router.push('/dashboard');
        } catch (err) {
            setError(err.response?.data?.error || 'Registration failed. Please try again.');
        }
        setLoading(false);
    };

    return (
        <>
            <Navbar />
            <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: 80, paddingBottom: '4rem', background: 'var(--bg-dark)' }}>
                <div className="container" style={{ maxWidth: 480, margin: '0 auto', width: '100%' }}>
                    <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                        <img src="https://res.cloudinary.com/dunualrkz/image/upload/v1772440278/Digipratham_xiukmb.png" alt="DigiPratham" style={{ width: 64, height: 64, objectFit: 'contain', margin: '0 auto 1.5rem', display: 'block' }} />
                        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)' }}>Create Account</h1>
                        <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Join DigiPratham and access all services</p>
                    </div>

                    <form onSubmit={handleSubmit} className="glass-card" style={{ padding: '2.5rem' }}>
                        {error && (
                            <div style={{ background: 'rgba(255,101,132,0.1)', border: '1px solid rgba(255,101,132,0.3)', borderRadius: 10, padding: '0.875rem 1rem', marginBottom: '1.5rem', color: '#FF6584', fontSize: '0.875rem' }}>
                                {error}
                            </div>
                        )}

                        {[
                            { key: 'name', label: 'Full Name', type: 'text', placeholder: 'John Doe' },
                            { key: 'email', label: 'Email Address', type: 'email', placeholder: 'you@example.com' },
                            { key: 'password', label: 'Password', type: 'password', placeholder: 'Min 6 characters' },
                            { key: 'confirm', label: 'Confirm Password', type: 'password', placeholder: 'Repeat password' },
                        ].map(field => (
                            <div key={field.key} style={{ marginBottom: '1.25rem' }}>
                                <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.4rem', fontWeight: 500 }}>{field.label}</label>
                                <input className="input-field" type={field.type} placeholder={field.placeholder} required value={form[field.key]} onChange={e => setForm({ ...form, [field.key]: e.target.value })} />
                            </div>
                        ))}

                        <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '1.75rem', lineHeight: 1.6 }}>
                            By registering, you agree to our <span style={{ color: 'var(--primary)', cursor: 'pointer' }}>Terms of Service</span> and <span style={{ color: 'var(--primary)', cursor: 'pointer' }}>Privacy Policy</span>.
                        </p>

                        <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '0.875rem', fontSize: '1rem' }} disabled={loading}>
                            {loading ? 'Creating account...' : 'Create Free Account'}
                        </button>

                        <div className="divider" />

                        <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                            Already have an account?{' '}
                            <Link href="/login" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>Sign in</Link>
                        </p>
                    </form>
                </div>
            </main>
            <Footer />
        </>
    );
}

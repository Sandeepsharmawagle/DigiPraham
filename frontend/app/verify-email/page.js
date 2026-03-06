'use client';
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function VerifyEmailContent() {
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    const [status, setStatus] = useState('loading'); // loading | success | error
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (!token) { setStatus('error'); setMessage('No verification token found.'); return; }
        (async () => {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/auth/verify-email/${token}`
                );
                const data = await res.json();
                if (!res.ok) throw new Error(data.error || 'Verification failed');
                setStatus('success');
                setMessage(data.message);
            } catch (err) {
                setStatus('error');
                setMessage(err.message);
            }
        })();
    }, [token]);

    return (
        <>
            <Navbar />
            <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: 80, paddingBottom: '4rem' }}>
                <div className="container" style={{ maxWidth: 480, margin: '0 auto', width: '100%' }}>
                    <div className="glass-card" style={{ padding: '3rem', textAlign: 'center' }}>
                        {status === 'loading' && (
                            <>
                                <div style={{ width: 48, height: 48, border: '4px solid #6C63FF', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 1.5rem' }} />
                                <p style={{ color: 'var(--text-muted)' }}>Verifying your email address...</p>
                                <style>{`@keyframes spin { to { transform:rotate(360deg); } }`}</style>
                            </>
                        )}
                        {status === 'success' && (
                            <>
                                <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>✅</div>
                                <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#43E97B', marginBottom: '0.75rem' }}>Email Verified!</h2>
                                <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: 1.7 }}>{message || 'Your email has been verified. You can now enjoy all features of DigiPratham.'}</p>
                                <Link href="/login" className="btn-primary" style={{ display: 'inline-flex' }}>Sign In Now →</Link>
                            </>
                        )}
                        {status === 'error' && (
                            <>
                                <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>❌</div>
                                <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#FF6584', marginBottom: '0.75rem' }}>Verification Failed</h2>
                                <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: 1.7 }}>{message}</p>
                                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                                    <Link href="/login" className="btn-outline">Go to Login</Link>
                                    <Link href="/dashboard" className="btn-primary">Go to Dashboard</Link>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}

export default function VerifyEmailPage() {
    return (
        <Suspense fallback={<div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9495B8' }}>Loading...</div>}>
            <VerifyEmailContent />
        </Suspense>
    );
}

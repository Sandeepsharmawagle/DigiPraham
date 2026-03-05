'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function DashboardPage() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [tab, setTab] = useState('overview');
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('dp_token');
        if (!token) { router.push('/login'); return; }
        (async () => {
            try {
                const { getDashboardSummary } = await import('../lib/api');
                const { data: res } = await getDashboardSummary();
                setData(res);
            } catch {
                router.push('/login');
            }
            setLoading(false);
        })();
    }, []);

    if (loading) return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0A0B1A' }}>
            <div style={{ color: '#9495B8', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: 24, height: 24, border: '3px solid #6C63FF', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                Loading your dashboard...
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
        </div>
    );

    const tabs = [
        { key: 'overview', label: '📊 Overview' },
        { key: 'services', label: '🛠️ My Services' },
        { key: 'applications', label: '🎓 Applications' },
        { key: 'payments', label: '💳 Payments' },
        { key: 'chatbot', label: '💬 Chatbot' },
    ];

    return (
        <>
            <Navbar />
            <main style={{ paddingTop: 90, minHeight: '100vh' }}>
                <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
                    {/* Header */}
                    <div style={{ marginBottom: '2.5rem' }}>
                        <div className="badge" style={{ marginBottom: '0.75rem' }}>Dashboard</div>
                        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.25rem' }}>
                            Welcome back, <span className="gradient-text">{data?.user?.name?.split(' ')[0] || 'User'}!</span>
                        </h1>
                        <p style={{ color: '#9495B8' }}>{data?.user?.email}</p>
                    </div>

                    {/* Quick stats */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', marginBottom: '2.5rem' }}>
                        {[
                            { label: 'Selected Services', value: data?.selectedServices?.length || 0, icon: '🛠️', color: '#6C63FF' },
                            { label: 'Applications', value: data?.applications?.length || 0, icon: '🎓', color: '#FF6584' },
                            { label: 'Payments', value: data?.payments?.length || 0, icon: '💳', color: '#43E97B' },
                        ].map(s => (
                            <div key={s.label} className="glass-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
                                <div style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>{s.icon}</div>
                                <div style={{ fontSize: '1.75rem', fontWeight: 800, color: s.color, fontFamily: 'Space Grotesk' }}>{s.value}</div>
                                <div style={{ fontSize: '0.8rem', color: '#9495B8', marginTop: '0.25rem' }}>{s.label}</div>
                            </div>
                        ))}
                    </div>

                    {/* Tabs */}
                    <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', marginBottom: '2rem', borderBottom: '1px solid rgba(108,99,255,0.15)', paddingBottom: '0' }}>
                        {tabs.map(t => (
                            <button key={t.key} onClick={() => setTab(t.key)}
                                style={{ background: 'none', border: 'none', color: tab === t.key ? '#6C63FF' : '#9495B8', cursor: 'pointer', padding: '0.75rem 1.25rem', fontWeight: 500, fontSize: '0.9rem', whiteSpace: 'nowrap', borderBottom: tab === t.key ? '2px solid #6C63FF' : '2px solid transparent', marginBottom: -1, transition: 'all 0.2s' }}>
                                {t.label}
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    {tab === 'overview' && (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                            {/* Quick actions */}
                            <div className="glass-card" style={{ padding: '2rem' }}>
                                <h3 style={{ fontWeight: 700, marginBottom: '1.25rem', fontSize: '1.05rem' }}>Quick Actions</h3>
                                {[{ label: 'Browse Services', href: '/services', icon: '🛠️' }, { label: 'View Internships', href: '/careers', icon: '🎓' }, { label: 'Contact Support', href: '/contact', icon: '📧' }].map(a => (
                                    <Link key={a.href} href={a.href} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', borderRadius: 10, marginBottom: '0.5rem', background: 'rgba(255,255,255,0.03)', textDecoration: 'none', transition: 'background 0.2s' }}>
                                        <span style={{ fontSize: '1.25rem' }}>{a.icon}</span>
                                        <span style={{ color: '#E8E9FF', fontWeight: 500, fontSize: '0.9rem' }}>{a.label}</span>
                                        <span style={{ marginLeft: 'auto', color: '#9495B8' }}>→</span>
                                    </Link>
                                ))}
                            </div>
                            {/* Recent application */}
                            <div className="glass-card" style={{ padding: '2rem' }}>
                                <h3 style={{ fontWeight: 700, marginBottom: '1.25rem', fontSize: '1.05rem' }}>Recent Application</h3>
                                {data?.applications?.length > 0 ? (
                                    <div>
                                        <div style={{ fontWeight: 600, color: '#E8E9FF', marginBottom: '0.35rem' }}>{data.applications[0]?.internshipId?.title || 'Internship'}</div>
                                        <span className="badge" style={{ background: 'rgba(67,233,123,0.1)', color: '#43E97B', borderColor: 'rgba(67,233,123,0.3)' }}>{data.applications[0]?.status}</span>
                                    </div>
                                ) : (
                                    <div style={{ color: '#9495B8', fontSize: '0.875rem' }}>No applications yet. <Link href="/careers" style={{ color: '#6C63FF', textDecoration: 'none' }}>Apply for an internship →</Link></div>
                                )}
                            </div>
                        </div>
                    )}

                    {tab === 'services' && (
                        <div>
                            {data?.selectedServices?.length > 0 ? (
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                                    {data.selectedServices.map(s => (
                                        <div key={s._id} className="glass-card" style={{ padding: '1.5rem' }}>
                                            <div style={{ fontSize: '1.75rem', marginBottom: '0.75rem' }}>{s.icon || '🛠️'}</div>
                                            <h4 style={{ fontWeight: 600, color: '#E8E9FF', marginBottom: '0.35rem' }}>{s.title}</h4>
                                            <Link href={`/services/${s.slug}`} style={{ color: '#6C63FF', fontSize: '0.85rem', fontWeight: 500, textDecoration: 'none' }}>View details →</Link>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="glass-card" style={{ padding: '3rem', textAlign: 'center' }}>
                                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🛠️</div>
                                    <p style={{ color: '#9495B8', marginBottom: '1.5rem' }}>You haven't selected any services yet.</p>
                                    <Link href="/services" className="btn-primary">Browse Services</Link>
                                </div>
                            )}
                        </div>
                    )}

                    {tab === 'applications' && (
                        <div>
                            {data?.applications?.length > 0 ? (
                                <div style={{ display: 'grid', gap: '1rem' }}>
                                    {data.applications.map(app => (
                                        <div key={app._id} className="glass-card" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                                            <div>
                                                <h4 style={{ fontWeight: 600, color: '#E8E9FF', marginBottom: '0.25rem' }}>{app.internshipId?.title || 'Internship'}</h4>
                                                <p style={{ color: '#9495B8', fontSize: '0.875rem' }}>Duration: {app.internshipId?.duration}</p>
                                                <p style={{ color: '#9495B8', fontSize: '0.825rem', marginTop: '0.2rem' }}>Applied: {new Date(app.createdAt).toLocaleDateString()}</p>
                                            </div>
                                            <span className="badge" style={{ background: app.status === 'active' ? 'rgba(67,233,123,0.1)' : 'rgba(108,99,255,0.1)', color: app.status === 'active' ? '#43E97B' : '#9f8fff', borderColor: app.status === 'active' ? 'rgba(67,233,123,0.3)' : 'rgba(108,99,255,0.3)' }}>
                                                {app.status}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="glass-card" style={{ padding: '3rem', textAlign: 'center' }}>
                                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎓</div>
                                    <p style={{ color: '#9495B8', marginBottom: '1.5rem' }}>No applications yet.</p>
                                    <Link href="/careers" className="btn-primary">Apply for Internship</Link>
                                </div>
                            )}
                        </div>
                    )}

                    {tab === 'payments' && (
                        <div>
                            {data?.payments?.length > 0 ? (
                                <div style={{ display: 'grid', gap: '1rem' }}>
                                    {data.payments.map(pay => (
                                        <div key={pay._id} className="glass-card" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                                            <div>
                                                <h4 style={{ fontWeight: 600, color: '#E8E9FF', marginBottom: '0.25rem' }}>{pay.internshipId?.title || 'Payment'}</h4>
                                                <p style={{ color: '#9495B8', fontSize: '0.825rem' }}>{new Date(pay.createdAt).toLocaleDateString()}</p>
                                                {pay.paymentId && <p style={{ color: '#9495B8', fontSize: '0.775rem', marginTop: '0.2rem' }}>ID: {pay.paymentId}</p>}
                                            </div>
                                            <div style={{ textAlign: 'right' }}>
                                                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#43E97B', fontFamily: 'Space Grotesk' }}>₹{pay.amount}</div>
                                                <span className="badge" style={{ marginTop: '0.35rem', background: pay.status === 'paid' ? 'rgba(67,233,123,0.1)' : 'rgba(255,101,132,0.1)', color: pay.status === 'paid' ? '#43E97B' : '#FF6584', borderColor: pay.status === 'paid' ? 'rgba(67,233,123,0.3)' : 'rgba(255,101,132,0.3)', fontSize: '0.7rem' }}>{pay.status}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="glass-card" style={{ padding: '3rem', textAlign: 'center' }}>
                                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💳</div>
                                    <p style={{ color: '#9495B8', marginBottom: '1.5rem' }}>No payment history yet.</p>
                                    <Link href="/careers" className="btn-primary">Browse Internships</Link>
                                </div>
                            )}
                        </div>
                    )}

                    {tab === 'chatbot' && (
                        <ChatbotPanel />
                    )}
                </div>
            </main>
            <Footer />
        </>
    );
}

function ChatbotPanel() {
    const [messages, setMessages] = useState([
        { text: 'Hi! I\'m the DigiPratham support assistant. How can I help you today?', isAdmin: true, time: new Date() }
    ]);
    const [input, setInput] = useState('');
    const [sending, setSending] = useState(false);

    const send = async () => {
        if (!input.trim()) return;
        const userMsg = { text: input, isAdmin: false, time: new Date() };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setSending(true);
        try {
            const { sendMessage } = await import('../lib/api');
            await sendMessage({ message: input });
            setTimeout(() => {
                setMessages(prev => [...prev, { text: "Thanks for your message! Our team will respond shortly. Is there anything else I can help with?", isAdmin: true, time: new Date() }]);
                setSending(false);
            }, 800);
        } catch {
            setSending(false);
        }
    };

    return (
        <div className="glass-card" style={{ maxWidth: 700, overflow: 'hidden' }}>
            <div style={{ background: 'linear-gradient(135deg, rgba(108,99,255,0.2), rgba(255,101,132,0.1))', padding: '1.25rem 1.5rem', borderBottom: '1px solid rgba(108,99,255,0.2)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg,#6C63FF,#FF6584)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem' }}>🤖</div>
                <div>
                    <div style={{ fontWeight: 700, color: '#E8E9FF' }}>DigiPratham Support</div>
                    <div style={{ fontSize: '0.75rem', color: '#43E97B', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#43E97B' }} /> Online
                    </div>
                </div>
            </div>

            <div style={{ height: 380, overflowY: 'auto', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {messages.map((msg, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: msg.isAdmin ? 'flex-start' : 'flex-end' }}>
                        <div style={{
                            maxWidth: '75%', padding: '0.75rem 1rem', borderRadius: msg.isAdmin ? '4px 14px 14px 14px' : '14px 4px 14px 14px',
                            background: msg.isAdmin ? 'rgba(108,99,255,0.15)' : 'linear-gradient(135deg,#6C63FF,#9f8fff)',
                            color: '#E8E9FF', fontSize: '0.9rem', lineHeight: 1.5,
                        }}>
                            {msg.text}
                            <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)', marginTop: '0.25rem', textAlign: 'right' }}>
                                {new Date(msg.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                        </div>
                    </div>
                ))}
                {sending && (
                    <div style={{ display: 'flex', gap: '0.35rem', padding: '0.75rem 1rem', background: 'rgba(108,99,255,0.1)', borderRadius: '4px 14px 14px 14px', width: 'fit-content' }}>
                        {[0, 1, 2].map(i => (
                            <div key={i} style={{ width: 7, height: 7, borderRadius: '50%', background: '#6C63FF', animation: `bounce 0.8s ${i * 0.15}s ease-in-out infinite` }} />
                        ))}
                    </div>
                )}
            </div>

            <div style={{ padding: '1rem 1.25rem', borderTop: '1px solid rgba(108,99,255,0.15)', display: 'flex', gap: '0.75rem' }}>
                <input
                    className="input-field" placeholder="Type a message..." value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && send()}
                    style={{ flex: 1 }}
                />
                <button onClick={send} className="btn-primary" style={{ padding: '0.75rem 1.25rem', fontWeight: 600 }}>Send</button>
            </div>
            <style>{`@keyframes bounce { 0%,80%,100%{transform:scale(0.8)} 40%{transform:scale(1.2)} }`}</style>
        </div>
    );
}

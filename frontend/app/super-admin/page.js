'use client';
import { useState, useEffect } from 'react';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// ── Helpers ───────────────────────────────────────────────────────────────────
const authFetch = async (path, opts = {}) => {
    const token = sessionStorage.getItem('sa_token');
    const res = await fetch(`${API}${path}`, {
        ...opts,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}`, ...(opts.headers || {}) },
    });
    return res.json();
};

// ── Login Screen ──────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }) {
    const [form, setForm] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); setError('');
        try {
            const res = await fetch(`${API}/api/admin/super-login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Login failed');
            sessionStorage.setItem('sa_token', data.token);
            sessionStorage.setItem('sa_user', JSON.stringify(data.user));
            onLogin(data.user);
        } catch (err) { setError(err.message); }
        setLoading(false);
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#07061A', position: 'relative', overflow: 'hidden' }}>
            {/* Animated background orbs */}
            <div style={{ position: 'absolute', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(108,99,255,0.15) 0%, transparent 70%)', top: '-20%', left: '-10%', animation: 'float1 8s ease-in-out infinite' }} />
            <div style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,101,132,0.1) 0%, transparent 70%)', bottom: '-10%', right: '-5%', animation: 'float2 10s ease-in-out infinite' }} />

            <div style={{ width: '100%', maxWidth: 440, padding: '0 1.5rem', position: 'relative', zIndex: 2 }}>
                {/* Logo */}
                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                    <div style={{ width: 72, height: 72, borderRadius: 20, background: 'linear-gradient(135deg,#6C63FF,#FF6584)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', margin: '0 auto 1.25rem', boxShadow: '0 20px 60px rgba(108,99,255,0.4)' }}>⚡</div>
                    <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em' }}>Super Admin</h1>
                    <p style={{ color: '#9495B8', marginTop: '0.4rem', fontSize: '0.9rem' }}>DigiPratham Control Center</p>
                </div>

                <form onSubmit={handleSubmit} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(108,99,255,0.25)', borderRadius: 20, padding: '2.5rem', backdropFilter: 'blur(20px)' }}>
                    {error && <div style={{ background: 'rgba(255,101,132,0.12)', border: '1px solid rgba(255,101,132,0.3)', borderRadius: 10, padding: '0.875rem 1rem', marginBottom: '1.5rem', color: '#FF6584', fontSize: '0.875rem' }}>{error}</div>}

                    {[{ key: 'email', label: 'Admin Email', type: 'email', ph: 'admin@digipratham.com' },
                    { key: 'password', label: 'Password', type: 'password', ph: '••••••••' }].map(f => (
                        <div key={f.key} style={{ marginBottom: '1.25rem' }}>
                            <label style={{ display: 'block', color: '#9495B8', fontSize: '0.82rem', marginBottom: '0.4rem', fontWeight: 500, letterSpacing: '0.02em' }}>{f.label}</label>
                            <input type={f.type} placeholder={f.ph} required value={form[f.key]}
                                onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                                style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(108,99,255,0.3)', borderRadius: 10, padding: '0.85rem 1rem', color: '#E8E9FF', fontSize: '0.925rem', outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit' }}
                            />
                        </div>
                    ))}

                    <button type="submit" disabled={loading} style={{ width: '100%', padding: '0.9rem', background: 'linear-gradient(135deg,#6C63FF,#9f65ff)', border: 'none', borderRadius: 12, color: '#fff', fontWeight: 700, fontSize: '1rem', cursor: loading ? 'default' : 'pointer', marginTop: '0.5rem', boxShadow: '0 8px 32px rgba(108,99,255,0.4)', transition: 'all 0.2s' }}>
                        {loading ? '🔐 Authenticating...' : '⚡ Access Control Center'}
                    </button>
                </form>

                <p style={{ textAlign: 'center', color: '#5A5B7A', fontSize: '0.78rem', marginTop: '1.5rem' }}>Super admin access only — credentials managed via environment variables</p>
            </div>

            <style>{`
                @keyframes float1 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-30px)} }
                @keyframes float2 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(25px)} }
            `}</style>
        </div>
    );
}

// ── Stat Card ─────────────────────────────────────────────────────────────────
function StatCard({ icon, label, value, color, sub }) {
    return (
        <div style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${color}30`, borderRadius: 16, padding: '1.5rem', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: -20, right: -20, width: 80, height: 80, borderRadius: '50%', background: `${color}12` }} />
            <div style={{ fontSize: '1.75rem', marginBottom: '0.75rem' }}>{icon}</div>
            <div style={{ fontSize: '2.25rem', fontWeight: 800, color, fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '-0.03em' }}>{value}</div>
            <div style={{ color: '#9495B8', fontSize: '0.8rem', marginTop: '0.25rem', fontWeight: 500 }}>{label}</div>
            {sub && <div style={{ color: color, fontSize: '0.72rem', marginTop: '0.4rem', fontWeight: 600 }}>{sub}</div>}
        </div>
    );
}

// ── Main Admin Dashboard ──────────────────────────────────────────────────────
function AdminDashboard({ user, onLogout }) {
    const [tab, setTab] = useState('overview');
    const [stats, setStats] = useState(null);
    const [users, setUsers] = useState([]);
    const [applications, setApplications] = useState([]);
    const [payments, setPayments] = useState([]);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchUser, setSearchUser] = useState('');
    const [replyText, setReplyText] = useState('');

    const loadData = async () => {
        setLoading(true);
        try {
            const [s, u, a, p, m] = await Promise.all([
                authFetch('/api/admin/stats'),
                authFetch('/api/admin/users'),
                authFetch('/api/admin/applications'),
                authFetch('/api/admin/payments'),
                authFetch('/api/admin/messages'),
            ]);
            setStats(s); setUsers(u.users || []); setApplications(Array.isArray(a) ? a : []);
            setPayments(Array.isArray(p) ? p : []); setMessages(Array.isArray(m) ? m : []);
        } catch (e) { console.error(e); }
        setLoading(false);
    };

    useEffect(() => { loadData(); }, []);

    const deleteUser = async (id) => {
        if (!confirm('Delete this user?')) return;
        await authFetch(`/api/admin/users/${id}`, { method: 'DELETE' });
        setUsers(prev => prev.filter(u => u._id !== id));
    };

    const updateAppStatus = async (id, status) => {
        await authFetch(`/api/admin/applications/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) });
        setApplications(prev => prev.map(a => a._id === id ? { ...a, status } : a));
    };

    const sendReply = async (room) => {
        if (!replyText.trim()) return;
        await authFetch('/api/admin/messages/reply', { method: 'POST', body: JSON.stringify({ room, message: replyText }) });
        setReplyText('');
        alert('Reply sent!');
    };

    const totalRevenue = payments.filter(p => p.status === 'paid').reduce((s, p) => s + (p.amount || 0), 0);
    const filteredUsers = users.filter(u => u.name?.toLowerCase().includes(searchUser.toLowerCase()) || u.email?.toLowerCase().includes(searchUser.toLowerCase()));

    const sidebar = [
        { key: 'overview', icon: '📊', label: 'Overview' },
        { key: 'users', icon: '👥', label: 'Users' },
        { key: 'applications', icon: '🎓', label: 'Applications' },
        { key: 'payments', icon: '💳', label: 'Payments' },
        { key: 'messages', icon: '💬', label: 'Messages' },
    ];

    return (
        <div style={{ minHeight: '100vh', background: '#07061A', display: 'flex', fontFamily: "'Space Grotesk', 'Inter', sans-serif" }}>
            {/* Sidebar */}
            <div style={{ width: 240, background: 'rgba(255,255,255,0.03)', borderRight: '1px solid rgba(108,99,255,0.15)', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
                {/* Logo */}
                <div style={{ padding: '1.75rem 1.5rem', borderBottom: '1px solid rgba(108,99,255,0.15)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{ width: 38, height: 38, borderRadius: 10, background: 'linear-gradient(135deg,#6C63FF,#FF6584)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', flexShrink: 0 }}>⚡</div>
                        <div>
                            <div style={{ fontWeight: 800, color: '#E8E9FF', fontSize: '0.95rem', letterSpacing: '-0.02em' }}>DigiPratham</div>
                            <div style={{ fontSize: '0.7rem', color: '#6C63FF', fontWeight: 600 }}>SUPER ADMIN</div>
                        </div>
                    </div>
                </div>

                {/* Nav */}
                <nav style={{ padding: '1rem 0.75rem', flex: 1 }}>
                    {sidebar.map(s => (
                        <button key={s.key} onClick={() => setTab(s.key)} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', borderRadius: 10, border: 'none', background: tab === s.key ? 'linear-gradient(135deg,rgba(108,99,255,0.2),rgba(255,101,132,0.1))' : 'transparent', color: tab === s.key ? '#E8E9FF' : '#9495B8', cursor: 'pointer', fontSize: '0.875rem', fontWeight: tab === s.key ? 600 : 400, marginBottom: '0.25rem', transition: 'all 0.2s', textAlign: 'left', borderLeft: tab === s.key ? '3px solid #6C63FF' : '3px solid transparent' }}>
                            <span style={{ fontSize: '1rem' }}>{s.icon}</span> {s.label}
                        </button>
                    ))}
                </nav>

                {/* User info + logout */}
                <div style={{ padding: '1rem 1.25rem', borderTop: '1px solid rgba(108,99,255,0.15)' }}>
                    <div style={{ fontSize: '0.75rem', color: '#5A5B7A', marginBottom: '0.75rem', fontWeight: 500 }}>Signed in as</div>
                    <div style={{ fontSize: '0.82rem', color: '#9495B8', marginBottom: '1rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user?.email}</div>
                    <button onClick={onLogout} style={{ width: '100%', padding: '0.6rem', background: 'rgba(255,101,132,0.1)', border: '1px solid rgba(255,101,132,0.25)', borderRadius: 8, color: '#FF6584', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer' }}>
                        Sign Out
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div style={{ flex: 1, overflow: 'auto' }}>
                {/* Top bar */}
                <div style={{ padding: '1.25rem 2rem', borderBottom: '1px solid rgba(108,99,255,0.12)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.02)', backdropFilter: 'blur(12px)', position: 'sticky', top: 0, zIndex: 10 }}>
                    <div>
                        <h1 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#E8E9FF', margin: 0, letterSpacing: '-0.02em' }}>
                            {sidebar.find(s => s.key === tab)?.icon} {sidebar.find(s => s.key === tab)?.label}
                        </h1>
                        <p style={{ color: '#5A5B7A', fontSize: '0.78rem', margin: '0.1rem 0 0' }}>
                            {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                    </div>
                    <button onClick={loadData} style={{ background: 'rgba(108,99,255,0.15)', border: '1px solid rgba(108,99,255,0.3)', borderRadius: 8, padding: '0.5rem 1rem', color: '#9f8fff', fontSize: '0.82rem', cursor: 'pointer', fontWeight: 600 }}>
                        🔄 Refresh
                    </button>
                </div>

                <div style={{ padding: '2rem' }}>
                    {loading && (
                        <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem', color: '#9495B8' }}>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ width: 40, height: 40, border: '3px solid #6C63FF', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 1rem' }} />
                                Loading data...
                            </div>
                        </div>
                    )}

                    {/* ── Overview ── */}
                    {!loading && tab === 'overview' && (
                        <div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
                                <StatCard icon="👥" label="Total Users" value={stats?.users || 0} color="#6C63FF" sub="Registered accounts" />
                                <StatCard icon="🎓" label="Applications" value={stats?.applications || 0} color="#FF6584" sub="Internship applications" />
                                <StatCard icon="💰" label="Revenue" value={`₹${totalRevenue.toLocaleString()}`} color="#43E97B" sub="Total payments received" />
                                <StatCard icon="💬" label="Unread Msgs" value={stats?.unreadMessages || 0} color="#FFB347" sub="Pending support queries" />
                            </div>

                            {/* Recent users */}
                            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(108,99,255,0.15)', borderRadius: 16, overflow: 'hidden', marginBottom: '1.5rem' }}>
                                <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid rgba(108,99,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <h3 style={{ color: '#E8E9FF', fontWeight: 700, margin: 0, fontSize: '0.95rem' }}>🆕 Recent Users</h3>
                                    <button onClick={() => setTab('users')} style={{ background: 'none', border: 'none', color: '#6C63FF', fontSize: '0.8rem', cursor: 'pointer', fontWeight: 600 }}>View all →</button>
                                </div>
                                <div>
                                    {users.slice(0, 5).map(u => (
                                        <div key={u._id} style={{ padding: '1rem 1.5rem', borderBottom: '1px solid rgba(108,99,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
                                                <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg,#6C63FF,#FF6584)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#fff', fontSize: '0.85rem' }}>
                                                    {u.name?.[0]?.toUpperCase()}
                                                </div>
                                                <div>
                                                    <div style={{ color: '#E8E9FF', fontWeight: 600, fontSize: '0.875rem' }}>{u.name}</div>
                                                    <div style={{ color: '#5A5B7A', fontSize: '0.75rem' }}>{u.email}</div>
                                                </div>
                                            </div>
                                            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                                {u.isAdmin && <span style={{ background: 'rgba(108,99,255,0.2)', color: '#9f8fff', borderRadius: 6, padding: '0.2rem 0.6rem', fontSize: '0.68rem', fontWeight: 700 }}>ADMIN</span>}
                                                {u.isVerified && <span style={{ background: 'rgba(67,233,123,0.15)', color: '#43E97B', borderRadius: 6, padding: '0.2rem 0.6rem', fontSize: '0.68rem', fontWeight: 700 }}>✓ Verified</span>}
                                                <span style={{ color: '#5A5B7A', fontSize: '0.72rem' }}>{new Date(u.createdAt).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Recent payments */}
                            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(108,99,255,0.15)', borderRadius: 16, overflow: 'hidden' }}>
                                <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid rgba(108,99,255,0.1)' }}>
                                    <h3 style={{ color: '#E8E9FF', fontWeight: 700, margin: 0, fontSize: '0.95rem' }}>💳 Recent Payments</h3>
                                </div>
                                {payments.slice(0, 5).map(p => (
                                    <div key={p._id} style={{ padding: '1rem 1.5rem', borderBottom: '1px solid rgba(108,99,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div>
                                            <div style={{ color: '#E8E9FF', fontSize: '0.875rem', fontWeight: 600 }}>{p.userId?.name || 'User'}</div>
                                            <div style={{ color: '#5A5B7A', fontSize: '0.75rem' }}>{p.internshipId?.title || 'Internship'} · {new Date(p.createdAt).toLocaleDateString()}</div>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <div style={{ fontWeight: 800, color: '#43E97B', fontFamily: 'Space Grotesk' }}>₹{p.amount}</div>
                                            <span style={{ fontSize: '0.68rem', color: p.status === 'paid' ? '#43E97B' : '#9495B8', fontWeight: 700 }}>{p.status?.toUpperCase()}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* ── Users ── */}
                    {!loading && tab === 'users' && (
                        <div>
                            <input
                                placeholder="🔍 Search users by name or email..."
                                value={searchUser}
                                onChange={e => setSearchUser(e.target.value)}
                                style={{ width: '100%', maxWidth: 400, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(108,99,255,0.3)', borderRadius: 10, padding: '0.75rem 1rem', color: '#E8E9FF', fontSize: '0.875rem', outline: 'none', marginBottom: '1.5rem', boxSizing: 'border-box', fontFamily: 'inherit' }}
                            />
                            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(108,99,255,0.15)', borderRadius: 16, overflow: 'hidden' }}>
                                <div style={{ padding: '0.875rem 1.5rem', background: 'rgba(108,99,255,0.08)', display: 'grid', gridTemplateColumns: '1fr 1fr 120px 120px 80px', gap: '1rem', fontSize: '0.72rem', color: '#5A5B7A', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                                    <span>Name</span><span>Email</span><span>Role</span><span>Verified</span><span>Action</span>
                                </div>
                                {filteredUsers.map(u => (
                                    <div key={u._id} style={{ padding: '1rem 1.5rem', borderBottom: '1px solid rgba(108,99,255,0.08)', display: 'grid', gridTemplateColumns: '1fr 1fr 120px 120px 80px', gap: '1rem', alignItems: 'center' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                                            <div style={{ width: 32, height: 32, borderRadius: '50%', background: `linear-gradient(135deg,#6C63FF,#FF6584)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#fff', fontSize: '0.75rem', flexShrink: 0 }}>{u.name?.[0]?.toUpperCase()}</div>
                                            <span style={{ color: '#E8E9FF', fontSize: '0.875rem', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{u.name}</span>
                                        </div>
                                        <span style={{ color: '#9495B8', fontSize: '0.8rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{u.email}</span>
                                        <span style={{ fontSize: '0.72rem', fontWeight: 700, color: u.isAdmin ? '#9f8fff' : '#9495B8' }}>{u.isAdmin ? '👑 Admin' : 'User'}</span>
                                        <span style={{ fontSize: '0.72rem', fontWeight: 700, color: u.isVerified ? '#43E97B' : '#FF6584' }}>{u.isVerified ? '✓ Verified' : '✗ Unverified'}</span>
                                        <button onClick={() => deleteUser(u._id)} style={{ background: 'rgba(255,101,132,0.15)', border: '1px solid rgba(255,101,132,0.3)', borderRadius: 6, padding: '0.3rem 0.65rem', color: '#FF6584', fontSize: '0.75rem', cursor: 'pointer', fontWeight: 600 }}>Delete</button>
                                    </div>
                                ))}
                                {filteredUsers.length === 0 && <div style={{ padding: '3rem', textAlign: 'center', color: '#5A5B7A' }}>No users found</div>}
                            </div>
                        </div>
                    )}

                    {/* ── Applications ── */}
                    {!loading && tab === 'applications' && (
                        <div style={{ display: 'grid', gap: '1rem' }}>
                            {applications.map(app => (
                                <div key={app._id} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(108,99,255,0.15)', borderRadius: 16, padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                                    <div>
                                        <div style={{ fontWeight: 700, color: '#E8E9FF', marginBottom: '0.25rem' }}>{app.userId?.name || '—'}</div>
                                        <div style={{ color: '#9495B8', fontSize: '0.82rem' }}>{app.userId?.email}</div>
                                        <div style={{ color: '#6C63FF', fontSize: '0.8rem', marginTop: '0.4rem', fontWeight: 600 }}>{app.internshipId?.title} · {app.internshipId?.duration}</div>
                                        <div style={{ color: '#5A5B7A', fontSize: '0.72rem', marginTop: '0.2rem' }}>{new Date(app.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                                        <span style={{ padding: '0.3rem 0.85rem', borderRadius: 8, fontSize: '0.75rem', fontWeight: 700, background: app.status === 'active' ? 'rgba(67,233,123,0.15)' : 'rgba(108,99,255,0.15)', color: app.status === 'active' ? '#43E97B' : '#9f8fff' }}>{app.status}</span>
                                        {['active', 'completed', 'cancelled'].map(s => (
                                            <button key={s} onClick={() => updateAppStatus(app._id, s)} style={{ background: 'rgba(108,99,255,0.1)', border: '1px solid rgba(108,99,255,0.25)', borderRadius: 6, padding: '0.3rem 0.65rem', color: '#9f8fff', fontSize: '0.72rem', cursor: 'pointer', fontWeight: 600 }}>→{s}</button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                            {applications.length === 0 && <div style={{ textAlign: 'center', padding: '4rem', color: '#5A5B7A' }}>No applications yet</div>}
                        </div>
                    )}

                    {/* ── Payments ── */}
                    {!loading && tab === 'payments' && (
                        <div>
                            <div style={{ background: 'rgba(67,233,123,0.08)', border: '1px solid rgba(67,233,123,0.2)', borderRadius: 12, padding: '1rem 1.5rem', marginBottom: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                <span style={{ fontSize: '1.5rem' }}>💰</span>
                                <div>
                                    <div style={{ color: '#43E97B', fontWeight: 800, fontSize: '1.5rem', fontFamily: 'Space Grotesk' }}>₹{totalRevenue.toLocaleString()}</div>
                                    <div style={{ color: '#9495B8', fontSize: '0.8rem' }}>Total revenue from {payments.filter(p => p.status === 'paid').length} paid transactions</div>
                                </div>
                            </div>
                            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(108,99,255,0.15)', borderRadius: 16, overflow: 'hidden' }}>
                                {payments.map(p => (
                                    <div key={p._id} style={{ padding: '1.1rem 1.5rem', borderBottom: '1px solid rgba(108,99,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
                                        <div>
                                            <div style={{ fontWeight: 600, color: '#E8E9FF', fontSize: '0.875rem' }}>{p.userId?.name || 'User'}</div>
                                            <div style={{ color: '#5A5B7A', fontSize: '0.75rem' }}>{p.userId?.email} · {p.internshipId?.title}</div>
                                            <div style={{ color: '#5A5B7A', fontSize: '0.72rem', marginTop: '0.15rem' }}>ID: {p.orderId?.slice(0, 24)}...</div>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <div style={{ fontWeight: 800, color: '#43E97B', fontFamily: 'Space Grotesk', fontSize: '1.1rem' }}>₹{p.amount}</div>
                                            <span style={{ fontSize: '0.7rem', fontWeight: 700, color: p.status === 'paid' ? '#43E97B' : '#FF6584', background: p.status === 'paid' ? 'rgba(67,233,123,0.1)' : 'rgba(255,101,132,0.1)', padding: '0.15rem 0.5rem', borderRadius: 4 }}>{p.status?.toUpperCase()}</span>
                                            <div style={{ color: '#5A5B7A', fontSize: '0.72rem', marginTop: '0.2rem' }}>{new Date(p.createdAt).toLocaleDateString()}</div>
                                        </div>
                                    </div>
                                ))}
                                {payments.length === 0 && <div style={{ padding: '3rem', textAlign: 'center', color: '#5A5B7A' }}>No payments yet</div>}
                            </div>
                        </div>
                    )}

                    {/* ── Messages ── */}
                    {!loading && tab === 'messages' && (
                        <div style={{ display: 'grid', gap: '1rem' }}>
                            {messages.map((m, i) => (
                                <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(108,99,255,0.15)', borderRadius: 16, padding: '1.5rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                                        <div>
                                            <div style={{ fontWeight: 700, color: '#E8E9FF', fontSize: '0.875rem' }}>Room: {m.room}</div>
                                            <div style={{ color: '#9495B8', fontSize: '0.8rem', marginTop: '0.2rem' }}>Last: {m.lastMessage?.message?.slice(0, 80)}...</div>
                                        </div>
                                        {m.unread > 0 && <span style={{ background: 'rgba(255,179,71,0.2)', color: '#FFB347', borderRadius: 20, padding: '0.2rem 0.7rem', fontSize: '0.72rem', fontWeight: 700 }}>{m.unread} unread</span>}
                                    </div>
                                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                                        <input
                                            placeholder="Type a reply..."
                                            value={replyText}
                                            onChange={e => setReplyText(e.target.value)}
                                            style={{ flex: 1, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(108,99,255,0.25)', borderRadius: 8, padding: '0.65rem 0.875rem', color: '#E8E9FF', fontSize: '0.85rem', outline: 'none', fontFamily: 'inherit' }}
                                        />
                                        <button onClick={() => sendReply(m.room)} style={{ background: 'linear-gradient(135deg,#6C63FF,#9f65ff)', border: 'none', borderRadius: 8, padding: '0.65rem 1.25rem', color: '#fff', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer' }}>Send</button>
                                    </div>
                                </div>
                            ))}
                            {messages.length === 0 && <div style={{ textAlign: 'center', padding: '4rem', color: '#5A5B7A' }}>No messages yet</div>}
                        </div>
                    )}
                </div>
            </div>

            <style>{`
                @keyframes spin { to { transform: rotate(360deg); } }
                * { scrollbar-width: thin; scrollbar-color: #6C63FF22 transparent; }
            `}</style>
        </div>
    );
}

// ── Root ──────────────────────────────────────────────────────────────────────
export default function SuperAdminPage() {
    const [user, setUser] = useState(null);
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        const token = sessionStorage.getItem('sa_token');
        const stored = sessionStorage.getItem('sa_user');
        if (token && stored) {
            try { setUser(JSON.parse(stored)); } catch { }
        }
        setChecked(true);
    }, []);

    const logout = () => { sessionStorage.removeItem('sa_token'); sessionStorage.removeItem('sa_user'); setUser(null); };

    if (!checked) return null;
    if (!user) return <LoginScreen onLogin={setUser} />;
    return <AdminDashboard user={user} onLogout={logout} />;
}

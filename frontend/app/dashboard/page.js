'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// ── Premium Offer Letter PDF Generator ──────────────────────────────────────
async function generateOfferLetterPDF(data) {
    const { jsPDF } = await import('jspdf');
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const W = 210;
    const margin = 18;

    // ── Background ────────────────────────────────────────────────────────────
    doc.setFillColor(10, 9, 26);
    doc.rect(0, 0, W, 297, 'F');

    // ── Top gradient header block ─────────────────────────────────────────────
    // Purple band
    doc.setFillColor(62, 50, 168);
    doc.rect(0, 0, W, 52, 'F');
    // Accent overlay
    doc.setFillColor(124, 111, 255);
    doc.rect(0, 0, 70, 52, 'F');
    // Bottom accent line
    doc.setFillColor(255, 107, 157);
    doc.rect(0, 52, W, 3, 'F');

    // Company name
    doc.setFontSize(28);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(255, 255, 255);
    doc.text('DigiPratham', margin, 26);

    // Tagline
    doc.setFontSize(9.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(200, 190, 255);
    doc.text('AI-First Digital Solutions', margin, 35);
    doc.text('www.digipratham.in', margin, 43);

    // Right header info
    doc.setFontSize(8.5);
    doc.setTextColor(220, 215, 255);
    const issuedStr = new Date(data.issuedAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' });
    doc.text(`Date: ${issuedStr}`, W - margin, 22, { align: 'right' });
    doc.text(`Ref: DP-${data.applicationId?.toString().slice(-6).toUpperCase()}`, W - margin, 30, { align: 'right' });
    doc.text('internships@digipratham.in', W - margin, 38, { align: 'right' });

    // ── OFFER LETTER title banner ─────────────────────────────────────────────
    doc.setFillColor(22, 18, 52);
    doc.rect(0, 55, W, 20, 'F');
    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(167, 139, 250);
    doc.text('✦  INTERNSHIP OFFER LETTER  ✦', W / 2, 68, { align: 'center' });

    // ── Body ──────────────────────────────────────────────────────────────────
    let y = 90;

    // Greeting
    doc.setFontSize(11.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(220, 218, 255);
    doc.text(`Dear ${data.studentName},`, margin, y);
    y += 10;

    const opening = `We are delighted to offer you an internship position at DigiPratham in the ${data.internshipTitle} program — domain: ${data.domain}. Upon reviewing your application and confirming your payment, we warmly welcome you to our team.`;
    doc.setFontSize(10);
    doc.setTextColor(160, 155, 210);
    const openLines = doc.splitTextToSize(opening, W - margin * 2);
    doc.text(openLines, margin, y);
    y += openLines.length * 5.8 + 8;

    // ── Details table ─────────────────────────────────────────────────────────
    const details = [
        ['Intern Name', data.studentName],
        ['Email', data.studentEmail],
        ['Domain', data.domain],
        ['Program', data.internshipTitle],
        ['Duration', data.duration],
        ['Amount Paid', `\u20B9${data.amount}`],
        ['Payment ID', data.paymentId || 'N/A'],
    ];

    const tableX = margin;
    const tableW = W - margin * 2;
    const rowH = 9;

    // Table header
    doc.setFillColor(62, 50, 168);
    doc.roundedRect(tableX, y, tableW, rowH, 2, 2, 'F');
    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(255, 255, 255);
    doc.text('INTERNSHIP DETAILS', tableX + tableW / 2, y + 6, { align: 'center' });
    y += rowH;

    details.forEach(([label, value], idx) => {
        const even = idx % 2 === 0;
        doc.setFillColor(even ? 20 : 28, even ? 16 : 22, even ? 52 : 65);
        doc.rect(tableX, y, tableW, rowH, 'F');

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8.5);
        doc.setTextColor(167, 139, 250);
        doc.text(`${label}:`, tableX + 5, y + 6);

        doc.setFont('helvetica', 'normal');
        doc.setTextColor(220, 218, 255);
        doc.text(String(value), tableX + 60, y + 6);
        y += rowH;
    });

    // Table bottom border
    doc.setFillColor(124, 111, 255);
    doc.rect(tableX, y, tableW, 1.5, 'F');
    y += 12;

    // ── Terms ─────────────────────────────────────────────────────────────────
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(167, 139, 250);
    doc.text('TERMS & CONDITIONS', margin, y);
    y += 7;

    // Divider
    doc.setFillColor(62, 50, 168);
    doc.rect(margin, y, 80, 0.8, 'F');
    y += 5;

    const terms = [
        '•  Dedicate time as per the program schedule and complete all assigned tasks diligently.',
        `•  Upon successful completion, you will receive the ${data.certification}.`,
        '•  Maintain integrity and professionalism throughout the internship.',
        '•  Work produced remains intellectual property of DigiPratham Pvt. Ltd.',
    ];
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(140, 135, 195);
    terms.forEach(term => {
        const lines = doc.splitTextToSize(term, W - margin * 2);
        doc.text(lines, margin, y);
        y += lines.length * 5 + 2;
    });

    y += 8;

    // ── Closing paragraph ─────────────────────────────────────────────────────
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(160, 155, 210);
    const closing = 'We look forward to a productive internship experience. Reach out at any time for assistance or guidance — our team is always happy to help.';
    const closingLines = doc.splitTextToSize(closing, W - margin * 2);
    doc.text(closingLines, margin, y);
    y += closingLines.length * 5.5 + 10;

    // Regards
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(140, 135, 195);
    doc.text('Warm regards,', margin, y);
    y += 7;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(167, 139, 250);
    doc.text('DigiPratham Team', margin, y);
    y += 5;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(110, 108, 160);
    doc.text('internships@digipratham.in  |  www.digipratham.in', margin, y);

    // ── Signature block (right side) ──────────────────────────────────────────
    const sigY = y - 17;
    const sigX = W - margin - 62;
    doc.setFillColor(22, 18, 52);
    doc.setDrawColor(124, 111, 255);
    doc.roundedRect(sigX, sigY, 62, 26, 3, 3, 'FD');
    // Seal circle
    doc.setFillColor(62, 50, 168);
    doc.circle(sigX + 31, sigY + 9, 6, 'F');
    doc.setFontSize(7);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(255, 255, 255);
    doc.text('DP', sigX + 31, sigY + 11, { align: 'center' });
    doc.setFontSize(7.5);
    doc.setTextColor(167, 139, 250);
    doc.text('Authorised Signatory', sigX + 31, sigY + 19, { align: 'center' });
    doc.setTextColor(110, 108, 160);
    doc.text('DigiPratham Pvt. Ltd.', sigX + 31, sigY + 24, { align: 'center' });

    // ── Certificate badge ─────────────────────────────────────────────────────
    const certY = y + 10;
    doc.setFillColor(16, 14, 42);
    doc.setDrawColor(255, 185, 0);
    doc.roundedRect(margin, certY, W - margin * 2, 18, 3, 3, 'FD');
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(255, 200, 50);
    doc.text(`🏆  ${data.certification}`, W / 2, certY + 11, { align: 'center' });

    // ── Footer ────────────────────────────────────────────────────────────────
    doc.setFillColor(62, 50, 168);
    doc.rect(0, 278, W, 2, 'F');
    doc.setFillColor(10, 9, 26);
    doc.rect(0, 280, W, 17, 'F');
    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(110, 108, 160);
    doc.text('This is a digitally generated offer letter. For queries: internships@digipratham.in', W / 2, 287, { align: 'center' });
    doc.text('© 2025 DigiPratham Pvt. Ltd. All rights reserved.', W / 2, 293, { align: 'center' });

    doc.save(`DigiPratham_Offer_Letter_${data.studentName.replace(/\s+/g, '_')}.pdf`);
}

// ── Dashboard Page ────────────────────────────────────────────────────────────
export default function DashboardPage() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [tab, setTab] = useState('overview');
    const [downloadingId, setDownloadingId] = useState(null);
    const [successMsg, setSuccessMsg] = useState('');
    const router = useRouter();

    useEffect(() => {
        // Check for payment success message from careers page
        const msg = sessionStorage.getItem('dp_payment_success');
        if (msg) { setSuccessMsg(msg); sessionStorage.removeItem('dp_payment_success'); setTab('applications'); }

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

    const handleDownloadOffer = async (applicationId) => {
        setDownloadingId(applicationId);
        try {
            const { getOfferLetterData } = await import('../lib/api');
            const { data: offerData } = await getOfferLetterData(applicationId);
            await generateOfferLetterPDF(offerData);
        } catch (err) {
            alert(err?.response?.data?.error || 'Could not generate offer letter. Please try again.');
        }
        setDownloadingId(null);
    };

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

                    {/* Payment Success Banner */}
                    {successMsg && (
                        <div style={{ background: 'rgba(67,233,123,0.12)', border: '1px solid rgba(67,233,123,0.35)', borderRadius: 14, padding: '1.1rem 1.5rem', marginBottom: '1.75rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <span style={{ fontSize: '1.5rem' }}>🎉</span>
                            <div>
                                <div style={{ fontWeight: 700, color: '#43E97B', marginBottom: '0.2rem' }}>Payment Successful!</div>
                                <div style={{ color: '#9495B8', fontSize: '0.88rem' }}>{successMsg} Go to the <strong style={{ color: '#E8E9FF' }}>Applications</strong> tab to download your Offer Letter.</div>
                            </div>
                            <button onClick={() => setSuccessMsg('')} style={{ marginLeft: 'auto', background: 'none', border: 'none', color: '#9495B8', cursor: 'pointer', fontSize: '1.2rem' }}>✕</button>
                        </div>
                    )}

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

                    {/* ── Overview ── */}
                    {tab === 'overview' && (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
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
                            <div className="glass-card" style={{ padding: '2rem' }}>
                                <h3 style={{ fontWeight: 700, marginBottom: '1.25rem', fontSize: '1.05rem' }}>Recent Application</h3>
                                {data?.applications?.length > 0 ? (
                                    <div>
                                        <div style={{ fontWeight: 600, color: '#E8E9FF', marginBottom: '0.35rem' }}>{data.applications[0]?.internshipId?.title || 'Internship'}</div>
                                        <span className="badge" style={{ background: 'rgba(67,233,123,0.1)', color: '#43E97B', borderColor: 'rgba(67,233,123,0.3)' }}>{data.applications[0]?.status}</span>
                                        <div style={{ marginTop: '1rem' }}>
                                            <button
                                                onClick={() => handleDownloadOffer(data.applications[0]._id)}
                                                disabled={downloadingId === data.applications[0]._id}
                                                className="btn-primary"
                                                style={{ fontSize: '0.82rem', padding: '0.55rem 1rem' }}
                                            >
                                                {downloadingId === data.applications[0]._id ? '⏳ Generating...' : '📄 Download Offer Letter'}
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div style={{ color: '#9495B8', fontSize: '0.875rem' }}>No applications yet. <Link href="/careers" style={{ color: '#6C63FF', textDecoration: 'none' }}>Apply for an internship →</Link></div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* ── Services ── */}
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

                    {/* ── Applications ── */}
                    {tab === 'applications' && (
                        <div>
                            {data?.applications?.length > 0 ? (
                                <div style={{ display: 'grid', gap: '1rem' }}>
                                    {data.applications.map(app => (
                                        <div key={app._id} className="glass-card" style={{ padding: '1.75rem' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
                                                <div>
                                                    <h4 style={{ fontWeight: 700, color: '#E8E9FF', marginBottom: '0.3rem', fontSize: '1.05rem' }}>{app.internshipId?.title || 'Internship'}</h4>
                                                    <p style={{ color: '#9495B8', fontSize: '0.875rem' }}>Duration: {app.internshipId?.duration}</p>
                                                    <p style={{ color: '#9495B8', fontSize: '0.825rem', marginTop: '0.2rem' }}>Applied: {new Date(app.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
                                                </div>
                                                <span className="badge" style={{ background: app.status === 'active' ? 'rgba(67,233,123,0.1)' : 'rgba(108,99,255,0.1)', color: app.status === 'active' ? '#43E97B' : '#9f8fff', borderColor: app.status === 'active' ? 'rgba(67,233,123,0.3)' : 'rgba(108,99,255,0.3)', padding: '0.35rem 0.9rem' }}>
                                                    {app.status}
                                                </span>
                                            </div>

                                            {/* Offer Letter Download */}
                                            <div style={{ borderTop: '1px solid rgba(108,99,255,0.15)', paddingTop: '1.1rem', display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                                                <div style={{ flex: 1 }}>
                                                    <div style={{ fontSize: '0.82rem', color: '#9495B8', marginBottom: '0.2rem' }}>🏆 Certification upon completion</div>
                                                    <div style={{ fontSize: '0.82rem', color: '#6C63FF', fontWeight: 600 }}>
                                                        {app.internshipId?.duration?.includes('2') ? 'DigiPratham Certificate of Excellence' : 'DigiPratham Certificate of Completion'}
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => handleDownloadOffer(app._id)}
                                                    disabled={downloadingId === app._id}
                                                    style={{
                                                        display: 'flex', alignItems: 'center', gap: '0.5rem',
                                                        background: downloadingId === app._id
                                                            ? 'rgba(108,99,255,0.15)'
                                                            : 'linear-gradient(135deg, #6C63FF, #9f65ff)',
                                                        color: '#fff', border: 'none', borderRadius: 10,
                                                        padding: '0.65rem 1.35rem', fontWeight: 700,
                                                        fontSize: '0.88rem', cursor: downloadingId === app._id ? 'default' : 'pointer',
                                                        transition: 'all 0.2s', whiteSpace: 'nowrap',
                                                        boxShadow: downloadingId === app._id ? 'none' : '0 4px 16px rgba(108,99,255,0.35)',
                                                    }}
                                                >
                                                    {downloadingId === app._id ? (
                                                        <>
                                                            <span style={{ width: 14, height: 14, border: '2px solid #6C63FF', borderTopColor: 'transparent', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.7s linear infinite' }} />
                                                            Generating PDF...
                                                        </>
                                                    ) : (
                                                        '📄 Download Offer Letter'
                                                    )}
                                                </button>
                                            </div>
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

                    {/* ── Payments ── */}
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
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </>
    );
}

function ChatbotPanel() {
    const [messages, setMessages] = useState([
        { text: "Hi! I'm the DigiPratham support assistant. How can I help you today?", isAdmin: true, time: new Date() }
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
                        <div style={{ maxWidth: '75%', padding: '0.75rem 1rem', borderRadius: msg.isAdmin ? '4px 14px 14px 14px' : '14px 4px 14px 14px', background: msg.isAdmin ? 'rgba(108,99,255,0.15)' : 'linear-gradient(135deg,#6C63FF,#9f8fff)', color: '#E8E9FF', fontSize: '0.9rem', lineHeight: 1.5 }}>
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
                <input className="input-field" placeholder="Type a message..." value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} style={{ flex: 1 }} />
                <button onClick={send} className="btn-primary" style={{ padding: '0.75rem 1.25rem', fontWeight: 600 }}>Send</button>
            </div>
            <style>{`@keyframes bounce { 0%,80%,100%{transform:scale(0.8)} 40%{transform:scale(1.2)} }`}</style>
        </div>
    );
}

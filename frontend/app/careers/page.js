'use client';
import { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaBrain, FaChartBar, FaCode, FaMobileAlt, FaCheckCircle, FaArrowRight, FaArrowLeft, FaTrophy, FaShieldAlt, FaLock } from 'react-icons/fa';
import { SiRazorpay } from 'react-icons/si';
import { MdTimer, MdVerified } from 'react-icons/md';
import { HiSparkles } from 'react-icons/hi';

// ── Domain + Internship Data ────────────────────────────────────────────────
const DOMAINS = [
    {
        id: 'ai-ml',
        icon: FaBrain,
        title: 'AI & Machine Learning',
        desc: 'Build intelligent systems, NLP pipelines, computer vision, and ML models from scratch.',
        color: '#7C6FFF',
        gradient: 'linear-gradient(135deg, #7C6FFF22, #7C6FFF05)',
    },
    {
        id: 'data-analytics',
        icon: FaChartBar,
        title: 'Data Analytics',
        desc: 'Master data pipelines, dashboards, ETL processes and business intelligence.',
        color: '#FF6B9D',
        gradient: 'linear-gradient(135deg, #FF6B9D22, #FF6B9D05)',
    },
    {
        id: 'web-development',
        icon: FaCode,
        title: 'Web Development',
        desc: 'Full-stack development with React, Next.js, Node.js and modern frameworks.',
        color: '#43E97B',
        gradient: 'linear-gradient(135deg, #43E97B22, #43E97B05)',
    },
    {
        id: 'app-development',
        icon: FaMobileAlt,
        title: 'App Development',
        desc: 'Cross-platform iOS & Android apps with Flutter, React Native and native APIs.',
        color: '#FFB347',
        gradient: 'linear-gradient(135deg, #FFB34722, #FFB34705)',
    },
];

const DURATIONS = [
    {
        id: '1m',
        title: '1 Month',
        price: 499,
        testPrice: 2,
        badge: '🔥 Popular',
        badgeColor: '#7C6FFF',
        features: ['Real project work', 'Expert mentorship', 'Weekly code reviews', 'DigiPratham Certificate'],
        certification: 'DigiPratham Certificate of Completion',
    },
    {
        id: '2m',
        title: '2 Months',
        price: 599,
        testPrice: 2,
        badge: '⭐ Best Value',
        badgeColor: '#FF6B9D',
        features: ['Everything in 1 Month', 'Capstone project', 'Portfolio review', 'LinkedIn recommendation', 'Certificate of Excellence'],
        certification: 'DigiPratham Certificate of Excellence',
    },
];

// ── Three.js Particle Background ────────────────────────────────────────────
function ThreeBackground({ color = '#7C6FFF' }) {
    const mountRef = useRef(null);
    const sceneRef = useRef(null);

    useEffect(() => {
        let animId;
        let THREE_LIB;

        (async () => {
            try {
                const THREE = await import('three');
                THREE_LIB = THREE;
                const el = mountRef.current;
                if (!el) return;

                const scene = new THREE.Scene();
                const camera = new THREE.PerspectiveCamera(60, el.offsetWidth / el.offsetHeight, 0.1, 1000);
                camera.position.z = 80;

                const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
                renderer.setSize(el.offsetWidth, el.offsetHeight);
                renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
                el.appendChild(renderer.domElement);
                sceneRef.current = { renderer, el };

                // Particles
                const count = 180;
                const geo = new THREE.BufferGeometry();
                const positions = new Float32Array(count * 3);
                const speeds = new Float32Array(count);
                for (let i = 0; i < count; i++) {
                    positions[i * 3] = (Math.random() - 0.5) * 200;
                    positions[i * 3 + 1] = (Math.random() - 0.5) * 200;
                    positions[i * 3 + 2] = (Math.random() - 0.5) * 100;
                    speeds[i] = 0.02 + Math.random() * 0.04;
                }
                geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

                const hexColor = parseInt(color.replace('#', '0x'));
                const mat = new THREE.PointsMaterial({ color: hexColor, size: 0.8, transparent: true, opacity: 0.55 });
                const particles = new THREE.Points(geo, mat);
                scene.add(particles);

                // Lines connecting nearby particles
                const lineMat = new THREE.LineBasicMaterial({ color: hexColor, transparent: true, opacity: 0.08 });
                const lineGeo = new THREE.BufferGeometry();
                const linePositions = [];
                for (let i = 0; i < count; i++) {
                    for (let j = i + 1; j < count; j++) {
                        const dx = positions[i * 3] - positions[j * 3];
                        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
                        if (Math.sqrt(dx * dx + dy * dy) < 30) {
                            linePositions.push(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
                            linePositions.push(positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]);
                        }
                    }
                }
                lineGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(linePositions), 3));
                scene.add(new THREE.LineSegments(lineGeo, lineMat));

                let t = 0;
                const animate = () => {
                    animId = requestAnimationFrame(animate);
                    t += 0.004;
                    particles.rotation.y = t * 0.12;
                    particles.rotation.x = Math.sin(t * 0.3) * 0.08;
                    renderer.render(scene, camera);
                };
                animate();

                const onResize = () => {
                    if (!el) return;
                    camera.aspect = el.offsetWidth / el.offsetHeight;
                    camera.updateProjectionMatrix();
                    renderer.setSize(el.offsetWidth, el.offsetHeight);
                };
                window.addEventListener('resize', onResize);
                return () => window.removeEventListener('resize', onResize);
            } catch { /* Three.js unavailable */ }
        })();

        return () => {
            if (animId) cancelAnimationFrame(animId);
            if (sceneRef.current) {
                sceneRef.current.renderer.dispose();
                if (sceneRef.current.el.firstChild)
                    sceneRef.current.el.removeChild(sceneRef.current.el.firstChild);
            }
        };
    }, [color]);

    return (
        <div ref={mountRef} style={{
            position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
            transition: 'opacity 0.6s',
        }} />
    );
}

// ── Step Indicator ───────────────────────────────────────────────────────────
function StepIndicator({ step }) {
    const steps = ['Choose Domain', 'Choose Duration', 'Confirm & Pay'];
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0, marginBottom: '3rem' }}>
            {steps.map((label, i) => {
                const num = i + 1;
                const active = step === num;
                const done = step > num;
                const color = done ? '#43E97B' : active ? '#7C6FFF' : '#3a3a5c';
                return (
                    <div key={label} style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}>
                            <div style={{
                                width: 40, height: 40, borderRadius: '50%',
                                background: done ? '#43E97B' : active ? 'linear-gradient(135deg,#7C6FFF,#9f65ff)' : 'rgba(255,255,255,0.05)',
                                border: `2px solid ${color}`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontWeight: 700, color: done || active ? '#fff' : '#9495B8',
                                fontSize: '0.9rem', transition: 'all 0.5s',
                                boxShadow: active ? '0 0 20px rgba(124,111,255,0.4)' : 'none',
                            }}>
                                {done ? <FaCheckCircle size={16} /> : num}
                            </div>
                            <span style={{ fontSize: '0.7rem', color: active ? '#E8E9FF' : '#9495B8', fontWeight: active ? 600 : 400, whiteSpace: 'nowrap' }}>
                                {label}
                            </span>
                        </div>
                        {i < steps.length - 1 && (
                            <div style={{
                                width: 80, height: 2,
                                background: done ? '#43E97B' : 'rgba(255,255,255,0.08)',
                                margin: '0 0.5rem', marginBottom: '1.4rem',
                                transition: 'background 0.5s',
                            }} />
                        )}
                    </div>
                );
            })}
        </div>
    );
}

// ── Careers Page ─────────────────────────────────────────────────────────────
export default function CareersPage() {
    const [step, setStep] = useState(1);
    const [selectedDomain, setSelectedDomain] = useState(null);
    const [selectedDuration, setSelectedDuration] = useState(null);
    const [internships, setInternships] = useState([]);
    const [processing, setProcessing] = useState(false);
    const [isTestUser, setIsTestUser] = useState(false);

    // Helper: returns ₹2 for test user, normal price otherwise
    const getPrice = (dur) => isTestUser ? (dur.testPrice ?? 2) : dur.price;

    useEffect(() => {
        // Detect test user from localStorage
        try {
            const stored = localStorage.getItem('dp_user');
            if (stored) {
                const u = JSON.parse(stored);
                setIsTestUser(!!u.isTestUser);
            }
        } catch { }

        (async () => {
            try {
                const { getInternships } = await import('../lib/api');
                const { data } = await getInternships();
                if (Array.isArray(data) && data.length > 0) setInternships(data);
            } catch { /* use fallback map */ }
        })();
    }, []);

    // Map duration id → DB internship
    const getInternshipForDuration = (durId) => {
        if (internships.length > 0) {
            return durId === '1m'
                ? internships.find(i => i.duration?.includes('1') && !i.duration?.includes('2'))
                : internships.find(i => i.duration?.includes('2'));
        }
        return null;
    };

    const handlePay = async () => {
        const user = typeof window !== 'undefined' ? localStorage.getItem('dp_user') : null;
        if (!user) { window.location.href = '/register'; return; }

        const internship = getInternshipForDuration(selectedDuration.id);
        if (!internship) {
            alert('Internship not found. Please try again.');
            return;
        }

        setProcessing(true);
        try {
            const { createOrder, verifyPayment } = await import('../lib/api');
            const { data: orderData } = await createOrder({ internshipId: internship._id });

            const options = {
                key: orderData.keyId,
                amount: orderData.amount,
                currency: orderData.currency,
                name: 'DigiPratham',
                description: `${selectedDomain.title} – ${selectedDuration.title} Internship`,
                order_id: orderData.orderId,
                handler: async (response) => {
                    try {
                        await verifyPayment({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            internshipId: internship._id,
                        });
                        sessionStorage.setItem('dp_payment_success', `Your application for "${selectedDomain.title} – ${selectedDuration.title}" has been confirmed!`);
                        window.location.href = '/dashboard';
                    } catch {
                        alert('Payment verification failed. Please contact support.');
                        setProcessing(false);
                    }
                },
                prefill: {
                    name: JSON.parse(user).name || '',
                    email: JSON.parse(user).email || '',
                },
                theme: { color: '#7C6FFF' },
                modal: {
                    ondismiss: () => setProcessing(false),
                },
            };

            // Load Razorpay script if not already loaded
            if (!window.Razorpay) {
                await new Promise((resolve, reject) => {
                    const script = document.createElement('script');
                    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
                    script.onload = resolve;
                    script.onerror = reject;
                    document.body.appendChild(script);
                });
            }

            const rzp = new window.Razorpay(options);
            rzp.on('payment.failed', () => {
                alert('Payment failed. Please try again.');
                setProcessing(false);
            });
            rzp.open();
        } catch (err) {
            alert(err?.response?.data?.error || 'Could not initiate payment. Please try again.');
            setProcessing(false);
        }
    };

    const bgColor = selectedDomain?.color || '#7C6FFF';

    return (
        <>
            <Navbar />
            <main style={{ minHeight: '100vh', paddingTop: 90, paddingBottom: '5rem', background: '#0A0B1A', position: 'relative', overflow: 'hidden' }}>
                {/* Three.js background changes color per domain */}
                <ThreeBackground color={bgColor} />

                <div className="container" style={{ position: 'relative', zIndex: 2 }}>

                    {/* ── Hero ── */}
                    <div style={{ textAlign: 'center', paddingTop: '3rem', paddingBottom: '2.5rem' }}>
                        <div className="badge" style={{ marginBottom: '1rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                            <HiSparkles style={{ color: '#7C6FFF' }} /> Internship Programs
                        </div>
                        <h1 style={{ fontSize: 'clamp(2.4rem,5vw,3.75rem)', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1rem', letterSpacing: '-0.04em' }}>
                            Launch Your <span className="gradient-text">Tech Career</span>
                        </h1>
                        <p style={{ color: '#9495B8', fontSize: 'clamp(0.95rem,2vw,1.1rem)', maxWidth: 560, margin: '0 auto 2.5rem' }}>
                            Real projects · Expert mentorship · Industry certificate — in just 1 or 2 months.
                        </p>

                        <StepIndicator step={step} />
                    </div>

                    {/* ══ STEP 1: Choose Domain ════════════════════════════════ */}
                    {step === 1 && (
                        <div>
                            <h2 style={{ textAlign: 'center', fontSize: '1.4rem', fontWeight: 700, color: '#E8E9FF', marginBottom: '2rem' }}>
                                Select Your Domain
                            </h2>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', maxWidth: 1000, margin: '0 auto' }}>
                                {DOMAINS.map(domain => {
                                    const Icon = domain.icon;
                                    return (
                                        <div
                                            key={domain.id}
                                            onClick={() => { setSelectedDomain(domain); setStep(2); }}
                                            style={{
                                                background: domain.gradient,
                                                border: `1.5px solid ${domain.color}35`,
                                                borderRadius: 20,
                                                padding: '2rem',
                                                cursor: 'pointer',
                                                transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
                                                position: 'relative',
                                                overflow: 'hidden',
                                            }}
                                            onMouseEnter={e => {
                                                e.currentTarget.style.transform = 'translateY(-6px) scale(1.02)';
                                                e.currentTarget.style.boxShadow = `0 20px 60px ${domain.color}30`;
                                                e.currentTarget.style.borderColor = `${domain.color}80`;
                                            }}
                                            onMouseLeave={e => {
                                                e.currentTarget.style.transform = 'none';
                                                e.currentTarget.style.boxShadow = 'none';
                                                e.currentTarget.style.borderColor = `${domain.color}35`;
                                            }}
                                        >
                                            <div style={{
                                                width: 56, height: 56, borderRadius: 16,
                                                background: `${domain.color}20`,
                                                border: `1.5px solid ${domain.color}50`,
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                marginBottom: '1.25rem',
                                            }}>
                                                <Icon size={26} style={{ color: domain.color }} />
                                            </div>
                                            <h3 style={{ fontWeight: 700, fontSize: '1.1rem', color: '#E8E9FF', marginBottom: '0.6rem' }}>
                                                {domain.title}
                                            </h3>
                                            <p style={{ color: '#9495B8', fontSize: '0.875rem', lineHeight: 1.65, marginBottom: '1.25rem' }}>
                                                {domain.desc}
                                            </p>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: domain.color, fontSize: '0.85rem', fontWeight: 700 }}>
                                                Choose Domain <FaArrowRight size={12} />
                                            </div>
                                            {/* Glow blob */}
                                            <div style={{
                                                position: 'absolute', bottom: -30, right: -30,
                                                width: 100, height: 100, borderRadius: '50%',
                                                background: domain.color, opacity: 0.07, pointerEvents: 'none',
                                            }} />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* ══ STEP 2: Choose Duration ══════════════════════════════ */}
                    {step === 2 && selectedDomain && (
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                                <button
                                    onClick={() => { setStep(1); setSelectedDuration(null); }}
                                    style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, color: '#9495B8', cursor: 'pointer', padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', fontWeight: 500 }}
                                >
                                    <FaArrowLeft size={12} /> Back
                                </button>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                                    <selectedDomain.icon size={18} style={{ color: selectedDomain.color }} />
                                    <span style={{ color: selectedDomain.color, fontWeight: 600, fontSize: '0.95rem' }}>{selectedDomain.title}</span>
                                </div>
                            </div>

                            <h2 style={{ textAlign: 'center', fontSize: '1.4rem', fontWeight: 700, color: '#E8E9FF', marginBottom: '2rem' }}>
                                Choose Your Duration
                            </h2>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', maxWidth: 780, margin: '0 auto' }}>
                                {DURATIONS.map(dur => (
                                    <div
                                        key={dur.id}
                                        onClick={() => { setSelectedDuration(dur); setStep(3); }}
                                        style={{
                                            background: 'rgba(15,12,41,0.8)',
                                            border: `1.5px solid ${dur.badgeColor}35`,
                                            borderRadius: 24,
                                            padding: '2.25rem',
                                            cursor: 'pointer',
                                            transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
                                            backdropFilter: 'blur(12px)',
                                        }}
                                        onMouseEnter={e => {
                                            e.currentTarget.style.transform = 'translateY(-6px)';
                                            e.currentTarget.style.boxShadow = `0 24px 64px ${dur.badgeColor}25`;
                                            e.currentTarget.style.borderColor = `${dur.badgeColor}70`;
                                        }}
                                        onMouseLeave={e => {
                                            e.currentTarget.style.transform = 'none';
                                            e.currentTarget.style.boxShadow = 'none';
                                            e.currentTarget.style.borderColor = `${dur.badgeColor}35`;
                                        }}
                                    >
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                                            <div>
                                                <span className="badge" style={{ background: `${dur.badgeColor}18`, color: dur.badgeColor, borderColor: `${dur.badgeColor}40`, fontSize: '0.72rem', marginBottom: '0.7rem' }}>
                                                    {dur.badge}
                                                </span>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.35rem' }}>
                                                    <MdTimer size={18} style={{ color: dur.badgeColor }} />
                                                    <h3 style={{ fontWeight: 800, fontSize: '1.3rem', color: '#E8E9FF' }}>{dur.title}</h3>
                                                </div>
                                            </div>
                                        </div>

                                        <div style={{ marginBottom: '1.5rem' }}>
                                            {dur.features.map(f => (
                                                <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
                                                    <FaCheckCircle size={14} style={{ color: dur.badgeColor, flexShrink: 0 }} />
                                                    <span style={{ color: '#9495B8', fontSize: '0.875rem' }}>{f}</span>
                                                </div>
                                            ))}
                                        </div>

                                        <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 12, border: `1px solid ${dur.badgeColor}20`, padding: '0.9rem 1rem', display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.5rem' }}>
                                            <FaTrophy size={16} style={{ color: dur.badgeColor }} />
                                            <div>
                                                <div style={{ fontSize: '0.72rem', color: '#9495B8' }}>Certification</div>
                                                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#E8E9FF' }}>{dur.certification}</div>
                                            </div>
                                        </div>

                                        <button
                                            style={{
                                                width: '100%', padding: '0.85rem',
                                                background: `linear-gradient(135deg, ${dur.badgeColor}, ${dur.badgeColor}CC)`,
                                                border: 'none', borderRadius: 12, color: '#fff',
                                                fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                                                boxShadow: `0 8px 24px ${dur.badgeColor}40`,
                                                pointerEvents: 'none',
                                            }}
                                        >
                                            Select {dur.title} <FaArrowRight size={13} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* ══ STEP 3: Payment Summary ══════════════════════════════ */}
                    {step === 3 && selectedDomain && selectedDuration && (
                        <div style={{ maxWidth: 520, margin: '0 auto' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                                <button
                                    onClick={() => { setStep(2); setSelectedDuration(null); }}
                                    style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, color: '#9495B8', cursor: 'pointer', padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', fontWeight: 500 }}
                                >
                                    <FaArrowLeft size={12} /> Back
                                </button>
                                <span style={{ color: '#9495B8', fontSize: '0.875rem' }}>
                                    <span style={{ color: selectedDomain.color }}>{selectedDomain.title}</span> &nbsp;→&nbsp; <span style={{ color: selectedDuration.badgeColor }}>{selectedDuration.title}</span>
                                </span>
                            </div>

                            <div style={{
                                background: 'rgba(15,12,41,0.9)',
                                border: '1px solid rgba(124,111,255,0.25)',
                                borderRadius: 24,
                                overflow: 'hidden',
                                backdropFilter: 'blur(20px)',
                                boxShadow: '0 40px 100px rgba(0,0,0,0.5)',
                            }}>
                                {/* Header */}
                                <div style={{ background: 'linear-gradient(135deg, rgba(124,111,255,0.2), rgba(255,107,157,0.12))', padding: '2rem 2.25rem', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.4rem' }}>
                                        <selectedDomain.icon size={22} style={{ color: selectedDomain.color }} />
                                        <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#E8E9FF' }}>Order Summary</h3>
                                    </div>
                                    <p style={{ color: '#9495B8', fontSize: '0.875rem' }}>Secure payment powered by Razorpay</p>
                                </div>

                                <div style={{ padding: '2rem 2.25rem' }}>
                                    {/* Details */}
                                    {[
                                        { label: 'Domain', value: selectedDomain.title, icon: <selectedDomain.icon size={14} style={{ color: selectedDomain.color }} /> },
                                        { label: 'Duration', value: selectedDuration.title, icon: <MdTimer size={14} style={{ color: selectedDuration.badgeColor }} /> },
                                        { label: 'Certification', value: selectedDuration.certification, icon: <FaTrophy size={14} style={{ color: '#FFB347' }} /> },
                                    ].map(row => (
                                        <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                            <span style={{ color: '#9495B8', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                                {row.icon} {row.label}
                                            </span>
                                            <span style={{ color: '#E8E9FF', fontWeight: 600, fontSize: '0.875rem', maxWidth: '55%', textAlign: 'right' }}>{row.value}</span>
                                        </div>
                                    ))}

                                    {/* Total */}
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem 0 0', marginTop: '0.25rem' }}>
                                        <span style={{ color: '#E8E9FF', fontWeight: 700, fontSize: '1rem' }}>Total Amount</span>
                                        <div style={{ textAlign: 'right' }}>
                                            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#43E97B', fontFamily: 'Space Grotesk', letterSpacing: '-0.03em' }}>
                                                ₹{getPrice(selectedDuration)}
                                            </div>
                                            <div style={{ fontSize: '0.72rem', color: '#9495B8' }}>one-time · no hidden charges</div>
                                        </div>
                                    </div>

                                    {/* Trust badges */}
                                    <div style={{ display: 'flex', gap: '1rem', margin: '1.5rem 0', flexWrap: 'wrap' }}>
                                        {[
                                            { icon: <FaShieldAlt size={12} />, text: '100% Secure' },
                                            { icon: <FaLock size={12} />, text: 'SSL Encrypted' },
                                            { icon: <MdVerified size={14} />, text: 'Verified Payment' },
                                        ].map(b => (
                                            <div key={b.text} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#9495B8', fontSize: '0.78rem', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, padding: '0.35rem 0.65rem' }}>
                                                <span style={{ color: '#43E97B' }}>{b.icon}</span> {b.text}
                                            </div>
                                        ))}
                                    </div>

                                    {/* Pay Button */}
                                    <button
                                        onClick={handlePay}
                                        disabled={processing}
                                        style={{
                                            width: '100%', padding: '1.05rem',
                                            background: processing ? 'rgba(124,111,255,0.35)' : 'linear-gradient(135deg,#7C6FFF,#9f65ff)',
                                            border: 'none', borderRadius: 14, color: '#fff',
                                            fontWeight: 800, fontSize: '1.05rem',
                                            cursor: processing ? 'default' : 'pointer',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem',
                                            boxShadow: processing ? 'none' : '0 12px 40px rgba(124,111,255,0.45)',
                                            transition: 'all 0.25s', marginBottom: '0.75rem',
                                            letterSpacing: '0.01em',
                                        }}
                                    >
                                        {processing ? (
                                            <>
                                                <span style={{ width: 18, height: 18, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.7s linear infinite' }} />
                                                Opening Razorpay...
                                            </>
                                        ) : (
                                            <>
                                                <SiRazorpay size={20} />
                                                Pay ₹{getPrice(selectedDuration)} with Razorpay
                                            </>
                                        )}
                                    </button>

                                    <p style={{ textAlign: 'center', color: '#9495B8', fontSize: '0.78rem' }}>
                                        By proceeding, you agree to DigiPratham's terms & conditions.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ── How It Works ── */}
                    {step === 1 && (
                        <div style={{ marginTop: '5rem', padding: '4rem 0' }}>
                            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                                <div className="badge" style={{ marginBottom: '0.75rem' }}>How It Works</div>
                                <h2 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#E8E9FF' }}>3 Easy Steps</h2>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', maxWidth: 720, margin: '0 auto' }}>
                                {[
                                    { step: '01', title: 'Pick Domain', desc: 'Choose the technology domain that excites you most', Icon: FaCode, color: '#7C6FFF' },
                                    { step: '02', title: 'Pick Duration', desc: 'Select 1 or 2 months based on your availability', Icon: MdTimer, color: '#FF6B9D' },
                                    { step: '03', title: 'Pay & Start', desc: 'Secure payment via Razorpay, then dive right in', Icon: SiRazorpay, color: '#43E97B' },
                                ].map(s => (
                                    <div key={s.step} className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
                                        <div style={{ width: 48, height: 48, borderRadius: '50%', background: `${s.color}18`, border: `1.5px solid ${s.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                                            <s.Icon size={20} style={{ color: s.color }} />
                                        </div>
                                        <div style={{ fontSize: '0.72rem', color: s.color, fontWeight: 700, letterSpacing: '0.1em', marginBottom: '0.4rem' }}>STEP {s.step}</div>
                                        <h4 style={{ fontWeight: 700, color: '#E8E9FF', marginBottom: '0.4rem' }}>{s.title}</h4>
                                        <p style={{ color: '#9495B8', fontSize: '0.85rem', lineHeight: 1.6 }}>{s.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </>
    );
}

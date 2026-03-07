'use client';
import { useEffect, useRef, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import {
    FaBrain, FaChartBar, FaCode, FaMobileAlt, FaGraduationCap,
    FaCheckCircle, FaArrowRight, FaRocket, FaShieldAlt, FaBullseye, FaHeadset,
} from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';
import { MdTimer } from 'react-icons/md';

// ── Services Data ─────────────────────────────────────────────────────────────
const services = [
    {
        Icon: FaBrain,
        title: 'AI & Machine Learning',
        slug: 'ai-ml',
        tagline: 'Intelligent solutions powered by cutting-edge AI',
        color: '#7C6FFF',
        gradient: 'linear-gradient(135deg,#7C6FFF22,#7C6FFF05)',
        img: 'https://images.unsplash.com/photo-1677756119517-756a188d2d94?w=700&q=80',
        features: ['Custom ML models', 'NLP & Computer Vision', 'Predictive analytics', 'AI integration'],
        techs: ['Python', 'TensorFlow', 'PyTorch', 'LangChain'],
        pricing: { starter: '₹15,000', growth: '₹35,000' },
        isInternship: false,
    },
    {
        Icon: FaChartBar,
        title: 'Data Analytics',
        slug: 'data-analytics',
        tagline: 'Transform raw data into actionable business insights',
        color: '#FF6B9D',
        gradient: 'linear-gradient(135deg,#FF6B9D22,#FF6B9D05)',
        img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&q=80',
        features: ['BI Dashboards', 'ETL Pipelines', 'Statistical analysis', 'Real-time monitoring'],
        techs: ['Python', 'Power BI', 'Tableau', 'Spark'],
        pricing: { starter: '₹10,000', growth: '₹25,000' },
        isInternship: false,
    },
    {
        Icon: FaCode,
        title: 'Web Development',
        slug: 'web-development',
        tagline: 'Modern, fast, and scalable web applications',
        color: '#43E97B',
        gradient: 'linear-gradient(135deg,#43E97B22,#43E97B05)',
        img: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=700&q=80',
        features: ['Responsive UI/UX', 'Full-stack apps', 'API Development', 'SEO Optimization'],
        techs: ['React', 'Next.js', 'Node.js', 'MongoDB'],
        pricing: { starter: '₹8,000', growth: '₹25,000' },
        isInternship: false,
    },
    {
        Icon: FaMobileAlt,
        title: 'App Development',
        slug: 'app-development',
        tagline: 'Native & cross-platform mobile apps users love',
        color: '#FFB347',
        gradient: 'linear-gradient(135deg,#FFB34722,#FFB34705)',
        img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=700&q=80',
        features: ['React Native / Flutter', 'iOS & Android', 'App Store Deployment', 'Push Notifications'],
        techs: ['React Native', 'Flutter', 'Firebase', 'Expo'],
        pricing: { starter: '₹20,000', growth: '₹50,000' },
        isInternship: false,
    },
    {
        Icon: FaGraduationCap,
        title: 'Internship Programs',
        slug: null,
        href: '/careers',
        tagline: 'Real projects · Expert mentors · Industry certificate',
        color: '#A78BFA',
        gradient: 'linear-gradient(135deg,#A78BFA22,#A78BFA05)',
        img: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=700&q=80',
        features: ['AI/ML, Data, Web & App domains', '1 & 2 month programs', 'Live project work', 'Certificate of Excellence'],
        techs: ['1 Month', '2 Months', 'Mentorship', 'Certificate'],
        isInternship: true,
    },
];

const whyUs = [
    { Icon: FaRocket, title: 'Fast Delivery', desc: 'Agile sprints with rapid iterations and transparent delivery.', color: '#7C6FFF' },
    { Icon: FaShieldAlt, title: 'Secure & Scalable', desc: 'Enterprise-grade architecture built to scale with your business.', color: '#FF6B9D' },
    { Icon: FaBullseye, title: 'Goal-Oriented', desc: 'Everything tied to measurable business outcomes.', color: '#43E97B' },
    { Icon: FaHeadset, title: '24/7 Support', desc: 'Dedicated post-launch support whenever you need us.', color: '#FFB347' },
];

// ── Three.js Hero Background ──────────────────────────────────────────────────
function ThreeHero() {
    const mountRef = useRef(null);
    const sceneRef = useRef(null);

    useEffect(() => {
        let animId;
        (async () => {
            try {
                const THREE = await import('three');
                const el = mountRef.current;
                if (!el) return;

                const scene = new THREE.Scene();
                const camera = new THREE.PerspectiveCamera(55, el.offsetWidth / el.offsetHeight, 0.1, 1000);
                camera.position.z = 90;

                const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
                renderer.setSize(el.offsetWidth, el.offsetHeight);
                renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
                el.appendChild(renderer.domElement);
                sceneRef.current = { renderer, el };

                // Multi-color particles
                const colors = [0x7C6FFF, 0xFF6B9D, 0x43E97B, 0xFFB347, 0xA78BFA];
                const groups = colors.map((hex) => {
                    const count = 60;
                    const geo = new THREE.BufferGeometry();
                    const pos = new Float32Array(count * 3);
                    for (let i = 0; i < count; i++) {
                        pos[i * 3] = (Math.random() - 0.5) * 220;
                        pos[i * 3 + 1] = (Math.random() - 0.5) * 220;
                        pos[i * 3 + 2] = (Math.random() - 0.5) * 120;
                    }
                    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
                    const mat = new THREE.PointsMaterial({ color: hex, size: 1.1, transparent: true, opacity: 0.6 });
                    const pts = new THREE.Points(geo, mat);
                    scene.add(pts);
                    return pts;
                });

                // Connecting lines
                const allPositions = [];
                groups.forEach(g => {
                    const arr = g.geometry.attributes.position.array;
                    for (let i = 0; i < arr.length; i += 3)
                        allPositions.push([arr[i], arr[i + 1], arr[i + 2]]);
                });
                const lineVerts = [];
                for (let i = 0; i < allPositions.length; i++) {
                    for (let j = i + 1; j < allPositions.length; j++) {
                        const dx = allPositions[i][0] - allPositions[j][0];
                        const dy = allPositions[i][1] - allPositions[j][1];
                        if (Math.sqrt(dx * dx + dy * dy) < 25) {
                            lineVerts.push(...allPositions[i], ...allPositions[j]);
                        }
                    }
                }
                const lineGeo = new THREE.BufferGeometry();
                lineGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(lineVerts), 3));
                scene.add(new THREE.LineSegments(lineGeo, new THREE.LineBasicMaterial({ color: 0x7C6FFF, transparent: true, opacity: 0.06 })));

                let t = 0;
                const animate = () => {
                    animId = requestAnimationFrame(animate);
                    t += 0.003;
                    groups.forEach((g, i) => {
                        g.rotation.y = t * (0.08 + i * 0.015);
                        g.rotation.x = Math.sin(t * 0.4 + i) * 0.06;
                    });
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
            } catch { /* Three.js not available */ }
        })();
        return () => {
            if (animId) cancelAnimationFrame(animId);
            if (sceneRef.current) {
                sceneRef.current.renderer.dispose();
                try { sceneRef.current.el.removeChild(sceneRef.current.el.firstChild); } catch { }
            }
        };
    }, []);

    return <div ref={mountRef} style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }} />;
}

// ── GSAP Scroll Reveal ────────────────────────────────────────────────────────
function useGSAP(callback, deps = []) {
    useEffect(() => {
        let cleanup;
        (async () => {
            try {
                const { gsap } = await import('gsap');
                const { ScrollTrigger } = await import('gsap/ScrollTrigger');
                gsap.registerPlugin(ScrollTrigger);
                cleanup = callback(gsap, ScrollTrigger);
            } catch { }
        })();
        return () => { if (typeof cleanup === 'function') cleanup(); };
    }, deps);
}

// ── Service Card ──────────────────────────────────────────────────────────────
function ServiceCard({ svc, index }) {
    const cardRef = useRef(null);
    const [hovered, setHovered] = useState(false);

    useGSAP((gsap, ScrollTrigger) => {
        if (!cardRef.current) return;
        gsap.fromTo(cardRef.current,
            { opacity: 0, y: 60, scale: 0.95 },
            {
                opacity: 1, y: 0, scale: 1, duration: 0.75,
                ease: 'power3.out', delay: index * 0.1,
                scrollTrigger: { trigger: cardRef.current, start: 'top 88%', once: true },
            });
    }, [index]);

    const CardLink = svc.href
        ? ({ children }) => <Link href={svc.href} style={{ textDecoration: 'none' }}>{children}</Link>
        : ({ children }) => <Link href={`/services/${svc.slug}`} style={{ textDecoration: 'none' }}>{children}</Link>;

    return (
        <CardLink>
            <div
                ref={cardRef}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                style={{
                    background: hovered ? svc.gradient : 'rgba(255,255,255,0.03)',
                    border: `1.5px solid ${hovered ? svc.color + '60' : 'rgba(255,255,255,0.07)'}`,
                    borderRadius: 24,
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
                    transform: hovered ? 'translateY(-8px)' : 'none',
                    boxShadow: hovered ? `0 28px 72px ${svc.color}25` : 'none',
                    cursor: 'pointer',
                }}
            >
                {/* Image */}
                <div style={{ position: 'relative', height: 192, flexShrink: 0, overflow: 'hidden' }}>
                    <Image src={svc.img} alt={svc.title} fill style={{ objectFit: 'cover', transition: 'transform 0.5s', transform: hovered ? 'scale(1.06)' : 'scale(1)' }} />
                    <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to bottom, ${svc.color}25, rgba(10,9,26,0.8))` }} />

                    {/* Icon badge */}
                    <div style={{
                        position: 'absolute', top: 18, left: 18,
                        width: 52, height: 52, borderRadius: 14,
                        background: `${svc.color}20`, border: `1.5px solid ${svc.color}60`,
                        backdropFilter: 'blur(12px)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                        <svc.Icon size={24} style={{ color: svc.color }} />
                    </div>

                    {svc.isInternship && (
                        <div style={{ position: 'absolute', top: 18, right: 18 }}>
                            <span style={{ background: `${svc.color}25`, border: `1px solid ${svc.color}50`, borderRadius: 20, padding: '0.25rem 0.75rem', fontSize: '0.7rem', color: svc.color, fontWeight: 700 }}>
                                🎓 New
                            </span>
                        </div>
                    )}

                    {/* Hover arrow */}
                    <div style={{
                        position: 'absolute', bottom: 16, right: 16,
                        width: 36, height: 36, borderRadius: '50%',
                        background: svc.color, display: 'flex', alignItems: 'center', justifyContent: 'center',
                        transform: hovered ? 'scale(1) translateX(0)' : 'scale(0) translateX(10px)',
                        transition: 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1)',
                        boxShadow: `0 4px 16px ${svc.color}60`,
                    }}>
                        <FaArrowRight size={14} color="#fff" />
                    </div>
                </div>

                {/* Body */}
                <div style={{ padding: '1.75rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{ fontWeight: 800, fontSize: '1.15rem', color: '#E8E9FF', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
                        {svc.title}
                    </h3>
                    <p style={{ color: '#9495B8', fontSize: '0.875rem', lineHeight: 1.7, marginBottom: '1.25rem', flex: 1 }}>
                        {svc.tagline}
                    </p>

                    {/* Features */}
                    <div style={{ marginBottom: '1.25rem' }}>
                        {svc.features.map(f => (
                            <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                                <FaCheckCircle size={12} style={{ color: svc.color, flexShrink: 0 }} />
                                <span style={{ color: '#9495B8', fontSize: '0.82rem' }}>{f}</span>
                            </div>
                        ))}
                    </div>

                    {/* Tech tags */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1.35rem' }}>
                        {svc.techs.map(t => (
                            <span key={t} style={{
                                background: `${svc.color}12`, border: `1px solid ${svc.color}30`,
                                borderRadius: 6, padding: '0.2rem 0.6rem',
                                fontSize: '0.72rem', color: svc.color, fontWeight: 600,
                            }}>{t}</span>
                        ))}
                    </div>

                    {/* Pricing or CTA */}
                    {!svc.isInternship ? (
                        <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 10, padding: '0.9rem 1rem', marginBottom: '1.25rem' }}>
                            <div style={{ fontSize: '0.7rem', color: '#9495B8', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Starting from</div>
                            <div style={{ display: 'flex', gap: '1.5rem' }}>
                                <div>
                                    <div style={{ fontSize: '1.2rem', fontWeight: 800, color: svc.color, fontFamily: 'Space Grotesk' }}>{svc.pricing.starter}</div>
                                    <div style={{ fontSize: '0.7rem', color: '#9495B8' }}>Starter</div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#E8E9FF', fontFamily: 'Space Grotesk' }}>{svc.pricing.growth}</div>
                                    <div style={{ fontSize: '0.7rem', color: '#9495B8' }}>Growth</div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div style={{ background: `${svc.color}10`, border: `1px solid ${svc.color}25`, borderRadius: 10, padding: '0.9rem 1rem', marginBottom: '1.25rem', display: 'flex', gap: '1rem' }}>
                            {[{ label: '1 Month', icon: <MdTimer size={14} style={{ color: svc.color }} /> }, { label: '2 Months', icon: <MdTimer size={14} style={{ color: svc.color }} /> }].map(d => (
                                <div key={d.label} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                                    {d.icon}
                                    <span style={{ color: svc.color, fontWeight: 700, fontSize: '0.82rem' }}>{d.label}</span>
                                </div>
                            ))}
                        </div>
                    )}

                    <div style={{
                        width: '100%', padding: '0.75rem',
                        background: `linear-gradient(135deg, ${svc.color}, ${svc.color}BB)`,
                        border: 'none', borderRadius: 12, color: '#fff',
                        fontWeight: 700, fontSize: '0.875rem', textAlign: 'center',
                        opacity: hovered ? 1 : 0.85, transition: 'opacity 0.2s',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem',
                        boxShadow: hovered ? `0 8px 24px ${svc.color}45` : 'none',
                    }}>
                        {svc.isInternship ? 'View Programs' : 'View Details'} <FaArrowRight size={12} />
                    </div>
                </div>
            </div>
        </CardLink>
    );
}

// ── Main Services Page ────────────────────────────────────────────────────────
export default function ServicesPage() {
    const heroRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const statRef = useRef(null);
    const whySectionRef = useRef(null);

    // Hero GSAP entrance
    useGSAP((gsap) => {
        if (!titleRef.current) return;
        gsap.fromTo(titleRef.current,
            { opacity: 0, y: 50, filter: 'blur(12px)' },
            { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, ease: 'power3.out', delay: 0.2 }
        );
        gsap.fromTo(subtitleRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.5 }
        );
        gsap.fromTo(statRef.current?.children ? [...statRef.current.children] : [],
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: 'power3.out', delay: 0.8 }
        );
    }, []);

    // Why Us GSAP stagger
    useGSAP((gsap, ScrollTrigger) => {
        if (!whySectionRef.current) return;
        const cards = whySectionRef.current.querySelectorAll('.why-card');
        gsap.fromTo(cards,
            { opacity: 0, y: 40, scale: 0.96 },
            {
                opacity: 1, y: 0, scale: 1,
                stagger: 0.13, duration: 0.65, ease: 'power3.out',
                scrollTrigger: { trigger: whySectionRef.current, start: 'top 85%', once: true },
            }
        );
    }, []);

    return (
        <>
            <Navbar />
            <main style={{ minHeight: '100vh', background: '#0A0B1A', overflowX: 'hidden' }}>

                {/* ══ HERO ═══════════════════════════════════════════════════ */}
                <section ref={heroRef} style={{ position: 'relative', paddingTop: 120, paddingBottom: '6rem', textAlign: 'center', minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ThreeHero />

                    {/* Bottom fade */}
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 180, background: 'linear-gradient(to bottom, transparent, #0A0B1A)', zIndex: 1 }} />

                    <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                        <div style={{ marginBottom: '1.25rem' }}>
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', background: 'rgba(124,111,255,0.12)', border: '1px solid rgba(124,111,255,0.35)', borderRadius: 20, padding: '0.4rem 1rem', fontSize: '0.825rem', color: '#A78BFA', fontWeight: 600 }}>
                                <HiSparkles /> What We Offer
                            </span>
                        </div>

                        <h1 ref={titleRef} style={{ fontSize: 'clamp(2.75rem,6vw,5rem)', fontWeight: 900, letterSpacing: '-0.05em', lineHeight: 1.05, color: '#E8E9FF', marginBottom: '1.5rem', opacity: 0 }}>
                            Our{' '}
                            <span style={{ background: 'linear-gradient(135deg,#7C6FFF,#FF6B9D)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                Services
                            </span>
                        </h1>

                        <p ref={subtitleRef} style={{ color: '#9495B8', fontSize: 'clamp(1rem,2vw,1.2rem)', maxWidth: 580, margin: '0 auto 3rem', lineHeight: 1.75, opacity: 0 }}>
                            End-to-end digital solutions — from AI models to mobile apps — designed to accelerate your business growth.
                        </p>

                        {/* Stats row */}
                        <div ref={statRef} style={{ display: 'inline-flex', gap: '2.5rem', flexWrap: 'wrap', justifyContent: 'center', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: '1.25rem 2.5rem', backdropFilter: 'blur(12px)' }}>
                            {[
                                { val: '5', label: 'Services' },
                                { val: '50+', label: 'Projects' },
                                { val: '30+', label: 'Clients' },
                                { val: '100%', label: 'Satisfaction' },
                            ].map(s => (
                                <div key={s.label} style={{ textAlign: 'center' }}>
                                    <div style={{ fontSize: '2rem', fontWeight: 900, color: '#7C6FFF', fontFamily: 'Space Grotesk', letterSpacing: '-0.04em' }}>{s.val}</div>
                                    <div style={{ fontSize: '0.75rem', color: '#9495B8', fontWeight: 500 }}>{s.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ══ SERVICES GRID ══════════════════════════════════════════ */}
                <section style={{ padding: '5rem 0 6rem', position: 'relative' }}>
                    {/* Gradient orbs */}
                    <div style={{ position: 'absolute', top: '10%', left: '-10%', width: 400, height: 400, borderRadius: '50%', background: '#7C6FFF', opacity: 0.04, filter: 'blur(80px)', pointerEvents: 'none' }} />
                    <div style={{ position: 'absolute', bottom: '10%', right: '-10%', width: 350, height: 350, borderRadius: '50%', background: '#FF6B9D', opacity: 0.04, filter: 'blur(80px)', pointerEvents: 'none' }} />

                    <div className="container">
                        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', background: 'rgba(124,111,255,0.1)', border: '1px solid rgba(124,111,255,0.3)', borderRadius: 20, padding: '0.35rem 0.9rem', fontSize: '0.78rem', color: '#A78BFA', fontWeight: 700, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                                Explore All Services
                            </div>
                            <h2 style={{ fontSize: 'clamp(1.75rem,3.5vw,2.75rem)', fontWeight: 800, color: '#E8E9FF', letterSpacing: '-0.04em' }}>
                                Everything you need to{' '}
                                <span style={{ background: 'linear-gradient(135deg,#43E97B,#7C6FFF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                    grow digitally
                                </span>
                            </h2>
                        </div>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                            gap: '1.75rem',
                        }}>
                            {services.map((svc, i) => (
                                <ServiceCard key={svc.title} svc={svc} index={i} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* ══ PROCESS TIMELINE ═══════════════════════════════════════ */}
                <ProcessSection />

                {/* ══ WHY DIGIPRATHAM ════════════════════════════════════════ */}
                <section style={{ padding: '6rem 0', background: 'rgba(255,255,255,0.015)', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }} ref={whySectionRef}>
                    <div className="container">
                        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', background: 'rgba(124,111,255,0.1)', border: '1px solid rgba(124,111,255,0.3)', borderRadius: 20, padding: '0.35rem 0.9rem', fontSize: '0.78rem', color: '#A78BFA', fontWeight: 700, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                                Why DigiPratham
                            </div>
                            <h2 style={{ fontSize: 'clamp(1.75rem,3.5vw,2.75rem)', fontWeight: 800, color: '#E8E9FF', letterSpacing: '-0.04em' }}>
                                Built for{' '}
                                <span style={{ background: 'linear-gradient(135deg,#7C6FFF,#FF6B9D)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                    Results
                                </span>
                            </h2>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
                            {whyUs.map(w => (
                                <div key={w.title} className="why-card" style={{
                                    background: 'rgba(255,255,255,0.03)',
                                    border: `1.5px solid ${w.color}18`,
                                    borderRadius: 20,
                                    padding: '2rem',
                                    textAlign: 'center',
                                    opacity: 1,  // GSAP controls this via fromTo, do not set 0 here
                                    transition: 'transform 0.3s, box-shadow 0.3s, border-color 0.3s',
                                }}
                                    onMouseEnter={e => {
                                        e.currentTarget.style.transform = 'translateY(-4px)';
                                        e.currentTarget.style.boxShadow = `0 20px 50px ${w.color}18`;
                                        e.currentTarget.style.borderColor = `${w.color}40`;
                                    }}
                                    onMouseLeave={e => {
                                        e.currentTarget.style.transform = 'none';
                                        e.currentTarget.style.boxShadow = 'none';
                                        e.currentTarget.style.borderColor = `${w.color}18`;
                                    }}
                                >
                                    <div style={{ width: 56, height: 56, borderRadius: '50%', background: `${w.color}15`, border: `1.5px solid ${w.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
                                        <w.Icon size={22} style={{ color: w.color }} />
                                    </div>
                                    <h4 style={{ fontWeight: 700, color: '#E8E9FF', marginBottom: '0.6rem', fontSize: '1rem' }}>{w.title}</h4>
                                    <p style={{ color: '#9495B8', fontSize: '0.875rem', lineHeight: 1.65 }}>{w.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ══ CTA ════════════════════════════════════════════════════ */}
                <CtaSection />
            </main>
            <Footer />
        </>
    );
}

// ── Process Section (separate for GSAP) ──────────────────────────────────────
function ProcessSection() {
    const sectionRef = useRef(null);

    useGSAP((gsap, ScrollTrigger) => {
        if (!sectionRef.current) return;
        const steps = sectionRef.current.querySelectorAll('.process-step');
        const lines = sectionRef.current.querySelectorAll('.process-line');
        gsap.fromTo(steps,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, stagger: 0.2, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true } }
        );
        gsap.fromTo(lines,
            { scaleX: 0, transformOrigin: 'left center' },
            { scaleX: 1, duration: 0.6, stagger: 0.2, ease: 'power2.out', delay: 0.4, scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true } }
        );
    }, []);

    const steps = [
        { num: '01', label: 'Discovery', desc: 'We analyse your goals and requirements', color: '#7C6FFF' },
        { num: '02', label: 'Design', desc: 'Architecture and UI/UX blueprinting', color: '#FF6B9D' },
        { num: '03', label: 'Build', desc: 'Agile sprints with weekly demos', color: '#43E97B' },
        { num: '04', label: 'Launch', desc: 'Deploy, monitor, and optimise', color: '#FFB347' },
    ];

    return (
        <section ref={sectionRef} style={{ padding: '6rem 0', background: '#0A0B1A' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', background: 'rgba(67,233,123,0.1)', border: '1px solid rgba(67,233,123,0.3)', borderRadius: 20, padding: '0.35rem 0.9rem', fontSize: '0.78rem', color: '#43E97B', fontWeight: 700, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                        How We Work
                    </div>
                    <h2 style={{ fontSize: 'clamp(1.75rem,3.5vw,2.75rem)', fontWeight: 800, color: '#E8E9FF', letterSpacing: '-0.04em' }}>
                        Our{' '}
                        <span style={{ background: 'linear-gradient(135deg,#43E97B,#7C6FFF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Process</span>
                    </h2>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.5rem', position: 'relative' }}>
                    {steps.map((s, i) => (
                        <div key={s.num} className="process-step" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', opacity: 0, position: 'relative' }}>
                            {/* Connector line */}
                            {i < steps.length - 1 && (
                                <div className="process-line" style={{ position: 'absolute', top: 28, left: '60%', right: '-40%', height: 2, background: `linear-gradient(90deg, ${s.color}, ${steps[i + 1].color})`, zIndex: 0 }} />
                            )}

                            {/* Circle */}
                            <div style={{
                                width: 58, height: 58, borderRadius: '50%',
                                background: `${s.color}18`, border: `2px solid ${s.color}60`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontWeight: 900, fontSize: '0.95rem', color: s.color,
                                fontFamily: 'Space Grotesk', marginBottom: '1.25rem',
                                position: 'relative', zIndex: 1,
                                boxShadow: `0 0 30px ${s.color}20`,
                            }}>
                                {s.num}
                            </div>
                            <h4 style={{ fontWeight: 800, color: '#E8E9FF', marginBottom: '0.5rem', fontSize: '1.05rem' }}>{s.label}</h4>
                            <p style={{ color: '#9495B8', fontSize: '0.85rem', lineHeight: 1.6, maxWidth: 180 }}>{s.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ── CTA Section ───────────────────────────────────────────────────────────────
function CtaSection() {
    const ref = useRef(null);

    useGSAP((gsap, ScrollTrigger) => {
        if (!ref.current) return;
        gsap.fromTo(ref.current.querySelectorAll('.cta-item'),
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, stagger: 0.15, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 85%', once: true } }
        );
    }, []);

    return (
        <section ref={ref} style={{ padding: '7rem 0', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,111,255,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />

            <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                <div className="cta-item" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', background: 'rgba(255,107,157,0.1)', border: '1px solid rgba(255,107,157,0.3)', borderRadius: 20, padding: '0.35rem 0.9rem', fontSize: '0.78rem', color: '#FF6B9D', fontWeight: 700, marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '0.08em', opacity: 0 }}>
                    Get Started Today
                </div>

                <h2 className="cta-item" style={{ fontSize: 'clamp(2rem,5vw,4rem)', fontWeight: 900, letterSpacing: '-0.05em', color: '#E8E9FF', marginBottom: '1.25rem', opacity: 0, lineHeight: 1.1 }}>
                    Not sure which service?
                    <br />
                    <span style={{ background: 'linear-gradient(135deg,#7C6FFF,#FF6B9D)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        Let's talk.
                    </span>
                </h2>

                <p className="cta-item" style={{ color: '#9495B8', fontSize: '1.1rem', marginBottom: '2.5rem', maxWidth: 480, margin: '0 auto 2.5rem', lineHeight: 1.7, opacity: 0 }}>
                    Our team will help you pick the right solution, timeline, and budget for your needs.
                </p>

                <div className="cta-item" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', opacity: 0 }}>
                    <Link href="/contact" style={{
                        display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                        background: 'linear-gradient(135deg,#7C6FFF,#9f65ff)',
                        color: '#fff', fontWeight: 700, fontSize: '1rem',
                        padding: '1rem 2.25rem', borderRadius: 14, textDecoration: 'none',
                        boxShadow: '0 12px 40px rgba(124,111,255,0.45)',
                        transition: 'transform 0.2s, box-shadow 0.2s',
                    }}
                        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 18px 50px rgba(124,111,255,0.55)'; }}
                        onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(124,111,255,0.45)'; }}
                    >
                        Contact Us <FaArrowRight size={14} />
                    </Link>
                    <Link href="/careers" style={{
                        display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                        background: 'transparent', border: '1.5px solid rgba(255,255,255,0.15)',
                        color: '#E8E9FF', fontWeight: 700, fontSize: '1rem',
                        padding: '1rem 2.25rem', borderRadius: 14, textDecoration: 'none',
                        transition: 'border-color 0.2s, background 0.2s',
                    }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(124,111,255,0.5)'; e.currentTarget.style.background = 'rgba(124,111,255,0.06)'; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.background = 'transparent'; }}
                    >
                        Join Internship <FaGraduationCap size={16} />
                    </Link>
                </div>
            </div>
        </section>
    );
}

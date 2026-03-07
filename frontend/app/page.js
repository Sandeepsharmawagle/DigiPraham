'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import {
  FaBrain, FaChartBar, FaCode, FaMobileAlt, FaGraduationCap,
  FaCheckCircle, FaRocket, FaShieldAlt, FaBullseye, FaHeadset,
  FaArrowRight, FaQuoteLeft,
} from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';

// ── Data ─────────────────────────────────────────────────────────────────────
const services = [
  { Icon: FaBrain, title: 'AI & Machine Learning', desc: 'Custom ML pipelines, NLP, Computer Vision, and intelligent automation built end-to-end.', slug: 'ai-ml', color: '#7C6FFF', img: 'https://images.unsplash.com/photo-1677756119517-756a188d2d94?w=600&q=80' },
  { Icon: FaChartBar, title: 'Data Analytics', desc: 'Transform raw data into business insights with dashboards, ETL, and BI tools.', slug: 'data-analytics', color: '#FF6B9D', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80' },
  { Icon: FaCode, title: 'Web Development', desc: 'Full-stack web apps from landing pages to enterprise SaaS, beautifully crafted.', slug: 'web-development', color: '#43E97B', img: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&q=80' },
  { Icon: FaMobileAlt, title: 'App Development', desc: 'Cross-platform and native mobile apps for iOS and Android — delivered to production.', slug: 'app-development', color: '#FFB347', img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=80' },
  { Icon: FaGraduationCap, title: 'Internship Programs', desc: 'Paid internships in AI, Data, Web & App — real projects, mentorship, and certificates.', slug: null, href: '/careers', color: '#A78BFA', img: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&q=80' },
];

const stats = [
  { value: '50+', label: 'Projects Delivered' },
  { value: '30+', label: 'Happy Clients' },
  { value: '5', label: 'Core Services' },
  { value: '100%', label: 'Client Satisfaction' },
];

const techLogos = ['Python', 'TensorFlow', 'React', 'Node.js', 'Flutter', 'MongoDB', 'PyTorch', 'Next.js', 'Docker', 'AWS', 'LangChain', 'Kubernetes'];

const whyUs = [
  { Icon: FaRocket, title: 'Fast Delivery', desc: 'Agile sprints with rapid iterations and weekly demos.', color: '#7C6FFF' },
  { Icon: FaShieldAlt, title: 'Secure & Scalable', desc: 'Enterprise-grade architecture built to scale.', color: '#FF6B9D' },
  { Icon: FaBullseye, title: 'Goal-Oriented', desc: 'Every decision tied to measurable outcomes.', color: '#43E97B' },
  { Icon: FaHeadset, title: '24/7 Support', desc: 'Dedicated post-launch support whenever you need.', color: '#FFB347' },
];

const testimonials = [
  { name: 'Rahul Sharma', role: 'CTO, TechStartup', text: 'DigiPratham built our ML pipeline from scratch. Their AI expertise is truly unmatched.', color: '#7C6FFF', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80' },
  { name: 'Priya Patel', role: 'Founder, DataCo', text: 'The analytics dashboard they delivered transformed how we make critical business decisions.', color: '#FF6B9D', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80' },
  { name: 'Amit Verma', role: 'PM, EcomBrand', text: 'Outstanding web development. On time, within budget, and beyond our expectations.', color: '#43E97B', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80' },
];

// ── GSAP hook ─────────────────────────────────────────────────────────────────
function useGSAP(cb, deps = []) {
  useEffect(() => {
    let cleanup;
    (async () => {
      try {
        const { gsap } = await import('gsap');
        const { ScrollTrigger } = await import('gsap/ScrollTrigger');
        gsap.registerPlugin(ScrollTrigger);
        cleanup = cb(gsap, ScrollTrigger);
      } catch { }
    })();
    return () => { if (typeof cleanup === 'function') cleanup(); };
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps
}

// ── Three.js Hero Canvas ──────────────────────────────────────────────────────
function ThreeHero() {
  const mountRef = useRef(null);
  const disposeRef = useRef(null);

  useEffect(() => {
    let animId;
    (async () => {
      try {
        const THREE = await import('three');
        const el = mountRef.current;
        if (!el) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(50, el.offsetWidth / el.offsetHeight, 0.1, 1000);
        camera.position.set(0, 0, 100);

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(el.offsetWidth, el.offsetHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        el.appendChild(renderer.domElement);

        // Color palette matching services
        const palette = [0x7C6FFF, 0xFF6B9D, 0x43E97B, 0xFFB347, 0xA78BFA];

        // Multi-group particles
        const groups = palette.map((hex, i) => {
          const count = 80;
          const geo = new THREE.BufferGeometry();
          const pos = new Float32Array(count * 3);
          for (let j = 0; j < count; j++) {
            pos[j * 3] = (Math.random() - 0.5) * 260;
            pos[j * 3 + 1] = (Math.random() - 0.5) * 200;
            pos[j * 3 + 2] = (Math.random() - 0.5) * 120;
          }
          geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
          const size = 0.8 + (i % 2) * 0.5;
          const mat = new THREE.PointsMaterial({ color: hex, size, transparent: true, opacity: 0.55 });
          const pts = new THREE.Points(geo, mat);
          scene.add(pts);
          return pts;
        });

        // Floating wireframe rings
        const rings = [40, 60, 80].map((r, i) => {
          const geo = new THREE.TorusGeometry(r, 0.25, 8, 64);
          const mat = new THREE.MeshBasicMaterial({ color: palette[i], wireframe: true, transparent: true, opacity: 0.04 + i * 0.015 });
          const mesh = new THREE.Mesh(geo, mat);
          mesh.rotation.x = Math.PI / (3 + i);
          scene.add(mesh);
          return mesh;
        });

        // Line connections
        const allPts = [];
        groups.forEach(g => {
          const a = g.geometry.attributes.position.array;
          for (let i = 0; i < a.length; i += 3) allPts.push([a[i], a[i + 1], a[i + 2]]);
        });
        const verts = [];
        for (let i = 0; i < allPts.length; i += 2) {
          for (let j = i + 1; j < Math.min(i + 6, allPts.length); j++) {
            const dx = allPts[i][0] - allPts[j][0];
            const dy = allPts[i][1] - allPts[j][1];
            if (Math.sqrt(dx * dx + dy * dy) < 22) verts.push(...allPts[i], ...allPts[j]);
          }
        }
        const lineGeo = new THREE.BufferGeometry();
        lineGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(verts), 3));
        scene.add(new THREE.LineSegments(lineGeo, new THREE.LineBasicMaterial({ color: 0x7C6FFF, transparent: true, opacity: 0.05 })));

        // Mouse parallax
        let mx = 0, my = 0;
        const onMouse = (e) => {
          mx = (e.clientX / window.innerWidth - 0.5) * 2;
          my = (e.clientY / window.innerHeight - 0.5) * 2;
        };
        window.addEventListener('mousemove', onMouse);

        let t = 0;
        const animate = () => {
          animId = requestAnimationFrame(animate);
          t += 0.003;
          groups.forEach((g, i) => {
            g.rotation.y = t * (0.06 + i * 0.012);
            g.rotation.x = Math.sin(t * 0.3 + i) * 0.04;
          });
          rings.forEach((r, i) => {
            r.rotation.z = t * (0.04 + i * 0.02);
            r.rotation.x += 0.001;
          });
          camera.position.x += (mx * 8 - camera.position.x) * 0.04;
          camera.position.y += (-my * 6 - camera.position.y) * 0.04;
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

        disposeRef.current = () => {
          cancelAnimationFrame(animId);
          window.removeEventListener('mousemove', onMouse);
          window.removeEventListener('resize', onResize);
          renderer.dispose();
          try { el.removeChild(renderer.domElement); } catch { }
        };
      } catch { }
    })();
    return () => { if (disposeRef.current) disposeRef.current(); };
  }, []);

  return (
    <div ref={mountRef} style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }} />
  );
}

// ── Service Card with GSAP ────────────────────────────────────────────────────
function ServiceCard({ svc, index }) {
  const ref = useRef(null);
  const [hov, setHov] = useState(false);

  useGSAP((gsap, ScrollTrigger) => {
    if (!ref.current) return;
    gsap.from(ref.current, {
      opacity: 0, y: 60, scale: 0.94,
      duration: 0.75, ease: 'power3.out', delay: index * 0.09,
      scrollTrigger: { trigger: ref.current, start: 'top 88%', once: true },
    });
  }, [index]);

  const href = svc.href || `/services/${svc.slug}`;
  return (
    <Link href={href} style={{ textDecoration: 'none' }}>
      <div
        ref={ref}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          background: hov ? `linear-gradient(135deg, ${svc.color}15, ${svc.color}04)` : 'rgba(255,255,255,0.03)',
          border: `1.5px solid ${hov ? svc.color + '55' : 'rgba(255,255,255,0.07)'}`,
          borderRadius: 22,
          overflow: 'hidden',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
          transform: hov ? 'translateY(-8px)' : 'none',
          boxShadow: hov ? `0 30px 70px ${svc.color}20` : 'none',
          cursor: 'pointer',
        }}
      >
        {/* Image */}
        <div style={{ position: 'relative', height: 188, flexShrink: 0, overflow: 'hidden' }}>
          <Image src={svc.img} alt={svc.title} fill style={{ objectFit: 'cover', transition: 'transform 0.5s', transform: hov ? 'scale(1.07)' : 'scale(1)' }} />
          <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to bottom, ${svc.color}20, rgba(10,11,26,0.75))` }} />
          <div style={{ position: 'absolute', top: 16, left: 16, width: 48, height: 48, borderRadius: 13, background: `${svc.color}22`, border: `1.5px solid ${svc.color}55`, backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svc.Icon size={22} style={{ color: svc.color }} />
          </div>
          {svc.href && (
            <div style={{ position: 'absolute', top: 16, right: 16 }}>
              <span style={{ background: `${svc.color}25`, border: `1px solid ${svc.color}50`, borderRadius: 20, padding: '0.2rem 0.65rem', fontSize: '0.68rem', color: svc.color, fontWeight: 700 }}>🎓 New</span>
            </div>
          )}
          <div style={{
            position: 'absolute', bottom: 14, right: 14, width: 34, height: 34, borderRadius: '50%',
            background: svc.color, display: 'flex', alignItems: 'center', justifyContent: 'center',
            transform: hov ? 'scale(1)' : 'scale(0)', transition: 'transform 0.35s cubic-bezier(0.34,1.56,0.64,1)',
            boxShadow: `0 4px 16px ${svc.color}55`,
          }}>
            <FaArrowRight size={13} color="#fff" />
          </div>
        </div>
        {/* Body */}
        <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontWeight: 800, fontSize: '1.05rem', color: '#E8E9FF', marginBottom: '0.55rem', letterSpacing: '-0.02em' }}>{svc.title}</h3>
          <p style={{ color: '#9495B8', fontSize: '0.85rem', lineHeight: 1.75, flex: 1, marginBottom: '1.1rem' }}>{svc.desc}</p>
          <div style={{ color: svc.color, fontSize: '0.82rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.35rem', fontFamily: 'Space Grotesk' }}>
            {svc.href ? 'View Programs' : 'Learn more'} <FaArrowRight size={11} />
          </div>
        </div>
      </div>
    </Link>
  );
}

// ── Counter animation ─────────────────────────────────────────────────────────
function AnimatedStat({ value, label, delay }) {
  const ref = useRef(null);
  useGSAP((gsap, ScrollTrigger) => {
    if (!ref.current) return;
    gsap.from(ref.current, {
      opacity: 0, y: 30, duration: 0.7, ease: 'power3.out', delay,
      scrollTrigger: { trigger: ref.current, start: 'top 88%', once: true },
    });
  }, [delay]);
  return (
    <div ref={ref} style={{ textAlign: 'center' }}>
      <div style={{ fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 900, color: '#7C6FFF', fontFamily: 'Space Grotesk', letterSpacing: '-0.04em', lineHeight: 1 }}>{value}</div>
      <div style={{ color: '#9495B8', fontSize: '0.8rem', marginTop: '0.4rem', fontWeight: 500 }}>{label}</div>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function HomePage() {
  const heroTitleRef = useRef(null);
  const heroSubRef = useRef(null);
  const heroBtnsRef = useRef(null);
  const heroStatsRef = useRef(null);
  const heroImgRef = useRef(null);
  const whySectionRef = useRef(null);
  const ctaSectionRef = useRef(null);

  // Hero entrance timeline
  useGSAP((gsap) => {
    const tl = gsap.timeline({ delay: 0.1 });
    tl.from(heroTitleRef.current, { opacity: 0, y: 60, filter: 'blur(12px)', duration: 1, ease: 'power3.out' })
      .from(heroSubRef.current, { opacity: 0, y: 30, duration: 0.7, ease: 'power3.out' }, '-=0.5')
      .from(heroBtnsRef.current, { opacity: 0, y: 20, duration: 0.6, ease: 'power3.out' }, '-=0.45')
      .from(heroStatsRef.current?.children ? [...heroStatsRef.current.children] : [], { opacity: 0, y: 20, stagger: 0.1, duration: 0.5, ease: 'power3.out' }, '-=0.3')
      .from(heroImgRef.current, { opacity: 0, x: 60, scale: 0.92, duration: 1, ease: 'power3.out' }, '-=1.1');
  }, []);

  // Why us stagger
  useGSAP((gsap, ScrollTrigger) => {
    if (!whySectionRef.current) return;
    gsap.from(whySectionRef.current.querySelectorAll('.why-card'), {
      opacity: 0, y: 40, scale: 0.96, stagger: 0.12, duration: 0.65, ease: 'power3.out',
      scrollTrigger: { trigger: whySectionRef.current, start: 'top 82%', once: true },
    });
  }, []);

  // CTA section
  useGSAP((gsap, ScrollTrigger) => {
    if (!ctaSectionRef.current) return;
    gsap.from(ctaSectionRef.current.querySelectorAll('.cta-el'), {
      opacity: 0, y: 40, stagger: 0.15, duration: 0.75, ease: 'power3.out',
      scrollTrigger: { trigger: ctaSectionRef.current, start: 'top 85%', once: true },
    });
  }, []);

  return (
    <>
      <Navbar />
      <main style={{ background: '#0A0B1A', overflowX: 'hidden' }}>

        {/* ══ HERO ═══════════════════════════════════════════════════════ */}
        <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: 90, paddingBottom: '5rem', overflow: 'hidden' }}>
          <ThreeHero />
          {/* bottom fade */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 200, background: 'linear-gradient(to bottom, transparent, #0A0B1A)', zIndex: 1, pointerEvents: 'none' }} />

          <div className="container" style={{ position: 'relative', zIndex: 2 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>

              {/* LEFT */}
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', background: 'rgba(124,111,255,0.12)', border: '1px solid rgba(124,111,255,0.35)', borderRadius: 20, padding: '0.4rem 1rem', fontSize: '0.82rem', color: '#A78BFA', fontWeight: 600, marginBottom: '2rem' }}>
                  <HiSparkles /> AI-First Digital Solutions
                </div>

                <h1 ref={heroTitleRef} style={{ fontSize: 'clamp(2.75rem,6vw,5.5rem)', fontWeight: 900, letterSpacing: '-0.05em', lineHeight: 1.02, color: '#E8E9FF', marginBottom: '1.5rem' }}>
                  Build Smarter<br />
                  with{' '}
                  <span style={{ background: 'linear-gradient(135deg,#7C6FFF 20%,#FF6B9D 80%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    DigiPratham
                  </span>
                </h1>

                <p ref={heroSubRef} style={{ fontSize: 'clamp(1rem,2vw,1.2rem)', color: '#9495B8', maxWidth: 500, lineHeight: 1.75, marginBottom: '2.5rem' }}>
                  We deliver AI & ML, Data Analytics, Web & App Development services that drive real, measurable business results.
                </p>

                <div ref={heroBtnsRef} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '3.5rem' }}>
                  <Link href="/services" style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                    background: 'linear-gradient(135deg,#7C6FFF,#9f65ff)',
                    color: '#fff', fontWeight: 700, fontSize: '1rem',
                    padding: '0.95rem 2.25rem', borderRadius: 14, textDecoration: 'none',
                    boxShadow: '0 12px 40px rgba(124,111,255,0.45)',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 18px 50px rgba(124,111,255,0.55)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(124,111,255,0.45)'; }}
                  >
                    Explore Services <FaArrowRight size={14} />
                  </Link>
                  <Link href="/careers" style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                    background: 'transparent', border: '1.5px solid rgba(255,255,255,0.15)',
                    color: '#E8E9FF', fontWeight: 700, fontSize: '1rem',
                    padding: '0.95rem 2.25rem', borderRadius: 14, textDecoration: 'none',
                    transition: 'border-color 0.2s, background 0.2s',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(124,111,255,0.5)'; e.currentTarget.style.background = 'rgba(124,111,255,0.06)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.background = 'transparent'; }}
                  >
                    <FaGraduationCap size={16} /> Join Internship
                  </Link>
                </div>

                {/* Stats */}
                <div ref={heroStatsRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(4,auto)', gap: '2rem', borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '2rem' }}>
                  {stats.map(s => (
                    <div key={s.label} style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '1.7rem', fontWeight: 900, color: '#7C6FFF', fontFamily: 'Space Grotesk', letterSpacing: '-0.04em' }}>{s.value}</div>
                      <div style={{ color: '#9495B8', fontSize: '0.72rem', marginTop: '0.3rem', fontWeight: 500 }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT: Hero image */}
              <div ref={heroImgRef} style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
                <div style={{ position: 'relative', width: '100%', maxWidth: 520, aspectRatio: '4/3', borderRadius: 24, overflow: 'hidden', boxShadow: '0 40px 100px rgba(124,111,255,0.2)' }}>
                  <Image src="https://images.unsplash.com/photo-1555421689-d68471e189f2?w=1000&q=85" alt="Team collaborating on AI solutions" fill style={{ objectFit: 'cover' }} priority />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(124,111,255,0.28) 0%, rgba(255,107,157,0.12) 100%)' }} />
                </div>
                {/* Badge */}
                <div style={{ position: 'absolute', bottom: -18, left: 20, background: 'rgba(15,12,41,0.9)', border: '1px solid rgba(124,111,255,0.25)', borderRadius: 16, padding: '0.85rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem', backdropFilter: 'blur(16px)', boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg,#7C6FFF,#FF6B9D)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem' }}>✨</div>
                  <div>
                    <div style={{ fontWeight: 700, color: '#E8E9FF', fontSize: '0.85rem' }}>AI-Powered Solutions</div>
                    <div style={{ color: '#9495B8', fontSize: '0.72rem' }}>Trusted by 30+ clients</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ MARQUEE ════════════════════════════════════════════════════ */}
        <div style={{ background: 'rgba(255,255,255,0.025)', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '1.1rem 0', overflow: 'hidden' }}>
          <div className="marquee-wrap">
            <div className="marquee-track">
              {[...techLogos, ...techLogos].map((t, i) => (
                <span key={i} style={{ margin: '0 2rem', color: '#9495B8', fontSize: '0.85rem', fontWeight: 600, fontFamily: 'Space Grotesk', letterSpacing: '0.06em', whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#7C6FFF', display: 'inline-block', opacity: 0.7 }} />{t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ══ SERVICES GRID ══════════════════════════════════════════════ */}
        <section style={{ padding: '7rem 0 6rem', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '20%', left: '-8%', width: 400, height: 400, borderRadius: '50%', background: '#7C6FFF', opacity: 0.04, filter: 'blur(80px)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: '10%', right: '-8%', width: 350, height: 350, borderRadius: '50%', background: '#FF6B9D', opacity: 0.04, filter: 'blur(80px)', pointerEvents: 'none' }} />
          <div className="container">
            <ServicesHeader />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(270px,1fr))', gap: '1.5rem' }}>
              {services.map((svc, i) => <ServiceCard key={svc.title} svc={svc} index={i} />)}
            </div>
          </div>
        </section>

        {/* ══ WHY DIGIPRATHAM ════════════════════════════════════════════ */}
        <section style={{ padding: '7rem 0', background: 'rgba(255,255,255,0.015)', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))', gap: '5rem', alignItems: 'center' }}>
              {/* Left image */}
              <WhyImage />
              {/* Right: cards */}
              <div>
                <WhySectionHeader />
                <div ref={whySectionRef} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.1rem' }}>
                  {whyUs.map(w => (
                    <div key={w.title} className="why-card" style={{
                      background: 'rgba(255,255,255,0.03)', border: `1.5px solid ${w.color}18`,
                      borderRadius: 18, padding: '1.5rem', transition: 'transform 0.3s, box-shadow 0.3s, border-color 0.3s',
                    }}
                      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = `0 18px 50px ${w.color}18`; e.currentTarget.style.borderColor = `${w.color}40`; }}
                      onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = `${w.color}18`; }}
                    >
                      <div style={{ width: 44, height: 44, borderRadius: 12, background: `${w.color}15`, border: `1.5px solid ${w.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.9rem' }}>
                        <w.Icon size={20} style={{ color: w.color }} />
                      </div>
                      <h4 style={{ fontWeight: 700, color: '#E8E9FF', marginBottom: '0.4rem', fontSize: '0.9rem' }}>{w.title}</h4>
                      <p style={{ color: '#9495B8', fontSize: '0.8rem', lineHeight: 1.65 }}>{w.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ INTERNSHIP STRIP ═══════════════════════════════════════════ */}
        <InternshipStrip />

        {/* ══ TESTIMONIALS ═══════════════════════════════════════════════ */}
        <section style={{ padding: '7rem 0', background: '#0A0B1A' }}>
          <div className="container">
            <TestimonialsHeader />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(290px,1fr))', gap: '1.5rem' }}>
              {testimonials.map((t, i) => <TestCard key={t.name} t={t} i={i} />)}
            </div>
          </div>
        </section>

        {/* ══ CTA ════════════════════════════════════════════════════════ */}
        <section ref={ctaSectionRef} style={{ padding: '8rem 0', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 700, height: 700, borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,111,255,0.09) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', inset: 0 }}>
            <Image src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1600&q=80" alt="Tech workspace" fill style={{ objectFit: 'cover', opacity: 0.06 }} />
          </div>
          <div className="container" style={{ position: 'relative', zIndex: 2 }}>
            <div className="cta-el" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', background: 'rgba(255,107,157,0.1)', border: '1px solid rgba(255,107,157,0.3)', borderRadius: 20, padding: '0.35rem 0.9rem', fontSize: '0.78rem', color: '#FF6B9D', fontWeight: 700, marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Get Started Today
            </div>
            <h2 className="cta-el" style={{ fontSize: 'clamp(2.5rem,6vw,5rem)', fontWeight: 900, letterSpacing: '-0.05em', lineHeight: 1.05, color: '#E8E9FF', marginBottom: '1.25rem' }}>
              Ready to Transform<br />
              <span style={{ background: 'linear-gradient(135deg,#7C6FFF,#FF6B9D)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Your Business?
              </span>
            </h2>
            <p className="cta-el" style={{ color: '#9495B8', fontSize: '1.1rem', marginBottom: '2.5rem', maxWidth: 480, margin: '0 auto 2.5rem', lineHeight: 1.75 }}>
              Register free and get access to all services. Start your journey with DigiPratham today.
            </p>
            <div className="cta-el" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/register" style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                background: 'linear-gradient(135deg,#7C6FFF,#9f65ff)', color: '#fff',
                fontWeight: 700, fontSize: '1rem', padding: '1rem 2.5rem', borderRadius: 14,
                textDecoration: 'none', boxShadow: '0 12px 40px rgba(124,111,255,0.45)',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 18px 50px rgba(124,111,255,0.55)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(124,111,255,0.45)'; }}
              >
                Get Started Free <FaArrowRight size={14} />
              </Link>
              <Link href="/contact" style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                background: 'transparent', border: '1.5px solid rgba(255,255,255,0.15)',
                color: '#E8E9FF', fontWeight: 700, fontSize: '1rem',
                padding: '1rem 2.5rem', borderRadius: 14, textDecoration: 'none',
                transition: 'border-color 0.2s, background 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(124,111,255,0.5)'; e.currentTarget.style.background = 'rgba(124,111,255,0.06)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.background = 'transparent'; }}
              >
                Talk to Us
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

// ── Small sub-components (keep main lean) ─────────────────────────────────────
function ServicesHeader() {
  const ref = useRef(null);
  useGSAP((gsap, ScrollTrigger) => {
    if (!ref.current) return;
    gsap.from(ref.current.children, { opacity: 0, y: 30, stagger: 0.12, duration: 0.65, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 88%', once: true } });
  }, []);
  return (
    <div ref={ref} style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', background: 'rgba(124,111,255,0.1)', border: '1px solid rgba(124,111,255,0.3)', borderRadius: 20, padding: '0.35rem 0.9rem', fontSize: '0.78rem', color: '#A78BFA', fontWeight: 700, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>What We Do</div>
      <h2 style={{ fontSize: 'clamp(1.75rem,3.5vw,3rem)', fontWeight: 800, color: '#E8E9FF', letterSpacing: '-0.04em', marginBottom: '0.75rem' }}>
        Our Core{' '}
        <span style={{ background: 'linear-gradient(135deg,#7C6FFF,#FF6B9D)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Services</span>
      </h2>
      <p style={{ color: '#9495B8', fontSize: '1.05rem', maxWidth: 480, margin: '0 auto' }}>Cutting-edge technology solutions, tailored for your growth.</p>
    </div>
  );
}

function WhyImage() {
  const ref = useRef(null);
  useGSAP((gsap, ScrollTrigger) => {
    if (!ref.current) return;
    gsap.from(ref.current, { opacity: 0, x: -60, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 80%', once: true } });
  }, []);
  return (
    <div ref={ref} style={{ position: 'relative', borderRadius: 22, overflow: 'hidden', aspectRatio: '16/10', boxShadow: '0 24px 70px rgba(0,0,0,0.45)' }}>
      <Image src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&q=80" alt="Team working together" fill style={{ objectFit: 'cover' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(124,111,255,0.3) 0%, rgba(0,0,0,0.15) 100%)' }} />
    </div>
  );
}

function WhySectionHeader() {
  const ref = useRef(null);
  useGSAP((gsap, ScrollTrigger) => {
    if (!ref.current) return;
    gsap.from(ref.current.children, { opacity: 0, y: 30, stagger: 0.1, duration: 0.65, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 85%', once: true } });
  }, []);
  return (
    <div ref={ref} style={{ marginBottom: '2rem' }}>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', background: 'rgba(124,111,255,0.1)', border: '1px solid rgba(124,111,255,0.3)', borderRadius: 20, padding: '0.35rem 0.9rem', fontSize: '0.78rem', color: '#A78BFA', fontWeight: 700, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Why DigiPratham</div>
      <h2 style={{ fontSize: 'clamp(1.75rem,3.5vw,3rem)', fontWeight: 800, color: '#E8E9FF', letterSpacing: '-0.04em', marginBottom: '0.75rem' }}>
        Built for{' '}
        <span style={{ background: 'linear-gradient(135deg,#43E97B,#7C6FFF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Results</span>
      </h2>
      <p style={{ color: '#9495B8', fontSize: '1rem', maxWidth: 380, lineHeight: 1.7, marginBottom: '2rem' }}>
        We combine deep expertise with agile delivery to create real impact for your business.
      </p>
    </div>
  );
}

function InternshipStrip() {
  const ref = useRef(null);
  useGSAP((gsap, ScrollTrigger) => {
    if (!ref.current) return;
    gsap.from(ref.current.querySelectorAll('.strip-el'), { opacity: 0, y: 40, stagger: 0.12, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 82%', once: true } });
  }, []);
  return (
    <section ref={ref} style={{ padding: '7rem 0', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(167,139,250,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: '4rem', alignItems: 'center' }}>
          <div>
            <div className="strip-el" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', background: 'rgba(167,139,250,0.1)', border: '1px solid rgba(167,139,250,0.3)', borderRadius: 20, padding: '0.35rem 0.9rem', fontSize: '0.78rem', color: '#A78BFA', fontWeight: 700, marginBottom: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              <FaGraduationCap /> Internship Programs
            </div>
            <h2 className="strip-el" style={{ fontSize: 'clamp(1.75rem,3.5vw,3rem)', fontWeight: 800, color: '#E8E9FF', letterSpacing: '-0.04em', marginBottom: '1rem', lineHeight: 1.1 }}>
              Launch Your{' '}
              <span style={{ background: 'linear-gradient(135deg,#A78BFA,#7C6FFF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Tech Career</span>
            </h2>
            <p className="strip-el" style={{ color: '#9495B8', lineHeight: 1.8, marginBottom: '2rem', fontSize: '1rem' }}>
              Work on live projects, get certified, and build the portfolio that gets you hired. Available in AI/ML, Data Analytics, Web & App Development.
            </p>
            <div className="strip-el" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link href="/careers" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'linear-gradient(135deg,#A78BFA,#7C6FFF)', color: '#fff', fontWeight: 700, fontSize: '0.95rem', padding: '0.85rem 2rem', borderRadius: 14, textDecoration: 'none', boxShadow: '0 10px 35px rgba(167,139,250,0.4)', transition: 'transform 0.2s', }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'} onMouseLeave={e => e.currentTarget.style.transform = 'none'}>
                View Programs <FaArrowRight size={13} />
              </Link>
              <Link href="/register" style={{ display: 'inline-flex', alignItems: 'center', background: 'transparent', border: '1.5px solid rgba(167,139,250,0.3)', color: '#A78BFA', fontWeight: 700, fontSize: '0.95rem', padding: '0.85rem 2rem', borderRadius: 14, textDecoration: 'none', transition: 'border-color 0.2s' }} onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(167,139,250,0.6)'} onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(167,139,250,0.3)'}>
                Register Free
              </Link>
            </div>
          </div>

          {/* Duration cards (no price) */}
          <div className="strip-el" style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
            {[
              { duration: '1 Month', accent: '#7C6FFF', badge: '🔥 Popular', features: ['Real project work', 'Expert mentorship', 'Certificate of Completion'], Icon: FaCode },
              { duration: '2 Months', accent: '#FF6B9D', badge: '⭐ Best Value', features: ['Capstone project', 'Portfolio review', 'Certificate of Excellence'], Icon: FaBrain },
            ].map(p => (
              <div key={p.duration} style={{ background: `${p.accent}06`, border: `1.5px solid ${p.accent}22`, borderRadius: 18, padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1.5rem', transition: 'border-color 0.3s, box-shadow 0.3s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = `${p.accent}45`; e.currentTarget.style.boxShadow = `0 16px 50px ${p.accent}12`; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = `${p.accent}22`; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', marginBottom: '0.55rem' }}>
                    <p.Icon size={17} style={{ color: p.accent }} />
                    <span style={{ fontWeight: 800, color: '#E8E9FF', fontSize: '0.95rem' }}>{p.duration} Internship</span>
                    <span style={{ background: `${p.accent}18`, border: `1px solid ${p.accent}35`, borderRadius: 12, padding: '0.15rem 0.55rem', fontSize: '0.65rem', color: p.accent, fontWeight: 700 }}>{p.badge}</span>
                  </div>
                  {p.features.map(f => (
                    <div key={f} style={{ fontSize: '0.8rem', color: '#9495B8', marginBottom: '0.22rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <FaCheckCircle size={10} style={{ color: p.accent, flexShrink: 0 }} /> {f}
                    </div>
                  ))}
                </div>
                <Link href="/careers" style={{ background: `linear-gradient(135deg,${p.accent},${p.accent}BB)`, color: '#fff', fontWeight: 700, fontSize: '0.8rem', padding: '0.55rem 1.15rem', borderRadius: 10, textDecoration: 'none', flexShrink: 0, whiteSpace: 'nowrap' }}>Apply</Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialsHeader() {
  const ref = useRef(null);
  useGSAP((gsap, ScrollTrigger) => {
    if (!ref.current) return;
    gsap.from(ref.current.children, { opacity: 0, y: 25, stagger: 0.1, duration: 0.6, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 85%', once: true } });
  }, []);
  return (
    <div ref={ref} style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', background: 'rgba(255,107,157,0.1)', border: '1px solid rgba(255,107,157,0.3)', borderRadius: 20, padding: '0.35rem 0.9rem', fontSize: '0.78rem', color: '#FF6B9D', fontWeight: 700, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Testimonials</div>
      <h2 style={{ fontSize: 'clamp(1.75rem,3.5vw,3rem)', fontWeight: 800, color: '#E8E9FF', letterSpacing: '-0.04em' }}>
        What Our{' '}
        <span style={{ background: 'linear-gradient(135deg,#FF6B9D,#FFB347)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Clients Say</span>
      </h2>
    </div>
  );
}

function TestCard({ t, i }) {
  const ref = useRef(null);
  useGSAP((gsap, ScrollTrigger) => {
    if (!ref.current) return;
    gsap.from(ref.current, { opacity: 0, y: 50, duration: 0.7, ease: 'power3.out', delay: i * 0.12, scrollTrigger: { trigger: ref.current, start: 'top 88%', once: true } });
  }, [i]);
  return (
    <div ref={ref} style={{ background: 'rgba(255,255,255,0.03)', border: `1.5px solid ${t.color}18`, borderRadius: 22, padding: '2.25rem', transition: 'transform 0.3s, border-color 0.3s, box-shadow 0.3s' }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.borderColor = `${t.color}40`; e.currentTarget.style.boxShadow = `0 20px 55px ${t.color}12`; }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = `${t.color}18`; e.currentTarget.style.boxShadow = 'none'; }}
    >
      <FaQuoteLeft size={22} style={{ color: t.color, marginBottom: '1.25rem', opacity: 0.7 }} />
      <div style={{ display: 'flex', gap: '0.15rem', marginBottom: '1.1rem' }}>
        {[...Array(5)].map((_, i) => <span key={i} style={{ color: '#FFB347', fontSize: '0.9rem' }}>★</span>)}
      </div>
      <p style={{ color: '#9495B8', lineHeight: 1.8, marginBottom: '1.75rem', fontStyle: 'italic', fontSize: '0.95rem' }}>"{t.text}"</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
        <div style={{ width: 48, height: 48, borderRadius: '50%', overflow: 'hidden', flexShrink: 0, border: `2px solid ${t.color}50`, position: 'relative' }}>
          <Image src={t.img} alt={t.name} fill style={{ objectFit: 'cover' }} />
        </div>
        <div>
          <div style={{ fontWeight: 700, color: '#E8E9FF', fontSize: '0.9rem' }}>{t.name}</div>
          <div style={{ color: '#9495B8', fontSize: '0.8rem' }}>{t.role}</div>
        </div>
      </div>
    </div>
  );
}

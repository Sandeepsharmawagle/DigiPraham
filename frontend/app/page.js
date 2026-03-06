'use client';
import Image from 'next/image';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Link from 'next/link';
import HeroReveal from './components/HeroReveal';
import ScrollReveal from './components/ScrollReveal';

const services = [
  {
    icon: '🤖',
    title: 'AI & Machine Learning',
    desc: 'End-to-end ML pipelines, NLP, Computer Vision, and intelligent automation.',
    slug: 'ai-ml',
    color: '#7C6FFF',
    img: 'https://images.unsplash.com/photo-1677756119517-756a188d2d94?w=600&q=80',
  },
  {
    icon: '📊',
    title: 'Data Analytics',
    desc: 'Transform raw data into business insights with dashboards, ETL, and BI.',
    slug: 'data-analytics',
    color: '#FF6B9D',
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80',
  },
  {
    icon: '🌐',
    title: 'Web Development',
    desc: 'Full-stack web apps from landing pages to enterprise SaaS, beautifully crafted.',
    slug: 'web-development',
    color: '#43E97B',
    img: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&q=80',
  },
  {
    icon: '📱',
    title: 'App Development',
    desc: 'Cross-platform and native mobile apps for iOS and Android.',
    slug: 'app-development',
    color: '#FFB347',
    img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=80',
  },
];

const stats = [
  { value: '50+', label: 'Projects Delivered' },
  { value: '30+', label: 'Happy Clients' },
  { value: '4', label: 'Core Services' },
  { value: '100%', label: 'Client Satisfaction' },
];

const testimonials = [
  {
    name: 'Rahul Sharma',
    role: 'CTO, TechStartup',
    text: 'DigiPratham built our ML pipeline from scratch. Their expertise in AI is unmatched.',
    color: '#7C6FFF',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
  },
  {
    name: 'Priya Patel',
    role: 'Founder, DataCo',
    text: 'The analytics dashboard they delivered transformed how we make business decisions.',
    color: '#FF6B9D',
    img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
  },
  {
    name: 'Amit Verma',
    role: 'PM, EcomBrand',
    text: 'Outstanding web development. Delivered on time, within budget, and beyond our expectations.',
    color: '#43E97B',
    img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
  },
];

const techLogos = ['Python', 'TensorFlow', 'React', 'Node.js', 'Flutter', 'MongoDB', 'PyTorch', 'Next.js', 'Docker', 'AWS'];

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        {/* ══ HERO ═══════════════════════════════════════════════════ */}
        <section className="hero-bg grid-bg" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: 90, paddingBottom: '6rem', position: 'relative' }}>
          {/* Decorative glow orbs */}
          <div className="glow-dot" style={{ width: 400, height: 400, background: '#7C6FFF', top: '10%', right: '5%', opacity: 0.12 }} />
          <div className="glow-dot" style={{ width: 300, height: 300, background: '#FF6B9D', bottom: '15%', left: '8%', opacity: 0.1 }} />

          <div className="container" style={{ position: 'relative', zIndex: 2 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
              {/* Left: Text */}
              <div>
                <HeroReveal delay={0.1} y={24} blur={8}>
                  <div className="badge" style={{ marginBottom: '2rem' }}>🚀 AI-First Digital Solutions</div>
                </HeroReveal>
                <HeroReveal delay={0.25} y={40} blur={14} as="h1"
                  className="display-1"
                  style={{ marginBottom: '1.5rem', color: 'var(--text-main)' }}
                >
                  Build Smarter<br />
                  with <span className="gradient-text">DigiPratham</span>
                </HeroReveal>
                <HeroReveal delay={0.45} y={30} blur={10}>
                  <p style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', color: 'var(--text-muted)', maxWidth: 520, lineHeight: 1.7, marginBottom: '2.5rem' }}>
                    We deliver AI &amp; ML, Data Analytics, Web Development, and App Development services that drive real, measurable business results.
                  </p>
                </HeroReveal>
                <HeroReveal delay={0.6} y={24} blur={8}>
                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '4rem' }}>
                    <Link href="/services" className="btn-primary" style={{ fontSize: '1rem', padding: '0.95rem 2.25rem' }}>Explore Services →</Link>
                    <Link href="/careers" className="btn-ghost" style={{ fontSize: '1rem', padding: '0.95rem 2.25rem' }}>Join Internship</Link>
                  </div>
                </HeroReveal>

                {/* Stats Row */}
                <HeroReveal delay={0.75} y={20} blur={6}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '1.5rem', borderTop: '1px solid var(--border-card)', paddingTop: '2.5rem' }}>
                    {stats.map(s => (
                      <div key={s.label} style={{ textAlign: 'center' }}>
                        <div className="stat-number">{s.value}</div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.4rem', fontWeight: 500 }}>{s.label}</div>
                      </div>
                    ))}
                  </div>
                </HeroReveal>
              </div>

              {/* Right: Hero Image */}
              <HeroReveal delay={0.4} y={50} blur={16} style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
                <div style={{ position: 'relative', width: '100%', maxWidth: 520, aspectRatio: '4/3', borderRadius: 24, overflow: 'hidden', boxShadow: '0 32px 80px rgba(124,111,255,0.25)' }}>
                  <Image
                    src="https://images.unsplash.com/photo-1555421689-d68471e189f2?w=1000&q=85"
                    alt="Team collaborating on AI and technology solutions"
                    fill
                    style={{ objectFit: 'cover' }}
                    priority
                  />
                  {/* Gradient overlay */}
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(124,111,255,0.3) 0%, rgba(255,107,157,0.15) 100%)' }} />
                </div>
                {/* Floating badge */}
                <div style={{ position: 'absolute', bottom: -18, left: 24, background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 16, padding: '0.85rem 1.35rem', display: 'flex', alignItems: 'center', gap: '0.75rem', backdropFilter: 'blur(12px)', boxShadow: '0 8px 32px rgba(0,0,0,0.18)' }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg,#7C6FFF,#FF6B9D)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem' }}>✨</div>
                  <div>
                    <div style={{ fontWeight: 700, color: 'var(--text-main)', fontSize: '0.85rem' }}>AI-Powered Solutions</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.72rem' }}>Trusted by 30+ clients</div>
                  </div>
                </div>
              </HeroReveal>
            </div>
          </div>
        </section>

        {/* ══ MARQUEE TICKER ════════════════════════════════════════ */}
        <div style={{ background: 'var(--bg-section)', borderTop: '1px solid var(--border-card)', borderBottom: '1px solid var(--border-card)', padding: '1.25rem 0', overflow: 'hidden' }}>
          <div className="marquee-wrap">
            <div className="marquee-track">
              {[...techLogos, ...techLogos].map((t, i) => (
                <span key={i} style={{ margin: '0 2rem', color: 'var(--text-muted)', fontSize: '0.875rem', fontWeight: 600, fontFamily: 'Space Grotesk', letterSpacing: '0.05em', whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--primary)', display: 'inline-block', opacity: 0.6 }} />
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ══ SERVICES GRID ═════════════════════════════════════════ */}
        <section className="section">
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <ScrollReveal as="div" style={{ marginBottom: '1.25rem' }}>
                <div className="badge">What We Do</div>
              </ScrollReveal>
              <ScrollReveal
                text="Our Core Services"
                as="h2"
                className="section-title"
                style={{ marginBottom: '1.1rem', color: 'var(--text-main)' }}
                baseOpacity={0.05}
                enableBlur
                baseBlur={6}
                stagger={0.07}
                duration={0.75}
              />
              <ScrollReveal as="p" style={{ color: 'var(--text-muted)', fontSize: '1.075rem', maxWidth: 520, margin: '0 auto' }}>
                Cutting-edge technology solutions, tailored for your growth
              </ScrollReveal>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: '1.5rem' }}>
              {services.map((svc) => (
                <Link key={svc.slug} href={`/services/${svc.slug}`} style={{ textDecoration: 'none' }}>
                  <div className="glass-card" style={{ overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column' }}>
                    {/* Service Image */}
                    <div style={{ position: 'relative', width: '100%', height: 180, flexShrink: 0 }}>
                      <Image
                        src={svc.img}
                        alt={svc.title}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                      <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to bottom, ${svc.color}22, rgba(0,0,0,0.55))` }} />
                      <div style={{ position: 'absolute', top: 16, left: 16, width: 48, height: 48, borderRadius: 12, background: `${svc.color}25`, border: `1.5px solid ${svc.color}60`, backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>{svc.icon}</div>
                    </div>
                    {/* Content */}
                    <div style={{ padding: '1.75rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <h3 style={{ fontWeight: 700, marginBottom: '0.65rem', fontSize: '1.1rem', color: 'var(--text-main)', letterSpacing: '-0.02em' }}>{svc.title}</h3>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: 1.75, marginBottom: '1.25rem', flex: 1 }}>{svc.desc}</p>
                      <div style={{ color: svc.color, fontSize: '0.85rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.3rem', fontFamily: 'Space Grotesk' }}>Learn more →</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ══ DARK SECTION — Why DigiPratham ═══════════════════════ */}
        <section className="dark-section" style={{ padding: '8rem 0 7rem', marginTop: '2rem' }}>
          <div className="container" style={{ position: 'relative', zIndex: 2 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center', marginBottom: '4rem' }}>
              {/* Image column */}
              <div style={{ position: 'relative', borderRadius: 20, overflow: 'hidden', aspectRatio: '16/10', boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}>
                <Image
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&q=80"
                  alt="Agile team working together in a modern tech office"
                  fill
                  style={{ objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(124,111,255,0.35) 0%, rgba(0,0,0,0.2) 100%)' }} />
              </div>
              {/* Text column */}
              <div>
                <ScrollReveal as="div" style={{ marginBottom: '1.25rem' }}>
                  <div className="badge" style={{ background: 'rgba(124,111,255,0.15)', borderColor: 'rgba(124,111,255,0.4)' }}>Why Choose Us</div>
                </ScrollReveal>
                <ScrollReveal
                  text="Built for Results"
                  as="h2"
                  style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)', fontWeight: 800, letterSpacing: '-0.04em', color: '#fff', marginBottom: '1.25rem' }}
                  baseOpacity={0.05}
                  enableBlur
                  baseBlur={8}
                  stagger={0.08}
                  duration={0.8}
                />
                <ScrollReveal as="div" style={{ color: 'rgba(255,255,255,0.55)', fontSize: '1.05rem', marginBottom: '2.5rem', lineHeight: 1.7 }}>
                  We combine deep expertise with agile delivery to create real impact for your business.
                </ScrollReveal>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                  {[
                    { icon: '⚡', title: 'Fast Delivery', desc: 'Agile sprints with rapid iterations.', grad: '#7C6FFF' },
                    { icon: '🔒', title: 'Secure & Scalable', desc: 'Enterprise-grade architecture.', grad: '#FF6B9D' },
                    { icon: '🎯', title: 'Goal-Oriented', desc: 'Tied to measurable outcomes.', grad: '#43E97B' },
                    { icon: '🤝', title: '24/7 Support', desc: 'Dedicated post-launch support.', grad: '#FFB347' },
                  ].map(w => (
                    <div key={w.title} className="dark-card" style={{ padding: '1.5rem' }}>
                      <div style={{ width: 44, height: 44, borderRadius: 12, background: `${w.grad}15`, border: `1.5px solid ${w.grad}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', marginBottom: '0.85rem' }}>{w.icon}</div>
                      <h4 style={{ fontWeight: 700, color: '#111', marginBottom: '0.4rem', fontSize: '0.9rem' }}>{w.title}</h4>
                      <p style={{ color: '#555', fontSize: '0.8rem', lineHeight: 1.6 }}>{w.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ INTERNSHIP CTA ════════════════════════════════════════ */}
        <section className="section" style={{ position: 'relative', overflow: 'hidden' }}>
          <div className="glow-dot" style={{ width: 500, height: 500, background: '#7C6FFF', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', opacity: 0.06 }} />
          <div className="container" style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
              <div>
                <ScrollReveal as="div" style={{ marginBottom: '1.25rem' }}>
                  <div className="badge">🎓 Internship Programs</div>
                </ScrollReveal>
                <ScrollReveal
                  text="Launch Your Tech Career"
                  as="h2"
                  className="section-title"
                  style={{ marginBottom: '1.1rem', color: 'var(--text-main)' }}
                  baseOpacity={0.05}
                  enableBlur
                  stagger={0.07}
                />
                <ScrollReveal as="p" style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '2.25rem', fontSize: '1.025rem' }}>
                  Join our structured paid internship programs. Work on live projects, get certified, and build the portfolio that gets you hired.
                </ScrollReveal>

                {/* Internship Photo Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '2rem', borderRadius: 16, overflow: 'hidden' }}>
                  {[
                    'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&q=80',
                    'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&q=80',
                    'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&q=80',
                    'https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=400&q=80',
                  ].map((url, i) => (
                    <div key={i} style={{ position: 'relative', height: 120, borderRadius: 12, overflow: 'hidden' }}>
                      <Image src={url} alt="Internship program" fill style={{ objectFit: 'cover' }} />
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg,rgba(124,111,255,0.2),rgba(0,0,0,0.15))' }} />
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <Link href="/careers" className="btn-primary">View Programs</Link>
                  <Link href="/register" className="btn-outline">Register Free</Link>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {[
                  { title: '1 Month Internship', price: '₹499', accent: '#7C6FFF', badge: '🔥 Popular', features: ['Real project work', 'Expert mentorship', 'Certificate'] },
                  { title: '2 Month Internship', price: '₹599', accent: '#FF6B9D', badge: '⭐ Best Value', features: ['Capstone project', 'Portfolio review', 'Certificate of Excellence'] },
                ].map(p => (
                  <div key={p.title} className="glass-card" style={{ padding: '1.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderColor: `${p.accent}25` }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.6rem' }}>
                        <h4 style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-main)' }}>{p.title}</h4>
                        <span className="badge" style={{ background: `${p.accent}14`, borderColor: `${p.accent}35`, color: p.accent, fontSize: '0.68rem' }}>{p.badge}</span>
                      </div>
                      {p.features.map(f => (
                        <div key={f} style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <span style={{ color: p.accent, fontWeight: 700 }}>✓</span> {f}
                        </div>
                      ))}
                    </div>
                    <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: '1.5rem' }}>
                      <div style={{ fontSize: '1.75rem', fontWeight: 800, color: p.accent, fontFamily: 'Space Grotesk', letterSpacing: '-0.03em' }}>{p.price}</div>
                      <Link href="/careers" className="btn-primary" style={{ marginTop: '0.6rem', padding: '0.45rem 1.1rem', fontSize: '0.8rem', background: `linear-gradient(135deg, ${p.accent}, ${p.accent}BB)` }}>Apply</Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══ TESTIMONIALS ══════════════════════════════════════════ */}
        <section className="section" style={{ background: 'var(--bg-section)', borderTop: '1px solid var(--border-card)' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
              <ScrollReveal as="div" style={{ marginBottom: '1.25rem' }}>
                <div className="badge">Testimonials</div>
              </ScrollReveal>
              <ScrollReveal
                text="What Our Clients Say"
                as="h2"
                className="section-title"
                style={{ color: 'var(--text-main)' }}
                baseOpacity={0.05}
                enableBlur
                stagger={0.07}
              />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '1.5rem' }}>
              {testimonials.map(t => (
                <div key={t.name} className="glass-card" style={{ padding: '2.25rem' }}>
                  <div style={{ display: 'flex', gap: '0.2rem', marginBottom: '1.25rem' }}>
                    {[...Array(5)].map((_, i) => <span key={i} style={{ color: '#FFB347', fontSize: '1rem' }}>★</span>)}
                  </div>
                  <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '1.75rem', fontStyle: 'italic', fontSize: '0.95rem' }}>"{t.text}"</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
                    <div style={{ width: 48, height: 48, borderRadius: '50%', overflow: 'hidden', flexShrink: 0, border: `2px solid ${t.color}50`, position: 'relative' }}>
                      <Image
                        src={t.img}
                        alt={t.name}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, color: 'var(--text-main)', fontSize: '0.9rem' }}>{t.name}</div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ FINAL CTA (Dark) ══════════════════════════════════════ */}
        <section style={{ position: 'relative', padding: '8rem 0', textAlign: 'center', overflow: 'hidden' }}>
          {/* Background image */}
          <div style={{ position: 'absolute', inset: 0 }}>
            <Image
              src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1600&q=80"
              alt="Modern tech workspace"
              fill
              style={{ objectFit: 'cover', opacity: 0.15 }}
            />
          </div>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, var(--bg-main) 0%, rgba(15,12,30,0.96) 40%, var(--bg-main) 100%)' }} />
          <div className="container" style={{ position: 'relative', zIndex: 2 }}>
            <ScrollReveal
              text="Ready to Transform Your Business?"
              as="h2"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.05, color: 'var(--text-main)', marginBottom: '1.5rem' }}
              baseOpacity={0.05}
              enableBlur
              baseBlur={10}
              stagger={0.06}
              duration={0.85}
            />
            <ScrollReveal as="p" style={{ color: 'var(--text-muted)', fontSize: '1.15rem', marginBottom: '3rem', maxWidth: 500, margin: '0 auto 3rem' }} delay={0.2}>
              Start your journey with DigiPratham today. Register free and get access to all services.
            </ScrollReveal>
            <ScrollReveal as="div" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }} delay={0.4}>
              <Link href="/register" className="btn-primary" style={{ fontSize: '1.05rem', padding: '1rem 2.5rem' }}>Get Started Free</Link>
              <Link href="/contact" className="btn-ghost" style={{ fontSize: '1.05rem', padding: '1rem 2.5rem' }}>Talk to Us</Link>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

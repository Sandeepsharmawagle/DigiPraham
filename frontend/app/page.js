'use client';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Link from 'next/link';

const services = [
  { icon: '🤖', title: 'AI & Machine Learning', desc: 'End-to-end ML pipelines, NLP, Computer Vision, and intelligent automation.', slug: 'ai-ml', color: '#7C6FFF' },
  { icon: '📊', title: 'Data Analytics', desc: 'Transform raw data into business insights with dashboards, ETL, and BI.', slug: 'data-analytics', color: '#FF6B9D' },
  { icon: '🌐', title: 'Web Development', desc: 'Full-stack web apps from landing pages to enterprise SaaS, beautifully crafted.', slug: 'web-development', color: '#43E97B' },
  { icon: '📱', title: 'App Development', desc: 'Cross-platform and native mobile apps for iOS and Android.', slug: 'app-development', color: '#FFB347' },
];

const stats = [
  { value: '50+', label: 'Projects Delivered' },
  { value: '30+', label: 'Happy Clients' },
  { value: '4', label: 'Core Services' },
  { value: '100%', label: 'Client Satisfaction' },
];

const testimonials = [
  { name: 'Rahul Sharma', role: 'CTO, TechStartup', text: 'DigiPratham built our ML pipeline from scratch. Their expertise in AI is unmatched.', avatar: 'R', color: '#7C6FFF' },
  { name: 'Priya Patel', role: 'Founder, DataCo', text: 'The analytics dashboard they delivered transformed how we make business decisions.', avatar: 'P', color: '#FF6B9D' },
  { name: 'Amit Verma', role: 'PM, EcomBrand', text: 'Outstanding web development. Delivered on time, within budget, and beyond our expectations.', avatar: 'A', color: '#43E97B' },
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

          <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
            <div className="badge animate-fade-up" style={{ marginBottom: '2rem' }}>🚀 AI-First Digital Solutions</div>

            <h1 className="display-1 animate-fade-up delay-100" style={{ marginBottom: '1.5rem', color: 'var(--text-main)' }}>
              Build Smarter<br />
              with <span className="gradient-text">DigiPratham</span>
            </h1>

            <p className="animate-fade-up delay-200" style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', color: 'var(--text-muted)', maxWidth: 620, margin: '0 auto 2.5rem', lineHeight: 1.7 }}>
              We deliver AI & ML, Data Analytics, Web Development, and App Development services that drive real, measurable business results.
            </p>

            <div className="animate-fade-up delay-300" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '5rem' }}>
              <Link href="/services" className="btn-primary" style={{ fontSize: '1rem', padding: '0.95rem 2.25rem' }}>Explore Services →</Link>
              <Link href="/careers" className="btn-ghost" style={{ fontSize: '1rem', padding: '0.95rem 2.25rem' }}>Join Internship</Link>
            </div>

            {/* Stats Row */}
            <div className="animate-fade-up delay-400" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '2rem', maxWidth: 700, margin: '0 auto', borderTop: '1px solid var(--border-card)', paddingTop: '3rem' }}>
              {stats.map(s => (
                <div key={s.label} style={{ textAlign: 'center' }}>
                  <div className="stat-number">{s.value}</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.4rem', fontWeight: 500 }}>{s.label}</div>
                </div>
              ))}
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
              <div className="badge" style={{ marginBottom: '1.25rem' }}>What We Do</div>
              <h2 className="section-title" style={{ marginBottom: '1.1rem', color: 'var(--text-main)' }}>Our Core <span className="gradient-text">Services</span></h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.075rem', maxWidth: 520, margin: '0 auto' }}>Cutting-edge technology solutions, tailored for your growth</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: '1.5rem' }}>
              {services.map((svc, i) => (
                <Link key={svc.slug} href={`/services/${svc.slug}`} style={{ textDecoration: 'none' }}>
                  <div className="glass-card" style={{ padding: '2.25rem', height: '100%', position: 'relative', overflow: 'hidden' }}>
                    {/* Subtle accent corner */}
                    <div style={{ position: 'absolute', top: 0, right: 0, width: 80, height: 80, background: `${svc.color}10`, borderBottomLeftRadius: 60, pointerEvents: 'none' }} />
                    <div style={{ width: 58, height: 58, borderRadius: 16, background: `${svc.color}15`, border: `1.5px solid ${svc.color}35`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.75rem', marginBottom: '1.5rem' }}>{svc.icon}</div>
                    <h3 style={{ fontWeight: 700, marginBottom: '0.75rem', fontSize: '1.15rem', color: 'var(--text-main)', letterSpacing: '-0.02em' }}>{svc.title}</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.75, marginBottom: '1.5rem' }}>{svc.desc}</p>
                    <div style={{ color: svc.color, fontSize: '0.875rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.3rem', fontFamily: 'Space Grotesk' }}>Learn more →</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ══ DARK SECTION — Why DigiPratham ═══════════════════════ */}
        <section className="dark-section" style={{ padding: '8rem 0 7rem', marginTop: '2rem' }}>
          <div className="container" style={{ position: 'relative', zIndex: 2 }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <div className="badge" style={{ marginBottom: '1.25rem', background: 'rgba(124,111,255,0.15)', borderColor: 'rgba(124,111,255,0.4)' }}>Why Choose Us</div>
              <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, letterSpacing: '-0.04em', color: '#fff', marginBottom: '1rem' }}>
                Built for <span className="gradient-text">Results</span>
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '1.1rem', maxWidth: 500, margin: '0 auto' }}>
                We combine deep expertise with agile delivery to create real impact for your business.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
              {[
                { icon: '⚡', title: 'Fast Delivery', desc: 'Agile sprints with rapid iterations and constant communication.', grad: '#7C6FFF' },
                { icon: '🔒', title: 'Secure & Scalable', desc: 'Enterprise-grade security and architecture built to grow with you.', grad: '#FF6B9D' },
                { icon: '🎯', title: 'Goal-Oriented', desc: 'Every decision is tied to measurable business outcomes.', grad: '#43E97B' },
                { icon: '🤝', title: '24/7 Support', desc: 'Dedicated support from kickoff through post-launch.', grad: '#FFB347' },
              ].map(w => (
                <div key={w.title} className="dark-card" style={{ padding: '2.25rem' }}>
                  <div style={{ width: 52, height: 52, borderRadius: 14, background: `${w.grad}15`, border: `1.5px solid ${w.grad}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem', marginBottom: '1.25rem' }}>{w.icon}</div>
                  <h4 style={{ fontWeight: 700, color: '#111', marginBottom: '0.6rem', fontSize: '1.05rem' }}>{w.title}</h4>
                  <p style={{ color: '#555', fontSize: '0.9rem', lineHeight: 1.7 }}>{w.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ INTERNSHIP CTA ════════════════════════════════════════ */}
        <section className="section" style={{ position: 'relative', overflow: 'hidden' }}>
          <div className="glow-dot" style={{ width: 500, height: 500, background: '#7C6FFF', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', opacity: 0.06 }} />
          <div className="container" style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
              <div>
                <div className="badge" style={{ marginBottom: '1.25rem' }}>🎓 Internship Programs</div>
                <h2 className="section-title" style={{ marginBottom: '1.1rem', color: 'var(--text-main)' }}>Launch Your <span className="gradient-text">Tech Career</span></h2>
                <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '2.25rem', fontSize: '1.025rem' }}>
                  Join our structured paid internship programs. Work on live projects, get certified, and build the portfolio that gets you hired.
                </p>
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
              <div className="badge" style={{ marginBottom: '1.25rem' }}>Testimonials</div>
              <h2 className="section-title" style={{ color: 'var(--text-main)' }}>What Our <span className="gradient-text">Clients Say</span></h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '1.5rem' }}>
              {testimonials.map(t => (
                <div key={t.name} className="glass-card" style={{ padding: '2.25rem' }}>
                  <div style={{ display: 'flex', gap: '0.2rem', marginBottom: '1.25rem' }}>
                    {[...Array(5)].map((_, i) => <span key={i} style={{ color: '#FFB347', fontSize: '1rem' }}>★</span>)}
                  </div>
                  <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '1.75rem', fontStyle: 'italic', fontSize: '0.95rem' }}>"{t.text}"</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
                    <div style={{ width: 44, height: 44, borderRadius: '50%', background: `linear-gradient(135deg, ${t.color}, ${t.color}88)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#fff', fontSize: '1rem', flexShrink: 0 }}>{t.avatar}</div>
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
        <section className="dark-section" style={{ padding: '8rem 0', textAlign: 'center' }}>
          <div className="container" style={{ position: 'relative', zIndex: 2 }}>
            <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 0.95, color: '#fff', marginBottom: '1.5rem' }}>
              Ready to <span className="gradient-text">Transform</span><br />Your Business?
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '1.15rem', marginBottom: '3rem', maxWidth: 500, margin: '0 auto 3rem' }}>
              Start your journey with DigiPratham today. Register free and get access to all services.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/register" className="btn-primary" style={{ fontSize: '1.05rem', padding: '1rem 2.5rem' }}>Get Started Free</Link>
              <Link href="/contact" className="btn-ghost" style={{ fontSize: '1.05rem', padding: '1rem 2.5rem', borderColor: 'rgba(255,255,255,0.2)', color: '#fff' }}>Talk to Us</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

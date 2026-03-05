'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services' },
    { href: '/careers', label: 'Careers' },
    { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [user, setUser] = useState(null);
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 30);
        window.addEventListener('scroll', onScroll);
        const saved = localStorage.getItem('dp_user');
        if (saved) setUser(JSON.parse(saved));
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const logout = () => {
        localStorage.removeItem('dp_token');
        localStorage.removeItem('dp_user');
        setUser(null);
        window.location.href = '/';
    };

    const isDark = theme === 'dark';

    return (
        <nav style={{
            position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
            background: scrolled ? 'var(--navbar-bg)' : 'transparent',
            backdropFilter: scrolled ? 'blur(20px)' : 'none',
            borderBottom: scrolled ? '1px solid var(--border)' : 'none',
            transition: 'all 0.35s ease',
            padding: '0.875rem 1.5rem',
        }}>
            <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                {/* Logo */}
                <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <img src="https://res.cloudinary.com/dunualrkz/image/upload/v1772440278/Digipratham_xiukmb.png" alt="DigiPratham Logo" style={{ width: 38, height: 38, objectFit: 'contain', borderRadius: 8 }} />
                    <span style={{ fontFamily: 'Space Grotesk', fontWeight: 800, fontSize: '1.2rem', color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
                        Digi<span style={{ color: 'var(--primary)' }}>Pratham</span>
                    </span>
                </Link>

                {/* Desktop nav links */}
                <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }} className="desktop-nav">
                    {navLinks.map(link => (
                        <Link key={link.href} href={link.href} style={{ color: 'var(--text-muted)', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem', fontFamily: 'Space Grotesk', transition: 'color 0.2s', letterSpacing: '-0.01em' }}
                            onMouseOver={e => e.target.style.color = 'var(--text-main)'}
                            onMouseOut={e => e.target.style.color = 'var(--text-muted)'}>
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* Right: theme toggle + auth */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    {/* Theme toggle */}
                    <button
                        onClick={toggleTheme}
                        title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
                        style={{
                            background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(91,82,240,0.1)',
                            border: '1px solid var(--border)',
                            borderRadius: 10,
                            padding: '0.5rem 0.65rem',
                            cursor: 'pointer',
                            fontSize: '1.1rem',
                            lineHeight: 1,
                            transition: 'all 0.25s ease',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'var(--text-main)',
                        }}
                        onMouseOver={e => e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.15)' : 'rgba(91,82,240,0.18)'}
                        onMouseOut={e => e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(91,82,240,0.1)'}
                    >
                        {isDark ? '☀️' : '🌙'}
                    </button>

                    {user ? (
                        <>
                            <Link href="/dashboard" className="btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>Dashboard</Link>
                            <button onClick={logout} className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', background: 'linear-gradient(135deg,#FF6584,#ff8fa3)' }}>Logout</button>
                        </>
                    ) : (
                        <>
                            <Link href="/login" className="btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>Login</Link>
                            <Link href="/register" className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>Register</Link>
                        </>
                    )}

                    {/* Mobile hamburger */}
                    <button onClick={() => setMenuOpen(!menuOpen)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-main)', fontSize: '1.5rem', display: 'none' }}
                        className="mobile-menu-btn">
                        {menuOpen ? '✕' : '☰'}
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            {menuOpen && (
                <div style={{ background: 'var(--navbar-bg)', backdropFilter: 'blur(20px)', borderTop: '1px solid var(--border)', padding: '1.25rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    {navLinks.map(link => (
                        <Link key={link.href} href={link.href} style={{ color: 'var(--text-muted)', textDecoration: 'none', fontWeight: 500, fontSize: '1rem' }} onClick={() => setMenuOpen(false)}>
                            {link.label}
                        </Link>
                    ))}
                    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', paddingTop: '0.5rem', borderTop: '1px solid var(--border)' }}>
                        <button onClick={toggleTheme} style={{ background: 'var(--input-bg)', border: '1px solid var(--border)', borderRadius: 8, padding: '0.5rem 1rem', cursor: 'pointer', color: 'var(--text-main)', fontWeight: 500, fontSize: '0.9rem' }}>
                            {isDark ? '☀️ Light Mode' : '🌙 Dark Mode'}
                        </button>
                    </div>
                </div>
            )}

            <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
        </nav>
    );
}

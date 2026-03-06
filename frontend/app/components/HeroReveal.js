'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * HeroReveal — GSAP timeline entrance animation for hero elements.
 * Wraps children in a container that animates from the bottom on mount.
 *
 * Props:
 *   delay      – seconds delay before this element starts (default 0)
 *   y          – starting Y offset (default 40)
 *   duration   – animation duration (default 0.8)
 *   opacity    – starting opacity (default 0)
 *   blur       – starting blur in px (default 12)
 *   as         – HTML tag (default "div")
 *   className  – class names
 *   style      – inline styles
 */
export default function HeroReveal({
    children,
    delay = 0,
    y = 40,
    duration = 0.8,
    opacity = 0,
    blur = 12,
    as: Tag = 'div',
    className = '',
    style = {},
}) {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        gsap.fromTo(
            el,
            { opacity, y, filter: `blur(${blur}px)` },
            {
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
                duration,
                delay,
                ease: 'power3.out',
            }
        );
    }, [delay, y, duration, opacity, blur]);

    return (
        <Tag ref={ref} className={className} style={{ ...style, willChange: 'transform, opacity' }}>
            {children}
        </Tag>
    );
}

'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * ScrollReveal — ReactBits-inspired word-by-word scroll animation.
 *
 * Props:
 *   text         – string to animate (required if children not passed)
 *   children     – React node (renders as-is, wraps container with trigger)
 *   className    – wrapper class
 *   as           – HTML tag for the wrapper ("p", "h1", "h2", "div", …)
 *   baseOpacity  – starting opacity of each word (0–1, default 0.1)
 *   enableBlur   – enable blur-in effect (default true)
 *   baseBlur     – starting blur in px (default 8)
 *   baseRotation – starting Y-rotation in deg (default 3)
 *   stagger      – seconds between words animating (default 0.035)
 *   duration     – animation duration per word (default 0.7)
 *   delay        – delay before animation starts on enter (default 0)
 *   threshold    – ScrollTrigger start position (default "80% bottom")
 *   style        – inline styles for wrapper
 */
export default function ScrollReveal({
    text,
    children,
    className = '',
    as: Tag = 'div',
    baseOpacity = 0.1,
    enableBlur = true,
    baseBlur = 8,
    baseRotation = 3,
    stagger = 0.035,
    duration = 0.7,
    delay = 0,
    threshold = '80% bottom',
    style = {},
}) {
    const containerRef = useRef(null);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        // If children mode (no text prop), animate the whole container as one unit
        if (!text) {
            gsap.fromTo(
                el,
                {
                    opacity: baseOpacity,
                    y: 28,
                    filter: enableBlur ? `blur(${baseBlur}px)` : 'none',
                    rotateX: baseRotation,
                },
                {
                    opacity: 1,
                    y: 0,
                    filter: 'blur(0px)',
                    rotateX: 0,
                    duration,
                    delay,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: el,
                        start: threshold,
                        toggleActions: 'play none none none',
                    },
                }
            );
            return () => ScrollTrigger.getAll().forEach(t => t.kill());
        }

        // Word-split mode
        const words = el.querySelectorAll('.sr-word');
        gsap.fromTo(
            words,
            {
                opacity: baseOpacity,
                y: 20,
                filter: enableBlur ? `blur(${baseBlur}px)` : 'none',
                rotateX: baseRotation,
            },
            {
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
                rotateX: 0,
                duration,
                stagger,
                delay,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: el,
                    start: threshold,
                    toggleActions: 'play none none none',
                },
            }
        );

        return () => ScrollTrigger.getAll().forEach(t => t.kill());
    }, [text, baseOpacity, enableBlur, baseBlur, baseRotation, stagger, duration, delay, threshold]);

    // Children-only mode (no word splitting)
    if (!text) {
        return (
            <Tag ref={containerRef} className={className} style={style}>
                {children}
            </Tag>
        );
    }

    // Word-split mode: split text by spaces, preserve inline spans
    const words = text.split(' ');

    return (
        <Tag ref={containerRef} className={className} style={{ ...style, perspective: '600px' }}>
            {words.map((word, i) => (
                <span
                    key={i}
                    className="sr-word"
                    style={{
                        display: 'inline-block',
                        whiteSpace: 'pre',
                        willChange: 'transform, opacity, filter',
                    }}
                >
                    {word}{i < words.length - 1 ? ' ' : ''}
                </span>
            ))}
        </Tag>
    );
}

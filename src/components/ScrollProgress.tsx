import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function ScrollProgress() {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        gsap.set(element, { scaleX: 0, transformOrigin: 'left center' });

        const ctx = gsap.context(() => {
            gsap.to(element, {
                scaleX: 1,
                ease: 'none',
                scrollTrigger: {
                    trigger: document.body,
                    start: 'top top',
                    end: 'bottom bottom',
                    scrub: 0.3,
                },
            });
        });

        return () => ctx.revert();
    }, []);

    return (
        <div
            ref={ref}
            className="fixed top-0 left-0 right-0 h-1 z-[100] origin-left"
            style={{
                background: 'linear-gradient(90deg, #00d4ff, #8b5cf6, #00ffff)',
                boxShadow: '0 0 10px #00d4ff, 0 0 20px #8b5cf6',
            }}
        />
    );
}

interface MagneticButtonProps {
    children: React.ReactNode;
    className?: string;
    strength?: number;
    onClick?: () => void;
}

export function MagneticButton({
    children,
    className = '',
    strength = 0.3,
    onClick,
}: MagneticButtonProps) {
    const ref = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        // Disable on mobile
        if (window.innerWidth < 768) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            gsap.to(element, {
                x: x * strength,
                y: y * strength,
                duration: 0.3,
                ease: 'power2.out',
            });
        };

        const handleMouseLeave = () => {
            gsap.to(element, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: 'elastic.out(1, 0.3)',
            });
        };

        element.addEventListener('mousemove', handleMouseMove);
        element.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            element.removeEventListener('mousemove', handleMouseMove);
            element.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [strength]);

    return (
        <button ref={ref} className={className} onClick={onClick}>
            {children}
        </button>
    );
}

interface FloatingElementProps {
    children: React.ReactNode;
    className?: string;
    amplitude?: number;
    duration?: number;
}

export function FloatingElement({
    children,
    className = '',
    amplitude = 10,
    duration = 3,
}: FloatingElementProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;

        gsap.to(element, {
            y: amplitude,
            duration,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
        });
    }, [amplitude, duration]);

    return (
        <div ref={ref} className={className}>
            {children}
        </div>
    );
}

interface GlowingBorderProps {
    children: React.ReactNode;
    className?: string;
}

export function GlowingBorder({ children, className = '' }: GlowingBorderProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;

        gsap.set(element, {
            '--border-angle': '0deg',
        } as any);

        gsap.to(element, {
            '--border-angle': '360deg',
            duration: 3,
            repeat: -1,
            ease: 'none',
        } as any);
    }, []);

    return (
        <div
            ref={ref}
            className={`relative ${className}`}
            style={{
                background: `linear-gradient(var(--tech-dark-bg), var(--tech-dark-bg)) padding-box,
                     conic-gradient(from var(--border-angle, 0deg), #00d4ff, #8b5cf6, #00ffff, #00d4ff) border-box`,
                border: '2px solid transparent',
                borderRadius: '12px',
            } as React.CSSProperties}
        >
            {children}
        </div>
    );
}

export default ScrollProgress;

import { useRef, useEffect, ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
    children: ReactNode;
    direction?: 'up' | 'down' | 'left' | 'right';
    delay?: number;
    duration?: number;
    distance?: number;
    stagger?: number;
    className?: string;
    once?: boolean;
}

export function ScrollReveal({
    children,
    direction = 'up',
    delay = 0,
    duration = 1,
    distance = 60,
    stagger = 0.1,
    className = '',
    once = true,
}: ScrollRevealProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;

        const fromVars: gsap.TweenVars = { opacity: 0 };

        switch (direction) {
            case 'up': fromVars.y = distance; break;
            case 'down': fromVars.y = -distance; break;
            case 'left': fromVars.x = distance; break;
            case 'right': fromVars.x = -distance; break;
        }

        // Check if we should animate children individually
        const targets = element.children.length > 1 && stagger ? element.children : element;

        gsap.set(targets, fromVars);

        const ctx = gsap.context(() => {
            gsap.to(targets, {
                opacity: 1,
                x: 0,
                y: 0,
                duration,
                delay,
                stagger: element.children.length > 1 ? stagger : 0,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: element,
                    start: 'top 85%',
                    toggleActions: once ? 'play none none none' : 'play reverse play reverse',
                },
            });
        });

        return () => ctx.revert();
    }, [direction, delay, duration, distance, stagger, once]);

    return (
        <div ref={ref} className={className}>
            {children}
        </div>
    );
}

interface ScaleRevealProps {
    children: ReactNode;
    delay?: number;
    duration?: number;
    className?: string;
}

export function ScaleReveal({
    children,
    delay = 0,
    duration = 1,
    className = '',
}: ScaleRevealProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;

        gsap.set(element, { scale: 0.8, opacity: 0 });

        const ctx = gsap.context(() => {
            gsap.to(element, {
                scale: 1,
                opacity: 1,
                duration,
                delay,
                ease: 'back.out(1.7)',
                scrollTrigger: {
                    trigger: element,
                    start: 'top 85%',
                    toggleActions: 'play none none none',
                },
            });
        });

        return () => ctx.revert();
    }, [delay, duration]);

    return (
        <div ref={ref} className={className}>
            {children}
        </div>
    );
}

interface ParallaxProps {
    children: ReactNode;
    speed?: number;
    className?: string;
}

export function Parallax({
    children,
    speed = 0.5,
    className = '',
}: ParallaxProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;

        // Disable on mobile
        if (window.innerWidth < 768) return;

        const ctx = gsap.context(() => {
            gsap.to(element, {
                yPercent: -100 * speed,
                ease: 'none',
                scrollTrigger: {
                    trigger: element,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true,
                },
            });
        });

        return () => ctx.revert();
    }, [speed]);

    return (
        <div ref={ref} className={className}>
            {children}
        </div>
    );
}

interface TiltCardProps {
    children: ReactNode;
    className?: string;
    intensity?: number;
}

export function TiltCard({
    children,
    className = '',
    intensity = 10,
}: TiltCardProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        // Disable on mobile
        if (window.innerWidth < 768) return;

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -intensity;
            const rotateY = ((x - centerX) / centerX) * intensity;

            gsap.to(element, {
                rotateX,
                rotateY,
                transformPerspective: 1000,
                duration: 0.3,
                ease: 'power2.out',
            });
        };

        const handleMouseLeave = () => {
            gsap.to(element, {
                rotateX: 0,
                rotateY: 0,
                duration: 0.5,
                ease: 'power2.out',
            });
        };

        element.addEventListener('mousemove', handleMouseMove);
        element.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            element.removeEventListener('mousemove', handleMouseMove);
            element.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [intensity]);

    return (
        <div ref={ref} className={className} style={{ transformStyle: 'preserve-3d' }}>
            {children}
        </div>
    );
}

export default ScrollReveal;

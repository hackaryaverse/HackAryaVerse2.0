import { createContext, useContext, useEffect, useRef, ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

interface AnimationContextType {
    lenis: Lenis | null;
    scrollTo: (target: string | number) => void;
}

const AnimationContext = createContext<AnimationContextType>({
    lenis: null,
    scrollTo: () => { },
});

export const useAnimation = () => useContext(AnimationContext);

interface AnimationProviderProps {
    children: ReactNode;
}

export function AnimationProvider({ children }: AnimationProviderProps) {
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (prefersReducedMotion) {
            return;
        }

        // Initialize Lenis for smooth scrolling
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            smoothWheel: true,
        });

        lenisRef.current = lenis;

        // Connect Lenis to GSAP ScrollTrigger
        lenis.on('scroll', ScrollTrigger.update);

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);

        // Cleanup
        return () => {
            lenis.destroy();
            gsap.ticker.remove(lenis.raf);
        };
    }, []);

    const scrollTo = (target: string | number) => {
        if (lenisRef.current) {
            lenisRef.current.scrollTo(target);
        }
    };

    return (
        <AnimationContext.Provider value={{ lenis: lenisRef.current, scrollTo }}>
            {children}
        </AnimationContext.Provider>
    );
}

export default AnimationProvider;

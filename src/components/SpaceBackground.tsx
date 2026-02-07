import { ReactNode } from 'react';

// Generate random stars
function generateStars(count: number): { x: number; y: number; size: number; delay: number }[] {
    return Array.from({ length: count }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
        delay: Math.random() * 5
    }));
}

// Star Field Component
export function StarField({ starCount = 150 }: { starCount?: number }) {
    const stars = generateStars(starCount);

    return (
        <div className="star-field">
            {stars.map((star, i) => (
                <div
                    key={i}
                    className="star"
                    style={{
                        left: `${star.x}%`,
                        top: `${star.y}%`,
                        width: `${star.size}px`,
                        height: `${star.size}px`,
                        animationDelay: `${star.delay}s`
                    }}
                />
            ))}
        </div>
    );
}

// Nebula Glow Effects Component
export function NebulaGlow() {
    return (
        <>
            <div className="nebula-glow nebula-1" />
            <div className="nebula-glow nebula-2" />
            <div className="nebula-glow nebula-3" />
        </>
    );
}

// Floating Planet Component
interface FloatingPlanetProps {
    size?: number;
    color?: string;
    position?: { top?: string; left?: string; right?: string; bottom?: string };
    orbitDuration?: number;
}

export function FloatingPlanet({
    size = 100,
    color = '#8b5cf6',
    position = { top: '20%', right: '10%' },
    orbitDuration = 8
}: FloatingPlanetProps) {
    return (
        <div
            className="floating-planet fixed pointer-events-none z-0"
            style={{
                ...position,
                width: size,
                height: size,
                background: `radial-gradient(circle at 30% 30%, ${color}dd, ${color}66, ${color}22)`,
                borderRadius: '50%',
                boxShadow: `0 0 60px ${color}40, inset -20px -20px 60px ${color}88`,
                animation: `floatPlanet ${orbitDuration}s ease-in-out infinite`
            }}
        />
    );
}

// Complete Space Background Component
interface SpaceBackgroundProps {
    showStars?: boolean;
    showNebula?: boolean;
    showShootingStars?: boolean;
    showPlanets?: boolean;
    starCount?: number;
    children?: ReactNode;
}

export function SpaceBackground({
    showStars = true,
    showNebula = true,
    showPlanets = true,
    starCount = 150
}: SpaceBackgroundProps) {
    return (
        <>
            {showNebula && <NebulaGlow />}
            {showStars && <StarField starCount={starCount} />}
            {showPlanets && (
                <>
                    <FloatingPlanet
                        size={80}
                        color="#8b5cf6"
                        position={{ top: '15%', right: '5%' }}
                        orbitDuration={10}
                    />
                    <FloatingPlanet
                        size={40}
                        color="#00d4ff"
                        position={{ bottom: '20%', left: '8%' }}
                        orbitDuration={6}
                    />
                </>
            )}
        </>
    );
}

export default SpaceBackground;

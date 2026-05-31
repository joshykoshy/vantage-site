import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Award, Zap, Lightbulb } from 'lucide-react';

const ACHIEVEMENTS = [
    {
        icon: Award,
        title: 'Grant Prize Winner',
        subtitle: 'MBRIF Innovation Pitch',
        image: '/images/achievements/MBRIF Innovation Pitch.png',
        tag: 'Award // 01',
        description:
            'Won the Mohammed Bin Rashid Innovation Fund Pitch competition — a prestigious UAE federal initiative supporting high-impact startups through mentorship, ecosystem access, and grant funding.',
    },
    {
        icon: Award,
        title: 'Incubated Startup',
        subtitle: 'Expo Change Makers Academy',
        image: '/images/achievements/Expo Change Makers Academy.jpg',
        tag: 'Award // 02',
        description:
            'Selected for the Expo City Dubai Foundation Changemakers Academy, receiving up to AED 50,000 in grant funding, dedicated workspace, business licensing support, and mentorship to scale purpose-driven innovation.',
    },
    {
        icon: Lightbulb,
        title: 'Community Built',
        subtitle: 'Expo City Dubai Foundation',
        image: '/images/achievements/Expo City Incubation.png',
        tag: 'Recognition // 03',
        description:
            "Incubated within Dubai's premier ecosystem for social innovation at Expo City, gaining access to an Urban Lab testbed, strategic partnerships, and global visibility.",
    },
    {
        icon: Zap,
        title: 'Featured Presenters',
        subtitle: 'Accessibility Expo 2025',
        image: '/images/achievements/Accessibilities Expo.png',
        tag: 'Recognition // 04',
        description:
            "Presented Vantage at the Accessibility Expo 2025, World Trade Centre Dubai — the region's largest gathering for inclusive design and assistive technology.",
    },
];

/**
 * AchievementsWheel — scroll-driven 3D rotating drum of achievement cards.
 * 4 cards × 90° apart. Adapted from CinematicV01Showcase.
 */
const AchievementsWheel = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });

    // Full rotation over scroll range
    const rotateX = useTransform(
        scrollYProgress,
        [0, 0.05, 0.95, 1],
        [0, 0, -360, -360]
    );

    return (
        <section
            ref={containerRef}
            data-section="achievements-wheel"
            className="relative h-[400vh] bg-vantage-black border-t border-white/[0.04]"
        >
            <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center [perspective:2000px] overflow-hidden">

                {/* Section heading — above the wheel */}
                <div className="absolute top-0 left-0 right-0 z-30 pt-28 flex flex-col items-center text-center px-6 pointer-events-none">
                    <motion.p
                        style={{ opacity: useTransform(scrollYProgress, [0, 0.08], [1, 0]) }}
                        className="text-vantage-electric text-xs font-mono tracking-[0.3em] uppercase mb-3"
                    >
                        Proof of Vision
                    </motion.p>
                    <motion.h2
                        style={{ opacity: useTransform(scrollYProgress, [0, 0.08], [1, 0]) }}
                        className="text-3xl md:text-4xl lg:text-5xl font-bold text-white font-display"
                    >
                        Who Believes in the Vantage Vision?
                    </motion.h2>
                </div>

                {/* Background parallax wordmark */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
                    <motion.h1
                        style={{ y: useTransform(scrollYProgress, [0, 1], [100, -100]) }}
                        className="text-[18vw] font-black text-white whitespace-nowrap uppercase tracking-tighter opacity-[0.025]"
                    >
                        VANTAGE
                    </motion.h1>
                </div>

                {/* Ambient glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vh] h-[70vh] rounded-full blur-[120px] bg-gradient-to-tr from-vantage-electric/10 to-transparent pointer-events-none z-0" />

                {/* The rotating drum */}
                <motion.div
                    style={{ rotateX }}
                    className="relative w-[80vw] md:w-[50vw] max-w-[560px] h-[42vh] z-10 [transform-style:preserve-3d]"
                >
                    {ACHIEVEMENTS.map((item, idx) => {
                        const angle = idx * 90;
                        // translateZ = (h/2) / tan(45°) = h/2
                        // Using 26vh so cards sit in a roomy drum
                        const Icon = item.icon;
                        return (
                            <div
                                key={idx}
                                className="absolute inset-0 w-full h-full bg-vantage-charcoal/90
                                           backdrop-blur-xl border border-white/[0.08] rounded-[2rem]
                                           p-6 md:p-8 flex flex-col items-center justify-between
                                           group pointer-events-auto"
                                style={{
                                    transform: `rotateX(${angle}deg) translateZ(26vh)`,
                                    backfaceVisibility: 'hidden',
                                }}
                            >
                                {/* Inner layout */}
                                <div className="absolute inset-0 rounded-[2rem] overflow-hidden p-6 md:p-8 flex flex-col items-center justify-between">
                                    {/* Hover glow overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-vantage-electric/0 to-vantage-electric/0
                                                    group-hover:from-vantage-electric/5 group-hover:to-transparent
                                                    transition-all duration-700 pointer-events-none" />

                                    {/* Title */}
                                    <h3 className="text-xl md:text-2xl lg:text-3xl font-black text-white
                                                   tracking-tight uppercase text-center relative z-10 leading-none">
                                        {item.title}
                                    </h3>

                                    {/* Achievement image */}
                                    <div className="flex-grow w-full flex items-center justify-center relative z-10 py-2 min-h-0">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="h-full w-auto max-h-[150px] object-contain
                                                       opacity-80 group-hover:opacity-100
                                                       transition-all duration-700 group-hover:scale-105
                                                       drop-shadow-[0_0_30px_rgba(0,212,255,0.1)]"
                                        />
                                    </div>

                                    {/* Footer */}
                                    <div className="w-full flex justify-between items-end relative z-10
                                                    pt-4 border-t border-white/[0.07] shrink-0">
                                        <span className="text-vantage-grey/50 font-mono tracking-[0.1em] text-[10px] uppercase">
                                            {item.tag}
                                        </span>
                                        <span className="text-white font-bold tracking-tight uppercase text-[10px] md:text-xs">
                                            {item.subtitle}
                                        </span>
                                    </div>
                                </div>

                                {/* Hover info popup */}
                                <div className="absolute left-full ml-6 top-1/2 -translate-y-1/2
                                                w-[220px] md:w-[300px] bg-vantage-black/95 backdrop-blur-3xl
                                                border border-white/[0.08] rounded-2xl p-5
                                                opacity-0 translate-x-4
                                                group-hover:opacity-100 group-hover:translate-x-0
                                                transition-all duration-500 pointer-events-none
                                                shadow-[0_0_30px_rgba(0,212,255,0.08)] z-50">
                                    <div className="flex items-center gap-2 mb-3">
                                        <Icon size={12} className="text-vantage-electric" />
                                        <span className="text-vantage-electric font-mono text-[10px] uppercase tracking-widest">
                                            {item.subtitle}
                                        </span>
                                    </div>
                                    <p className="text-vantage-grey/70 text-xs leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </motion.div>

                {/* Progress dots */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2 z-30">
                    {ACHIEVEMENTS.map((_, idx) => {
                        const peak = idx / ACHIEVEMENTS.length;
                        const width = useTransform(
                            scrollYProgress,
                            [peak - 0.15, peak + 0.05, peak + 0.25],
                            ['0.75rem', '3rem', '0.75rem']
                        );
                        const opacity = useTransform(
                            scrollYProgress,
                            [peak - 0.15, peak + 0.05, peak + 0.25],
                            [0.2, 1, 0.2]
                        );
                        return (
                            <motion.div
                                key={idx}
                                style={{ width, opacity }}
                                className="h-1 rounded-full bg-vantage-electric"
                            />
                        );
                    })}
                </div>

                {/* Top/bottom fade masks */}
                <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-vantage-black to-transparent pointer-events-none z-20" />
                <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-vantage-black to-transparent pointer-events-none z-20" />
            </div>
        </section>
    );
};

export default AchievementsWheel;

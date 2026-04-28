import { useRef } from 'react';
import { useScroll, motion } from 'framer-motion';
import ScrollSequenceBackground from '../components/ScrollSequenceBackground';
import V01ComponentShowcase from '../components/V01ComponentShowcase';
import VisionForEveryone from '../components/VisionForEveryone';
import VO1Features from '../components/VO1Features';
import CinematicV01Showcase from '../components/CinematicV01Showcase';
import AchievementsBar from '../components/AchievementsBar';

const VantageVO1 = () => {
    const scrollRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: scrollRef,
        offset: ['start start', 'end end']
    });

    return (
        <div className="bg-[#050505] w-full">
            {/* Top glow */}
            <div className="absolute top-0 left-0 right-0 glow-line z-50 pointer-events-none" />

            {/* ── PART 1: Scroll Animation (300vh) ─────────────────────────────── */}
            {/* The scroll animation plays while user scrolls through this 300vh block.
                The VANTAGE VO1 title is pinned on top of the animation. */}
            <div ref={scrollRef} className="relative h-[300vh] bg-[#050505]">
                {/* Sticky viewport */}
                <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">

                    {/* Frame sequence background */}
                    <div className="absolute inset-0 z-0">
                        <ScrollSequenceBackground progress={scrollYProgress} />
                    </div>

                    {/* Pinned title overlay */}
                    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="text-center px-6"
                        >
                            <span className="text-xs md:text-sm font-mono text-vantage-electric/70 tracking-[0.3em] uppercase mb-6 block">
                                The Ultimate Edge
                            </span>
                            <h2 className="text-5xl md:text-7xl lg:text-[6rem] font-bold text-white mb-6 font-display tracking-tighter uppercase leading-none">
                                Vantage VO1
                            </h2>
                            <p className="text-[#999999] max-w-2xl mx-auto text-lg md:text-xl font-light tracking-wide">
                                Split-Pack Architecture: Separating sensing from compute for weightless autonomy.
                            </p>
                        </motion.div>

                        {/* Scroll cue */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1.5, delay: 1.0 }}
                            className="absolute bottom-12 flex flex-col items-center gap-3"
                        >
                            <span className="text-[10px] text-vantage-grey/50 tracking-[0.25em] uppercase font-mono">Scroll</span>
                            <motion.div
                                animate={{ y: [0, 8, 0] }}
                                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                                className="w-1 h-6 rounded-full bg-vantage-electric/40"
                            />
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* ── PART 2: Component Flywheel (continuous scroll, no gap) ────────── */}
            <CinematicV01Showcase />

            {/* ── PART 3: Achievements Bar (same style as homepage) ─────────────── */}
            <AchievementsBar />

            {/* ── PART 3: Static content ────────────────────────────────────────── */}
            <section className="relative z-20 bg-vantage-black pt-32 pb-24 border-t border-white/[0.03]">
                <div className="container mx-auto px-6">
                    <VO1Features />

                    <div className="mt-32">
                        <VisionForEveryone />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default VantageVO1;

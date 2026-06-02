import { useRef } from 'react';
import { useScroll, motion } from 'framer-motion';
import ScrollSequenceBackground from '../components/ScrollSequenceBackground';
import VisionHaloComponentShowcase from '../components/VisionHaloComponentShowcase';
import VisionForEveryone from '../components/VisionForEveryone';
import VisionHaloFeatures from '../components/VisionHaloFeatures';
// CinematicVisionHaloShowcase saved for later — import CinematicVisionHaloShowcase from '../components/CinematicVisionHaloShowcase';
import AchievementsBar from '../components/AchievementsBar';

const VantageVisionHalo = () => {
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
                The VANTAGE VISION HALO title is pinned on top of the animation. */}
            <div ref={scrollRef} className="relative h-[300vh] bg-[#050505]">
                {/* Sticky viewport — use 100svh so it fills the actual visible area on mobile (excluding browser chrome) */}
                <div className="sticky top-0 left-0 w-full overflow-hidden" style={{ height: '100svh' }}>

                    {/* Frame sequence background */}
                    <div className="absolute inset-0 z-0">
                        <ScrollSequenceBackground progress={scrollYProgress} />
                    </div>

                    {/* Pinned title overlay — centred both axes, full width */}
                    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none px-5">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="text-center w-full max-w-3xl mx-auto"
                        >
                            <span className="text-[10px] sm:text-xs md:text-sm font-mono text-vantage-electric/70 tracking-[0.3em] uppercase mb-4 block">
                                The Ultimate Edge
                            </span>
                            {/* Responsive title: small phones get text-4xl, larger devices scale up */}
                            <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-[6rem] font-bold text-white mb-4 md:mb-6 font-display tracking-tighter uppercase leading-none">
                                Vantage Vision Halo
                            </h2>
                            <p className="text-[#999999] w-full max-w-xs sm:max-w-sm md:max-w-2xl mx-auto text-sm sm:text-base md:text-xl font-light tracking-wide leading-relaxed">
                                Split-Pack Architecture: Separating sensing from compute for weightless autonomy.
                            </p>
                        </motion.div>

                        {/* Scroll cue — pinned to bottom with safe-area inset for home bar on iOS */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1.5, delay: 1.0 }}
                            className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
                            style={{ bottom: 'max(2.5rem, env(safe-area-inset-bottom, 2.5rem))' }}
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

            {/* CinematicVisionHaloShowcase removed — saved in CinematicVisionHaloShowcase.jsx for later */}

            {/* ── PART 3: Static content ────────────────────────────────────────── */}
            <section className="relative z-20 bg-vantage-black pt-32 pb-0 border-t border-white/[0.03]">
                <div className="container mx-auto px-6">
                    <VisionHaloFeatures />
                </div>
            </section>

            {/* ── Achievements Bar — below Vantage Intelligence ─────────────────── */}
            <AchievementsBar />

            <section className="relative z-20 bg-vantage-black pt-24 pb-24">
                <div className="container mx-auto px-6">
                    <div className="mt-0">
                        <VisionForEveryone />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default VantageVisionHalo;

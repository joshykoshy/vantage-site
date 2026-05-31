import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

/* ─────────────────────────────────────────────────────────────────────────────
   MainDashboard — Adapted from Impact's Hero
   Shows "Who are we doing this for?" with stats and the scroll-driven lamp.
───────────────────────────────────────────────────────────────────────────── */
const MainDashboard = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });

    // Lamp cone fades in between 10%–45% scroll progress
    const coneOpacity   = useTransform(scrollYProgress, [0.08, 0.4],  [0, 1]);
    // Beam lines scale up from top between 15%–50%
    const beamScaleY    = useTransform(scrollYProgress, [0.14, 0.48], [0, 1]);
    const beamOpacity   = useTransform(scrollYProgress, [0.1,  0.4],  [0, 1]);
    // Hot-spot orb pops in between 12%–38%
    const hotScale      = useTransform(scrollYProgress, [0.1,  0.35], [0, 1]);
    const hotOpacity    = useTransform(scrollYProgress, [0.08, 0.35], [0, 1]);
    // Ambient fill builds slowly
    const ambientOp     = useTransform(scrollYProgress, [0.3,  0.65], [0, 1]);

    return (
        // 250vh container — content pins at top while lamp plays
        <section
            ref={containerRef}
            className="relative h-[250vh] bg-vantage-black"
        >
            <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
                {/* ── Scroll-driven theater spotlight from top-centre ─────── */}
                <div className="absolute inset-0 pointer-events-none" aria-hidden>
                    {/* Main cone */}
                    <motion.div
                        style={{
                            opacity: coneOpacity,
                            background:
                                'radial-gradient(ellipse 70% 65% at 50% -10%, rgba(0,212,255,0.24) 0%, rgba(0,212,255,0.08) 50%, transparent 76%)',
                            position: 'absolute',
                            inset: 0,
                        }}
                    />

                    {/* Left beam edge */}
                    <motion.div
                        style={{
                            opacity: beamOpacity,
                            scaleY: beamScaleY,
                            position: 'absolute',
                            top: 0,
                            left: '50%',
                            width: '1px',
                            height: '75vh',
                            transformOrigin: 'top center',
                            transform: 'rotate(-30deg)',
                            background: 'linear-gradient(to bottom, rgba(0,212,255,0.6), transparent)',
                        }}
                    />
                    {/* Right beam edge */}
                    <motion.div
                        style={{
                            opacity: beamOpacity,
                            scaleY: beamScaleY,
                            position: 'absolute',
                            top: 0,
                            left: '50%',
                            width: '1px',
                            height: '75vh',
                            transformOrigin: 'top center',
                            transform: 'rotate(30deg)',
                            background: 'linear-gradient(to bottom, rgba(0,212,255,0.6), transparent)',
                        }}
                    />

                    {/* Horizontal bar at lamp apex */}
                    <motion.div
                        style={{
                            opacity: hotOpacity,
                            position: 'absolute',
                            top: 0,
                            left: '50%',
                            transform: 'translateX(-50%)',
                            height: '1px',
                            width: '28rem',
                            background: 'linear-gradient(to right, transparent, rgba(0,212,255,0.9), transparent)',
                        }}
                    />
                    {/* Hot-spot orb at apex */}
                    <motion.div
                        style={{
                            opacity: hotOpacity,
                            scale: hotScale,
                            position: 'absolute',
                            top: 0,
                            left: '50%',
                            transform: 'translateX(-50%) translateY(-50%)',
                            width: '220px',
                            height: '90px',
                            background: 'rgba(0,212,255,0.4)',
                            borderRadius: '50%',
                            filter: 'blur(28px)',
                        }}
                    />
                    {/* Soft ambient fill */}
                    <motion.div
                        style={{
                            opacity: ambientOp,
                            position: 'absolute',
                            top: '12%',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: '620px',
                            height: '360px',
                            background: 'rgba(0,212,255,0.045)',
                            borderRadius: '50%',
                            filter: 'blur(90px)',
                        }}
                    />
                </div>

                {/* ── Content ── */}
                <div className="relative z-10 flex flex-col items-center text-center px-6 pt-28 pb-20">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.15, duration: 0.6 }}
                        className="text-vantage-electric text-xs md:text-sm font-mono tracking-[0.3em] uppercase mb-6"
                    >
                        Real People. Real Change.
                    </motion.p>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="text-white text-4xl sm:text-5xl md:text-7xl lg:text-[5.5rem]
                                   font-bold tracking-tighter leading-[1.05] max-w-4xl font-display"
                    >
                        Who are we doing<br />
                        <span className="text-metallic">this for?</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5, duration: 0.7 }}
                        className="mt-6 text-vantage-grey text-base md:text-xl max-w-2xl leading-relaxed"
                    >
                        For 250 million people with severe visual impairment,
                        that question has never had a good answer.
                        Vantage is changing that.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.7, duration: 0.6 }}
                        className="mt-12 flex flex-wrap gap-y-8 gap-x-0 items-center justify-center"
                    >
                        {[
                            { value: '250M+', label: 'Visually impaired globally' },
                            { value: '$26B',  label: 'Assistive tech market' },
                            { value: '1',     label: 'Device solving it all' },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center">
                                {i > 0 && (
                                    <div className="w-px h-10 bg-white/10 mx-6 md:mx-10 hidden sm:block" />
                                )}
                                <div className="text-center px-4 sm:px-0">
                                    <p className="text-3xl md:text-5xl font-bold text-gradient-cyan font-display">
                                        {item.value}
                                    </p>
                                    <p className="text-vantage-grey text-xs md:text-sm mt-2 max-w-[130px] leading-snug">
                                        {item.label}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </motion.div>

                    {/* Scroll hint */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 1.2, duration: 0.8 }}
                        className="mt-16 flex flex-col items-center gap-2"
                    >
                        <span className="text-vantage-grey/40 text-[10px] tracking-[0.25em] uppercase font-mono">
                            Scroll to ignite
                        </span>
                        <motion.div
                            animate={{ y: [0, 8, 0] }}
                            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                        >
                            <ChevronDown className="w-4 h-4 text-vantage-electric/50" />
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default MainDashboard;

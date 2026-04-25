import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

const Hero = () => {
    const letters = "VANTAGE".split("");

    return (
        <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
            {/* Background layers */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                {/* Subtle gradient overlays so text remains readable without hiding video */}
                <div className="absolute inset-0 bg-gradient-to-b from-vantage-black/30 via-transparent to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-vantage-black/30 via-transparent to-vantage-black/30"></div>

                {/* Animated gradient orb */}
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.15, 0.25, 0.15],
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-radial from-vantage-electric/20 via-cyan-500/5 to-transparent blur-3xl pointer-events-none"
                />

                {/* Secondary orb */}
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.08, 0.15, 0.08],
                        x: [0, 50, 0],
                    }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-gradient-radial from-purple-500/10 via-transparent to-transparent blur-3xl pointer-events-none"
                />

                {/* Floating particles */}
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        animate={{
                            y: [-20, 20, -20],
                            opacity: [0.1, 0.4, 0.1],
                        }}
                        transition={{
                            duration: 4 + i * 0.8,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: i * 0.5,
                        }}
                        className="absolute w-1 h-1 rounded-full bg-vantage-electric/40"
                        style={{
                            left: `${15 + i * 13}%`,
                            top: `${25 + (i % 3) * 20}%`,
                        }}
                    />
                ))}
            </div>

            <div className="relative z-10 container mx-auto px-6 text-center">

                {/* Main Headline — Letter Stagger */}
                <div className="overflow-hidden mb-6">
                    <div className="flex justify-center">
                        {letters.map((letter, idx) => (
                            <motion.span
                                key={idx}
                                initial={{ y: 120, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{
                                    duration: 0.8,
                                    delay: 0.1 + idx * 0.06,
                                    ease: [0.16, 1, 0.3, 1]
                                }}
                                className="text-6xl md:text-8xl lg:text-[9rem] font-bold tracking-[-0.06em] text-white font-display inline-block"
                            >
                                {letter}
                            </motion.span>
                        ))}
                    </div>
                </div>

                {/* Subtitle */}
                <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                    <p className="text-base md:text-lg text-vantage-grey font-light tracking-[0.3em] mb-16 uppercase">
                        Navigate with Instinct
                    </p>
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5, delay: 1.2 }}
                    className="flex flex-col items-center gap-3"
                >
                    <span className="text-[10px] text-vantage-grey/60 tracking-[0.25em] uppercase font-mono">Scroll</span>
                    <div className="relative">
                        {/* Pulse ring */}
                        <motion.div
                            animate={{ scale: [1, 1.8, 1], opacity: [0.3, 0, 0.3] }}
                            transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
                            className="absolute inset-0 w-8 h-8 -translate-x-1.5 -translate-y-1.5 rounded-full border border-vantage-electric/30"
                        />
                        <motion.div
                            animate={{ y: [0, 8, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <ArrowDown className="text-vantage-electric/50" size={18} />
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;

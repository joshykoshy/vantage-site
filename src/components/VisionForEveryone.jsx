import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Sun, Volume2, Waves } from 'lucide-react';

const VisionForEveryone = () => {
    const [activeMode, setActiveMode] = useState('blindness');

    const modes = {
        blindness: {
            title: "Total Blindness",
            icon: EyeOff,
            desc: "For users with no light perception, Vantage translates the world into a 'sixth sense' of touch and sound with real-time object detection.",
            visualClass: "",
            overlay: null
        },
        lowVision: {
            title: "Low Vision / Tunnel",
            icon: Eye,
            desc: "Vantage acts as AR glasses, highlighting hazards in high-contrast colors to make the invisible, visible.",
            visualClass: "scale-110",
            style: {
                maskImage: 'radial-gradient(circle at center, black 30%, transparent 55%)',
                WebkitMaskImage: 'radial-gradient(circle at center, black 30%, transparent 55%)'
            },
            overlay: (
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/40 to-black"></div>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="absolute bottom-0 left-0 w-full h-1/4 bg-gradient-to-t from-green-500/30 to-transparent border-t-4 border-green-500"
                    >
                        <div className="absolute top-2 left-4 bg-green-500 text-black px-3 py-1 rounded-full text-xs font-bold">
                            ✓ SAFE PATH
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.4, type: "spring" }}
                        className="absolute top-[30%] right-[25%] w-32 h-40 border-4 border-red-500 bg-red-500/20 rounded-lg"
                    >
                        <div className="absolute -top-8 left-0 bg-red-500 text-white px-3 py-1 rounded text-xs font-bold">
                            ⚠ OBSTACLE
                        </div>
                    </motion.div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <div className="w-3 h-3 rounded-full bg-white/50 animate-pulse"></div>
                        <div className="absolute inset-0 w-12 h-12 -translate-x-[18px] -translate-y-[18px] border-2 border-white/30 rounded-full"></div>
                    </div>
                </div>
            )
        },
        sensitivity: {
            title: "Light Sensitivity",
            icon: Sun,
            desc: "Vantage clarifies the world, enhancing edges and reading text instantly, reducing glare and improving contrast.",
            visualClass: "",
            overlay: (
                <div className="absolute inset-0">
                    <motion.div
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 0 }}
                        transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse', repeatDelay: 0.5 }}
                        className="absolute inset-0 bg-white/40 backdrop-blur-md z-10"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-yellow-200/50 to-white/30"></div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="absolute inset-0"
                    >
                        <svg className="absolute inset-0 w-full h-full opacity-40 mix-blend-overlay pointer-events-none">
                            <defs>
                                <filter id="edges">
                                    <feConvolveMatrix order="3" kernelMatrix="-1 -1 -1 -1 8 -1 -1 -1 -1" />
                                </filter>
                            </defs>
                        </svg>
                        <div className="absolute top-[20%] left-[15%] bg-black/80 text-white px-3 py-2 rounded-lg border-2 border-vantage-electric/60">
                            <div className="text-xs font-mono text-vantage-electric mb-1">OCR DETECTED</div>
                            <div className="text-sm font-bold">"MAIN STREET"</div>
                        </div>
                        <div className="absolute top-[40%] right-[20%] bg-black/80 text-white px-3 py-2 rounded-lg border-2 border-green-400/60">
                            <div className="text-xs font-mono text-green-400 mb-1">SIGN DETECTED</div>
                            <div className="text-sm font-bold">"STOP"</div>
                        </div>
                    </motion.div>
                    <div className="absolute bottom-4 right-4 bg-black/80 px-4 py-2 rounded-lg border border-white/10">
                        <div className="flex items-center gap-2">
                            <Sun size={16} className="text-yellow-400" />
                            <span className="text-xs font-mono text-white">Glare Reduction: ON</span>
                        </div>
                    </div>
                </div>
            )
        }
    };

    return (
        <section className="py-28 bg-vantage-charcoal relative">
            {/* Top glow line */}
            <div className="absolute top-0 left-0 right-0 glow-line" />

            <div className="container mx-auto px-6">

                <div className="text-center mb-20">
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-xs font-mono text-vantage-electric/60 tracking-widest uppercase mb-4 block"
                    >
                        Adaptive
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-4xl font-bold text-white mb-4 font-display"
                    >
                        Vision for Everyone
                    </motion.h2>
                    <motion.h3
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-vantage-electric/80 font-medium font-display"
                    >
                        One Device. A Spectrum of Sight.
                    </motion.h3>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-vantage-grey/60 mt-4 max-w-2xl mx-auto text-sm"
                    >
                        See how Vantage adapts its feedback loop to support different visual capabilities, from total blindness to light sensitivity.
                    </motion.p>
                </div>

                <div className="grid lg:grid-cols-12 gap-8 items-start">

                    {/* Controls */}
                    <div className="lg:col-span-4 flex flex-col gap-3">
                        {Object.entries(modes).map(([key, mode]) => {
                            const Icon = mode.icon;
                            const isActive = activeMode === key;
                            return (
                                <button
                                    key={key}
                                    onClick={() => setActiveMode(key)}
                                    className={`text-left p-5 rounded-xl border transition-all duration-300 relative overflow-hidden group ${isActive ? 'bg-white/[0.06] border-white/[0.08]' : 'bg-transparent border-white/[0.04] hover:border-white/[0.06]'}`}
                                >
                                    {/* Active indicator */}
                                    {isActive && (
                                        <motion.div
                                            layoutId="vision-indicator"
                                            className="absolute left-0 top-0 bottom-0 w-[2px] bg-vantage-electric"
                                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                        />
                                    )}
                                    <div className="flex items-center gap-4 mb-2 relative z-10">
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-300 ${isActive ? 'bg-vantage-electric/10 border-vantage-electric/30 text-vantage-electric' : 'bg-white/[0.03] border-white/[0.06] text-vantage-grey'}`}>
                                            <Icon size={18} />
                                        </div>
                                        <span className={`font-semibold text-[15px] transition-colors duration-300 ${isActive ? 'text-white' : 'text-vantage-grey group-hover:text-white'}`}>
                                            {mode.title}
                                        </span>
                                    </div>
                                    <p className={`text-sm leading-relaxed ml-14 transition-colors duration-300 ${isActive ? 'text-white/60' : 'text-vantage-grey/40'}`}>
                                        {mode.desc}
                                    </p>
                                </button>
                            );
                        })}
                    </div>

                    {/* Interactive Display */}
                    <div className="lg:col-span-8">
                        <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/[0.06] bg-black shadow-2xl hover:shadow-glow transition-shadow duration-700">
                            {/* Base Image with Transitions */}
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeMode}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="absolute inset-0"
                                >
                                    <div
                                        className={`w-full h-full bg-cover bg-center transition-all duration-700 ${modes[activeMode].visualClass}`}
                                        style={{
                                            backgroundImage: activeMode === 'blindness'
                                                ? "url('/images/street_scene_detection.jpg')"
                                                : "url('/images/street_scene.png')",
                                            ...modes[activeMode].style
                                        }}
                                    ></div>
                                    {modes[activeMode].overlay}
                                </motion.div>
                            </AnimatePresence>

                            {/* Static UI Elements */}
                            <div className="absolute bottom-4 left-6 right-6 flex justify-between items-end pointer-events-none">
                                <div className="text-xs font-mono text-white/30">Simulated View: {modes[activeMode].title}</div>
                                <div className="flex gap-2">
                                    {Object.keys(modes).map((key) => (
                                        <div key={key} className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${activeMode === key ? 'bg-vantage-electric' : 'bg-white/20'}`}></div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default VisionForEveryone;

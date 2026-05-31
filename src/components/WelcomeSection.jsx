import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

/* ─────────────────────────────────────────────────────────────────────────────
   WelcomeSection — The transition into the product
───────────────────────────────────────────────────────────────────────────── */
const WelcomeSection = () => {
    const navigate = useNavigate();

    return (
        <section className="relative w-full min-h-screen bg-[#0A0A0A] flex items-center justify-center py-32 overflow-hidden border-t border-white/[0.04]">
            {/* Ambient glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                <div className="w-[520px] h-[320px] rounded-full bg-radial-gradient from-vantage-electric/10 via-vantage-electric/5 to-transparent blur-[80px]" />
            </div>

            <div className="relative z-10 flex flex-col items-center text-center gap-8 px-6 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col gap-3"
                >
                    <p className="text-xl md:text-3xl font-light font-display text-white/60 tracking-wide">
                        The problem was right under our noses,
                    </p>
                    <p className="text-xl md:text-3xl font-light font-display text-white/90 tracking-wide">
                        so we built a solution above it.
                    </p>
                </motion.div>

                {/* Orange/Cyan divider */}
                <motion.div
                    initial={{ opacity: 0, scaleX: 0 }}
                    whileInView={{ opacity: 1, scaleX: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="w-24 h-px bg-gradient-to-r from-transparent via-vantage-electric/60 to-transparent my-4"
                />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="flex flex-col gap-6 items-center"
                >
                    <h2 className="text-5xl md:text-7xl font-bold font-display text-white tracking-tight">
                        Welcome to Vantage.
                    </h2>
                    <p className="text-sm md:text-base font-light text-vantage-electric tracking-[0.3em] uppercase">
                        Navigate with Instinct.
                    </p>
                </motion.div>

                {/* CTA Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="mt-8"
                >
                    <button
                        onClick={() => navigate('/vantage-vo1')}
                        className="group flex items-center gap-4 px-8 py-4 rounded-full border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/20 transition-all duration-300 backdrop-blur-sm"
                    >
                        <span className="text-sm font-medium text-white/80 group-hover:text-white transition-colors duration-300 tracking-[0.15em] uppercase">
                            Meet the Vantage V01
                        </span>
                        <div className="w-8 h-8 rounded-full border border-vantage-electric/40 group-hover:border-vantage-electric/80 flex items-center justify-center transition-all duration-300">
                            <ArrowRight size={14} className="text-vantage-electric" />
                        </div>
                    </button>
                </motion.div>
            </div>
        </section>
    );
};

export default WelcomeSection;

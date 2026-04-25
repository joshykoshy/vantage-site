import { motion } from 'framer-motion';

const QuoteSection = () => {
    return (
        <section className="py-32 flex items-center justify-center relative overflow-hidden">
            <div className="container mx-auto px-6 text-center relative z-10">
                {/* Decorative line above */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="glow-line w-48 mx-auto mb-12 origin-center"
                />

                <motion.blockquote
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="max-w-3xl mx-auto flex flex-col items-center justify-center p-6 relative"
                >
                    {/* Large decorative quote marks */}
                    <span className="absolute -top-4 -left-2 md:-left-8 text-6xl md:text-8xl text-vantage-electric/10 font-display font-bold select-none leading-none">"</span>
                    <span className="absolute -bottom-8 -right-2 md:-right-8 text-6xl md:text-8xl text-vantage-electric/10 font-display font-bold select-none leading-none">"</span>

                    <p className="text-xl md:text-2xl lg:text-3xl font-light leading-relaxed text-white/80 font-display tracking-wide text-center">
                        AI-powered spatial awareness for the visually impaired. Navigate with instinct, not just vision.
                    </p>
                </motion.blockquote>

                {/* Decorative line below */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="glow-line w-48 mx-auto mt-12 origin-center"
                />
            </div>

            {/* Subtle background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-vantage-electric/[0.03] rounded-full blur-[120px] pointer-events-none"></div>
        </section>
    );
};

export default QuoteSection;

import { motion } from 'framer-motion';
import { ShieldCheck, UserCheck, MessageSquareOff, Flag } from 'lucide-react';

const BenefitCard = ({ icon: Icon, title, desc, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
        className="relative p-8 border border-white/[0.06] bg-vantage-black rounded-2xl group overflow-hidden hover:border-vantage-electric/20 transition-all duration-500"
    >
        {/* Hover gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-vantage-electric/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        <div className="relative z-10">
            <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-vantage-grey mb-6 group-hover:border-vantage-electric/20 group-hover:text-vantage-electric group-hover:shadow-glow-sm transition-all duration-500">
                <Icon size={22} strokeWidth={1.5} />
            </div>
            <h3 className="text-lg font-bold text-white mb-3 font-display">{title}</h3>
            <p className="text-vantage-grey text-sm leading-relaxed">{desc}</p>
        </div>
    </motion.div>
);

const Benefits = () => {
    return (
        <section id="benefits" className="py-28 bg-vantage-black relative">
            {/* Top glow line separator */}
            <div className="absolute top-0 left-0 right-0 glow-line" />

            <div className="container mx-auto px-6">
                <div className="text-center mb-20">
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-xs font-mono text-vantage-electric/60 tracking-widest uppercase mb-4 block"
                    >
                        Impact
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl font-bold text-white mb-4 font-display"
                    >
                        Why Vantage Matters
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-vantage-grey"
                    >
                        Transforming accessibility into autonomy.
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
                    <BenefitCard
                        icon={ShieldCheck}
                        title="Unprecedented Safety"
                        desc="Unlike standard canes, our LiDAR & AI Vision detect head-level obstacles (branches) and 'negative obstacles' like drop-offs, the most dangerous hazards for blind pedestrians."
                        delay={0.1}
                    />
                    <BenefitCard
                        icon={UserCheck}
                        title="True Independence"
                        desc="By providing a reliable, 360-degree environmental model, Vantage reduces reliance on sighted guides, empowering users to commute and socialize on their own terms."
                        delay={0.15}
                    />
                    <BenefitCard
                        icon={MessageSquareOff}
                        title="Cognitive Freedom"
                        desc="Intuitive haptic language offloads navigation from the ears. No constant audio chatter means users can focus on conversations and ambient sounds."
                        delay={0.2}
                    />
                    <BenefitCard
                        icon={Flag}
                        title="National Impact"
                        desc="A direct enabler of the UAE National Policy for Empowering People of Determination, transforming policy goals into tangible, scalable reality."
                        delay={0.25}
                    />
                </div>
            </div>
        </section>
    );
};

export default Benefits;

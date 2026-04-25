import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Cpu, Battery, Activity, Eye, Wifi, AlertCircle } from 'lucide-react';

const FeatureItem = ({ title, desc, icon: Icon }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center text-center p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-vantage-electric/30 transition-all duration-300"
    >
        <div className="w-12 h-12 rounded-xl bg-vantage-silver/10 flex items-center justify-center text-vantage-silver mb-4">
            <Icon size={24} />
        </div>
        <h4 className="text-white font-bold text-lg mb-2">{title}</h4>
        <p className="text-vantage-grey text-sm leading-relaxed">{desc}</p>
    </motion.div>
);

const ProductShowcase = () => {
    const features = [
        {
            title: "Advanced AI Vision",
            desc: "Identifies objects, reads text instantly, and interprets complex scenes in real-time.",
            icon: Eye
        },
        {
            title: "Obstacle Detection",
            desc: "Detects walls, people, and obstacles up to 12 meters away for confident movement.",
            icon: Activity
        },
        {
            title: "Ground Hazard Scan",
            desc: "Scans the floor for drop-offs, curbs, and steps to prevent falls.",
            icon: AlertCircle
        },
        {
            title: "Haptic Guidance",
            desc: "Silent, intuitive vibration cues guide you without blocking your hearing.",
            icon: Layers
        },
        {
            title: "Bone Conduction",
            desc: "Hear the world and your navigation. Privacy-focused audio that keeps ears open.",
            icon: Activity
        },
        {
            title: "Featherweight Design",
            desc: "Designed for all-day wear with medical-grade ergonomics and minimal weight.",
            icon: Layers
        },
        {
            title: "Global Connectivity",
            desc: "Always connected for over-the-air updates and cloud synchronization.",
            icon: Wifi
        },
        {
            title: "All-Day Battery",
            desc: "High-capacity power to support you through a full day of activity.",
            icon: Battery
        }
    ];

    return (
        <section className="min-h-screen bg-vantage-charcoal flex flex-col items-center justify-center py-24 border-b border-white/5">
            <div className="container mx-auto px-6">


                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, idx) => (
                        <FeatureItem key={idx} {...feature} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProductShowcase;

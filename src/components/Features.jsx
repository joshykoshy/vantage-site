import { motion } from 'framer-motion';
import { Camera, Radio, Cpu, Wifi, Eye } from 'lucide-react';

const TechCard = ({ icon: Icon, title, desc, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay }}
        className="relative group rounded-xl p-[1px] bg-white/10 overflow-hidden"
    >
        {/* Electric Border Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-vantage-electric/50 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>

        <div className="relative bg-vantage-charcoal h-full p-6 rounded-xl hover:bg-white/5 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-vantage-electric/10 flex items-center justify-center text-vantage-electric mb-4 group-hover:scale-110 transition-transform">
                <Icon size={20} />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
            <p className="text-sm text-vantage-grey">{desc}</p>
        </div>
    </motion.div>
);

const Features = () => {
    const specs = [
        {
            icon: Camera,
            title: "12.3MP AI Camera",
            desc: "High-resolution scene interpretation and instant OCR text reading."
        },
        {
            icon: Radio,
            title: "TFmini-S LiDAR",
            desc: "Long-range obstacle detection up to 12m for safe navigation."
        },
        {
            icon: Eye,
            title: "Multi-zone ToF",
            desc: "Specifically angled sensors to detect ground-level hazards like curbs."
        },
        {
            icon: Cpu,
            title: "Qualcomm RB5",
            desc: "Enterprise-grade robotics platform for real-time edge AI processing."
        },
        {
            icon: Wifi,
            title: "5G Connectivity",
            desc: "Latency-free cloud updates and emergency SOS triangulation."
        }
    ];

    return (
        <section className="py-24 bg-vantage-navy relative">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div>
                        <span className="text-vantage-electric text-sm font-semibold tracking-wider uppercase mb-2 block">Technology Deep Dive</span>
                        <h2 className="text-3xl md:text-5xl font-bold text-white">Engineered for <br />Reliability</h2>
                    </div>
                    <p className="text-vantage-grey max-w-md text-right">
                        Powered by industry-leading components to ensure safety in every step.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {specs.map((spec, index) => (
                        <TechCard key={index} {...spec} delay={index * 0.1} />
                    ))}

                    {/* Summary Card with Gradient */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="rounded-xl p-[1px] bg-gradient-to-br from-vantage-electric to-vantage-teal"
                    >
                        <div className="h-full bg-vantage-navy/90 backdrop-blur-sm rounded-xl p-6 flex flex-col justify-center text-center">
                            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-vantage-electric to-vantage-teal mb-2">Sensor Fusion</h3>
                            <p className="text-sm text-white/80">
                                Seamlessly merging data from all sources for a complete environmental model.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Features;

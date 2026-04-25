import { motion } from 'framer-motion';
import { Layers, Scan, Activity, Waves } from 'lucide-react';

const BentoCard = ({ children, className, delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay }}
        className={`bg-vantage-charcoal/50 backdrop-blur-sm border border-white/5 rounded-3xl p-8 hover:border-vantage-electric/30 transition-all duration-500 group overflow-hidden relative ${className}`}
    >
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="relative z-10 h-full flex flex-col">{children}</div>
    </motion.div>
);

const Overview = () => {
    return (
        <section className="py-24 bg-vantage-navy relative">
            <div className="container mx-auto px-6">

                <div className="mb-16 md:mb-24 text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">
                        The Digital Sensory <span className="text-vantage-electric">Bubble</span>
                    </h2>
                    <p className="text-vantage-grey text-lg leading-relaxed">
                        Vantage merges advanced robotics hardware with a specialized AI engine to create a complete safety field around you.
                    </p>
                </div>

                {/* Magic Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 auto-rows-[300px] gap-6">

                    {/* Split-Pack Feature - Large Card */}
                    <BentoCard className="md:col-span-6 lg:col-span-8 bg-gradient-to-br from-vantage-charcoal to-black">
                        <div className="flex-1 flex flex-col justify-center">
                            <div className="w-16 h-16 rounded-2xl bg-vantage-electric/20 flex items-center justify-center mb-6 text-vantage-electric">
                                <Layers size={32} />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">Split-Pack Architecture</h3>
                            <p className="text-vantage-grey max-w-md">
                                A featherweight sensor visor for comfort, coupled with a high-performance compute pack for heavy AI processing. All-day wearability meeting medical-grade ergonomics.
                            </p>
                        </div>
                        {/* Decorative schematic graphic */}
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 w-64 h-64 border border-white/10 rounded-full opacity-20"></div>
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 w-48 h-48 border border-white/10 rounded-full opacity-20"></div>
                    </BentoCard>

                    {/* AI Vision - Vertical Card */}
                    <BentoCard className="md:col-span-3 lg:col-span-4" delay={0.1}>
                        <div className="w-12 h-12 rounded-xl bg-vantage-teal/20 flex items-center justify-center mb-4 text-vantage-teal">
                            <Scan size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Computer Vision</h3>
                        <p className="text-sm text-vantage-grey mb-4">
                            Reads menus, identifies street signs, and recognizes faces instantly.
                        </p>
                        <div className="mt-auto h-24 bg-black/50 rounded-lg border border-white/5 relative overflow-hidden">
                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                            <div className="absolute inset-0 flex items-center justify-center text-xs font-mono text-vantage-teal">
                                [OCR: DETECTED]
                            </div>
                        </div>
                    </BentoCard>

                    {/* LiDAR Navigation - Vertical Card */}
                    <BentoCard className="md:col-span-3 lg:col-span-4" delay={0.2}>
                        <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-4 text-purple-400">
                            <Waves size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">LiDAR Mapping</h3>
                        <p className="text-sm text-vantage-grey">
                            12-meter range obstacle detection with specific ground-level sensors for drop-offs.
                        </p>
                        <div className="mt-auto h-32 w-full flex items-end justify-center gap-1">
                            {[40, 70, 45, 90, 60, 30].map((h, i) => (
                                <div key={i} className="w-2 bg-gradient-to-t from-purple-500/50 to-transparent rounded-t-sm animate-pulse" style={{ height: `${h}%`, animationDelay: `${i * 0.1}s` }}></div>
                            ))}
                        </div>
                    </BentoCard>

                    {/* Haptic & Audio - Large Card */}
                    <BentoCard className="md:col-span-6 lg:col-span-8 bg-gradient-to-br from-black to-vantage-charcoal" delay={0.3}>
                        <div className="flex flex-col md:flex-row items-center gap-8 h-full">
                            <div className="flex-1">
                                <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center mb-4 text-orange-400">
                                    <Activity size={24} />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">Intuitive Feedback</h3>
                                <p className="text-vantage-grey">
                                    Receive directional cues through discreet haptic patterns and bone-conduction audio, keeping your ears open to the environment.
                                </p>
                            </div>

                            {/* Visualizer for Haptics */}
                            <div className="flex-1 w-full flex items-center justify-center">
                                <div className="relative w-32 h-32 flex items-center justify-center">
                                    <div className="absolute inset-0 border-2 border-orange-500/30 rounded-full animate-ping"></div>
                                    <div className="w-16 h-16 bg-orange-500/10 rounded-full border border-orange-500/50 flex items-center justify-center backdrop-blur-md">
                                        <span className="text-orange-400 font-bold text-xs">PULSE</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </BentoCard>
                </div>
            </div>
        </section>
    );
};

export default Overview;

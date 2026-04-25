import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TechItem = ({ title, subtitle, desc, image, delay }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`
                relative overflow-hidden cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]
                border-r last:border-r-0 border-white/[0.06]
                flex flex-col
                ${isHovered ? 'flex-[3] bg-white text-black' : 'flex-1 bg-vantage-black text-white hover:bg-white/[0.02]'}
                min-h-[500px]
            `}
        >
            {/* Top accent line on hover */}
            <div className={`absolute top-0 left-0 right-0 h-[2px] transition-all duration-500 ${isHovered ? 'bg-vantage-electric' : 'bg-transparent'}`} />

            {/* Background Image (Visible on Hover) */}
            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0 z-0 pointer-events-none"
                    >
                        <img src={image} alt="" className="absolute inset-0 w-full h-full object-cover opacity-10 filter grayscale brightness-100 mix-blend-multiply" />
                        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent"></div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="relative z-20 p-6 h-full flex flex-col justify-between">

                {/* Header / Subtitle */}
                <div className="flex justify-between items-start">
                    {/* Collapsed Vertical Title */}
                    {!isHovered && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="-rotate-90 whitespace-nowrap">
                                <span className="text-xl md:text-2xl font-bold tracking-widest [word-spacing:0.5rem] text-vantage-grey/50 uppercase font-display">{title}</span>
                            </div>
                        </div>
                    )}

                    <span className={`text-xs font-mono tracking-wider transition-colors duration-300 z-10 ${isHovered ? 'text-vantage-electric' : 'text-vantage-grey/30'}`}>
                        {subtitle}
                    </span>
                </div>

                {/* Expanded Content (Bottom) */}
                <div className="mt-auto relative z-20">
                    <AnimatePresence mode="wait">
                        {isHovered ? (
                            <motion.div
                                key="expanded"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                transition={{ duration: 0.4, delay: 0.1 }}
                            >
                                <h3 className="text-3xl md:text-4xl font-bold mb-4 text-black leading-tight font-display">
                                    {title}
                                </h3>
                                <div className="h-[2px] w-12 bg-vantage-electric mb-6"></div>
                                <p className="text-black/60 text-sm md:text-base leading-relaxed max-w-md mb-8">
                                    {desc}
                                </p>
                                <div className="rounded-xl overflow-hidden shadow-2xl border border-black/5 aspect-video w-full">
                                    <img src={image} alt={title} className="w-full h-full object-cover" />
                                </div>
                            </motion.div>
                        ) : (
                            <div className="h-4"></div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </motion.div>
    );
};

const TechGrid = () => {
    const items = [
        {
            title: "Spatial AI",
            subtitle: "01 // PROCESSING",
            desc: "Real-time environmental semantic segmentation running at 60Hz. Identify surfaces, obstacles, and text instantly.",
            image: "/images/tech_spatial_ai.png"
        },
        {
            title: "Haptic Engine",
            subtitle: "02 // FEEDBACK",
            desc: "High-fidelity vibration motor array providing intuitive directional cues without overwhelming sensory channels.",
            image: "/images/tech_haptic.png"
        },
        {
            title: "Bone Conduction",
            subtitle: "03 // AUDIO",
            desc: "Transmit rich audio descriptions directly to the inner ear, leaving the ear canal open for ambient sound.",
            image: "/images/tech_audio.png"
        },
        {
            title: "LiDAR Mapping",
            subtitle: "04 // SENSING",
            desc: "12-meter range ToF sensor creating a detailed 3D point cloud of the surroundings in any lighting condition.",
            image: "/images/tech_lidar.png"
        },
        {
            title: "Connectivity",
            subtitle: "05 // NETWORK",
            desc: "5G and Wi-Fi 6E enabled for seamless OTA updates and cloud-based object recognition models.",
            image: "/images/tech_connectivity.png"
        },
        {
            title: "Battery Life",
            subtitle: "06 // POWER",
            desc: "High-density solid-state battery providing 12+ hours of continuous continuous inference.",
            image: "/images/tech_battery.png"
        }
    ];

    return (
        <section className="py-32 bg-vantage-black overflow-hidden noise-bg">
            <div className="container mx-auto px-6 relative z-10">
                <div className="mb-12 border-b border-white/[0.06] pb-8 flex justify-between items-end">
                    <div>
                        <span className="text-xs font-mono text-vantage-electric/60 tracking-widest uppercase mb-3 block">Technology</span>
                        <h2 className="text-4xl font-bold text-white font-display">System Architecture</h2>
                    </div>
                    <span className="hidden md:block text-vantage-grey/30 font-mono text-xs tracking-widest">SPECIFICATION V1.0</span>
                </div>

                {/* Desktop Flex Layout (Accordion) */}
                <div className="hidden lg:flex w-full h-[600px] border border-white/[0.06] rounded-2xl overflow-hidden">
                    {items.map((item, idx) => (
                        <TechItem key={idx} {...item} delay={idx * 0.1} />
                    ))}
                </div>

                {/* Mobile/Tablet Grid Layout (Fallback) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:hidden gap-1">
                    {items.map((item, idx) => (
                        <TechItem key={idx} {...item} delay={idx * 0.1} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TechGrid;

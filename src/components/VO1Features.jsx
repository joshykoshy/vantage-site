import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FeatureCard = ({ title, subtitle, desc, image, delay }) => {
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
                        <div className="absolute inset-0 bg-white/95 z-10"></div>
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

const VO1Features = () => {
    const features = [
        {
            title: "Spatial Object Detection",
            subtitle: "01 // VISION",
            desc: "Identifies and tracks multiple objects simultaneously in real-time, categorizing them (e.g., 'car', 'person', 'traffic light') to provide context-aware feedback.",
            image: "/images/feature_object_detection.jpg"
        },
        {
            title: "Text Recognition",
            subtitle: "02 // READING",
            desc: "Instant OCR capability that reads street signs, menus, and documents aloud, converting visual text into clear auditory speech.",
            image: "/images/feature_ocr.jpg"
        },
        {
            title: "Vantage View App",
            subtitle: "03 // CONTROL",
            desc: "A companion app that allows for deep customization of feedback settings, route planning, and 'Find My Device' functionality.",
            image: "/images/feature_app.png"
        },
        {
            title: "AI Powered Navigation",
            subtitle: "04 // MAPPING",
            desc: "Advanced pathfinding algorithms that calculate optimal routes, avoiding obstacles and guiding users with precise turn-by-turn haptic cues.",
            image: "/images/feature_nav.png"
        },
        {
            title: "Depth Perception",
            subtitle: "05 // SENSING",
            desc: "LiDAR-based depth mapping creates a detailed 3D understanding of the environment, detecting drop-offs, stairs, and low-hanging obstacles.",
            image: "/images/feature_depth.png"
        },
        {
            title: "SOS Mode",
            subtitle: "06 // SAFETY",
            desc: "Emergency safety feature that instantly broadcasts live location and camera feed to trusted contacts with a single gesture.",
            image: "/images/tech_connectivity.png"
        }
    ];

    return (
        <section className="py-32 bg-vantage-charcoal overflow-hidden relative noise-bg">
            {/* Top glow line */}
            <div className="absolute top-0 left-0 right-0 glow-line" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="mb-12 border-b border-white/[0.06] pb-8 flex justify-between items-end">
                    <div>
                        <span className="text-xs font-mono text-vantage-electric/60 tracking-widest uppercase mb-3 block">Features</span>
                        <h2 className="text-4xl font-bold text-white font-display">Vantage Intelligence</h2>
                    </div>
                    <span className="hidden md:block text-vantage-grey/30 font-mono text-xs tracking-widest">FEATURE SET V1.0</span>
                </div>

                {/* Desktop Flex Layout (Accordion) */}
                <div className="hidden lg:flex w-full h-[600px] border border-white/[0.06] rounded-2xl overflow-hidden">
                    {features.map((item, idx) => (
                        <FeatureCard key={idx} {...item} delay={idx * 0.1} />
                    ))}
                </div>

                {/* Mobile/Tablet Grid Layout (Fallback) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:hidden gap-1">
                    {features.map((item, idx) => (
                        <FeatureCard key={idx} {...item} delay={idx * 0.1} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default VO1Features;

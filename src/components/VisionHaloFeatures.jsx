import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

// Desktop Feature Card (Hover Accordion)
const FeatureCard = ({ title, subtitle, desc, image, video, delay }) => {
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

            {/* Background Asset (Visible on Hover) */}
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
                        {video ? (
                            <video
                                src={video}
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="absolute inset-0 w-full h-full object-cover opacity-10 filter grayscale brightness-100 mix-blend-multiply"
                            />
                        ) : (
                            <img src={image} alt="" className="absolute inset-0 w-full h-full object-cover opacity-10 filter grayscale brightness-100 mix-blend-multiply" />
                        )}
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

                    <span className={`text-xs font-mono tracking-wider transition-colors duration-300 z-10 ${isHovered ? 'text-vantage-electric font-semibold' : 'text-vantage-grey/30'}`}>
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
                                    {video ? (
                                        <video
                                            src={video}
                                            autoPlay
                                            loop
                                            muted
                                            playsInline
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <img src={image} alt={title} className="w-full h-full object-cover" />
                                    )}
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

// Mobile Feature Card (Scroll triggered, Auto playing, Auto scaling)
const MobileFeatureCard = ({ title, subtitle, desc, image, video, idx }) => {
    const cardRef = useRef(null);
    const videoRef = useRef(null);

    // active when card enters screen center
    const isActive = useInView(cardRef, {
        amount: 0.4,
        margin: "-10% 0px -10% 0px"
    });

    useEffect(() => {
        if (videoRef.current) {
            if (isActive) {
                videoRef.current.play().catch(err => {
                    console.log("Autoplay blocked/interrupted:", err);
                });
            } else {
                videoRef.current.pause();
            }
        }
    }, [isActive]);

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0.4, y: 30 }}
            animate={isActive ? {
                opacity: 1,
                scale: 1.02,
                borderColor: 'rgba(0, 212, 255, 0.4)',
                backgroundColor: 'rgba(20, 20, 20, 0.95)',
                boxShadow: '0 0 30px -5px rgba(0, 212, 255, 0.2)'
            } : {
                opacity: 0.4,
                scale: 0.98,
                borderColor: 'rgba(255, 255, 255, 0.06)',
                backgroundColor: 'rgba(20, 20, 20, 0.4)',
                boxShadow: 'none'
            }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full border rounded-2xl p-6 md:p-8 flex flex-col gap-6 overflow-hidden min-h-[440px] mb-8"
        >
            {/* Cyan accent line when active */}
            <div className={`absolute top-0 left-0 right-0 h-[2px] transition-all duration-500 ${isActive ? 'bg-vantage-electric opacity-100' : 'bg-transparent opacity-0'}`} />

            <div className="flex justify-between items-center relative z-10">
                <span className={`text-xs font-mono tracking-wider transition-colors duration-300 ${isActive ? 'text-vantage-electric font-semibold' : 'text-vantage-grey/40'}`}>
                    {subtitle}
                </span>
                <span className="text-[10px] font-mono text-vantage-grey/30 uppercase tracking-[0.2em]">Vantage Vision Halo</span>
            </div>

            <div className="flex flex-col gap-3 relative z-10">
                <h3 className={`text-2xl md:text-3xl font-bold tracking-tight font-display transition-colors duration-300 ${isActive ? 'text-white' : 'text-vantage-grey'}`}>
                    {title}
                </h3>
                <p className={`text-sm md:text-base leading-relaxed transition-colors duration-300 ${isActive ? 'text-vantage-silver' : 'text-vantage-grey/50'}`}>
                    {desc}
                </p>
            </div>

            <div className={`mt-auto relative rounded-xl overflow-hidden aspect-video w-full border transition-all duration-500 ${isActive ? 'border-white/10 shadow-2xl scale-[1.01]' : 'border-white/5 opacity-85'}`}>
                {video ? (
                    <video
                        ref={videoRef}
                        src={video}
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <img src={image} alt={title} className="w-full h-full object-cover" />
                )}
            </div>
        </motion.div>
    );
};

const VisionHaloFeatures = () => {
    const features = [
        {
            title: "Spatial Obstacle Detection",
            subtitle: "01 // VISION",
            desc: "Identifies and tracks multiple objects simultaneously in real-time, categorizing them (e.g., 'car', 'person', 'traffic light') to provide context-aware feedback.",
            image: "/images/feature_object_detection.jpg",
            video: "/videos/obstacle_detection.mp4"
        },
        {
            title: "Text Recognition",
            subtitle: "02 // READING",
            desc: "Instant OCR capability that reads street signs, menus, and documents aloud, converting visual text into clear auditory speech.",
            image: "/images/feature_ocr.jpg",
            video: "/videos/text_recognition.mp4"
        },
        {
            title: "Vantage View App",
            subtitle: "03 // CONTROL",
            desc: "A companion app that allows for deep customization of feedback settings, route planning, and 'Find My Device' functionality.",
            image: "/images/feature_app.png"
            // Keep image representational since there is no video
        },
        {
            title: "AI Powered Navigation",
            subtitle: "04 // MAPPING",
            desc: "Advanced pathfinding algorithms that calculate optimal routes, avoiding obstacles and guiding users with precise turn-by-turn haptic cues.",
            image: "/images/feature_nav.png",
            video: "/videos/ai_navigation.mp4"
        },
        {
            title: "Depth Perception",
            subtitle: "05 // SENSING",
            desc: "LiDAR-based depth mapping creates a detailed 3D understanding of the environment, detecting drop-offs, stairs, and low-hanging obstacles.",
            image: "/images/feature_depth.png",
            video: "/videos/depth_perception.mp4"
        },
        {
            title: "SOS Mode",
            subtitle: "06 // SAFETY",
            desc: "Emergency safety feature that instantly broadcasts live location and camera feed to trusted contacts with a single gesture.",
            image: "/images/tech_connectivity.png",
            video: "/videos/sos_mode.mp4"
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
                <div className="hidden lg:flex w-full h-[600px] border border-white/[0.06] rounded-2xl overflow-hidden bg-vantage-black">
                    {features.map((item, idx) => (
                        <FeatureCard key={idx} {...item} delay={idx * 0.1} />
                    ))}
                </div>

                {/* Mobile/Tablet Vertical Scroll Stack (Auto play & Auto expand) */}
                <div className="flex flex-col lg:hidden max-w-xl mx-auto py-4">
                    <p className="text-xs font-mono text-vantage-grey/40 text-center mb-8 uppercase tracking-widest">
                        Scroll down to preview features
                    </p>
                    {features.map((item, idx) => (
                        <MobileFeatureCard key={idx} {...item} idx={idx} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default VisionHaloFeatures;

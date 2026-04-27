import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const COMPONENTS = [
    {
        title: "The Central Vision Engine",
        text: "Sight that never sleeps. Equipped with Sony Starvis technology, our central optical sensor doesn't just see the world—it understands it. Engineered for extreme low-light performance, it delivers crisp, real-time spatial context.",
        image: "/images/v01-components/Sony IMX327 AI Camera.png"
    },
    {
        title: "The 360° Shield",
        text: "A continuous bubble of awareness. Four ultra-low-latency ToF sensors map your surroundings in true 360 degrees. They act as an invisible radar, instantly calculating the distance of obstacles—even those approaching from behind.",
        image: "/images/v01-components/TOF Sensor.png"
    },
    {
        title: "The Long-Range Radar",
        text: "Precision up to 12 meters. When the environment gets complex, LiDAR cuts through the noise. Firing invisible pulses of light, this top-mounted sensor provides absolute depth accuracy.",
        image: "/images/v01-components/TF mini Lidar.png"
    },
    {
        title: "The Acoustic Interface",
        text: "Information you feel, sounds you hear. Our bone conduction transducers whisper critical navigation cues directly to your inner ear through your cheekbones, leaving your ear canals completely open to natural environmental sounds.",
        image: "/images/v01-components/Bone Conduction.png"
    },
    {
        title: "The Neural Core",
        text: "Edge AI in an ultra-compact 50×29mm form factor. Powered by the Qualcomm® QRB5165 SoC with 15 AI TOPS, 8GB LPDDR5 RAM, and Wi-Fi 6 connectivity—the Lantronix Open-Q™ 5165RB SOM runs advanced neural networks, computer vision, and object detection entirely on-device.",
        image: "/images/v01-components/Lantronix Open-Q 5165RB.png"
    },
    {
        title: "The Open Halo Chassis",
        text: "Designed to be worn, not hidden. Forged with matte black and brushed dark grey metallic finishes, the frame rests gently on the forehead, maximizing comfort while leaving the user's face completely unobstructed.",
        image: "/images/front-view.png"
    }
];

// Helper to continuously map a single layer to the scroll progress
const ComponentLayer = ({ comp, index, total, scrollYProgress }) => {
    // Math to perfectly space elements across the 0 to 1 scroll distance
    const peak = index / (total - 1);
    const distance = 1 / (total - 1); // Exact distance between peaks

    // The threshold bounds for this specific layer
    const input = [peak - distance, peak, peak + distance];

    // Smoothly fade in and out bounds
    const opacity = useTransform(scrollYProgress, input, [0, 1, 0]);
    
    // Scale image continuously: Starts small (0.6), hits normal (1.0) at peak, then zooms out (1.4) and fades
    const imageScale = useTransform(scrollYProgress, input, [0.6, 1, 1.4]);
    
    // Slight 3D rotation mapping for "pop out" effect
    const imageRotate = useTransform(scrollYProgress, input, [-15, 0, 15]);

    // Parallax text vertical drift
    const textY = useTransform(scrollYProgress, input, [150, 0, -150]);
    const textOpacity = useTransform(scrollYProgress, input, [0, 1, 0]);
    const textScale = useTransform(scrollYProgress, input, [0.9, 1, 0.9]);

    return (
        <motion.div 
            style={{ opacity, pointerEvents: index === total - 1 ? 'auto' : 'none' }} // Only allow interactions statically or ignore
            className="absolute inset-0 container mx-auto px-6 h-full flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 z-10"
        >
            {/* High-Impact Image Area */}
            <div className="w-full md:w-1/2 flex items-center justify-center h-[40%] md:h-full relative [perspective:1000px]">
                <motion.img 
                    src={comp.image}
                    alt={comp.title}
                    style={{ scale: imageScale, rotateY: imageRotate }}
                    className="max-w-full max-h-[85%] object-contain relative z-20 drop-shadow-[0_0_80px_rgba(0,212,255,0.25)]"
                />
                <motion.div 
                    style={{ scale: imageScale, opacity: textOpacity }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 bg-vantage-electric/30 blur-[120px] rounded-full pointer-events-none z-10"
                />
            </div>

            {/* Parallax Hardware Specs Text */}
            <div className="w-full md:w-1/2 h-[60%] md:h-full flex flex-col justify-start md:justify-center relative z-20">
                <motion.div style={{ y: textY, scale: textScale, opacity: textOpacity }}>
                    <span className="text-vantage-electric font-mono tracking-[0.3em] text-xs md:text-sm uppercase block mb-4">
                        Architecture {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3 className="text-4xl md:text-6xl font-display font-bold text-white tracking-tight leading-tight mb-6">
                        {comp.title}
                    </h3>
                    <p className="text-lg md:text-xl text-vantage-grey max-w-lg leading-relaxed font-light">
                        {comp.text}
                    </p>
                </motion.div>
            </div>
        </motion.div>
    );
};

const V01ComponentShowcase = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"] // Tracks when top touches top, until bottom touches bottom
    });

    return (
        <div ref={containerRef} className="relative h-[800vh] bg-vantage-charcoal">
            {/* The pinned UI window */}
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-vantage-black">
                
                {/* Visual Backdrop overlays */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-radial from-vantage-electric/5 via-vantage-black to-vantage-black mix-blend-screen opacity-90" />
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=2074&auto=format&fit=crop')] bg-cover opacity-[0.02] mix-blend-screen grayscale" />
                </div>
                
                {/* Dynamically orchestrated layers locked entirely to precise scroll vectors */}
                {COMPONENTS.map((comp, idx) => (
                    <ComponentLayer 
                        key={idx} 
                        comp={comp} 
                        index={idx} 
                        total={COMPONENTS.length} 
                        scrollYProgress={scrollYProgress} 
                    />
                ))}

                {/* Interactive Dynamic Progress Tab */}
                <div className="absolute bottom-12 lg:bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-2 z-50">
                    {COMPONENTS.map((_, idx) => {
                        const peak = idx / (COMPONENTS.length - 1);
                        const distance = 1 / (COMPONENTS.length - 1);
                        // Animate width continuously based on proximity to this dot's peak
                        const width = useTransform(scrollYProgress, [peak - distance, peak, peak + distance], ["1rem", "4rem", "1rem"]);
                        const bgOpacity = useTransform(scrollYProgress, [peak - distance, peak, peak + distance], [0.2, 1, 0.2]);
                        
                        return (
                            <motion.div 
                                key={idx} 
                                style={{ width, opacity: bgOpacity }}
                                className="h-1.5 rounded-full bg-vantage-electric"
                            />
                        );
                    })}
                </div>

                {/* Aesthetic Top Shadow to blend into navbar seamlessly when sticky */}
                <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-vantage-black via-vantage-black/80 to-transparent pointer-events-none z-50" />
            </div>
        </div>
    );
};

export default V01ComponentShowcase;

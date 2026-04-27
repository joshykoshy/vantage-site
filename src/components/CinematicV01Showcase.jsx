import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const COMPONENTS = [
    {
        title: "Vision Engine",
        subtitle: "Sony Starvis Tech",
        image: "/images/v01-components/Sony IMX327 AI Camera.png",
        text: "Sight that never sleeps. Equipped with Sony Starvis technology, our central optical sensor doesn't just see the world—it understands it. Engineered for extreme low-light performance, it delivers crisp, real-time spatial context."
    },
    {
        title: "360° Shield",
        subtitle: "ToF Array",
        image: "/images/v01-components/TOF Sensor.png",
        text: "A continuous bubble of awareness. Four ultra-low-latency ToF sensors map your surroundings in true 360 degrees. They act as an invisible radar, instantly calculating the distance of obstacles—even those approaching from behind."
    },
    {
        title: "Range Radar",
        subtitle: "12m LiDAR",
        image: "/images/v01-components/TF mini Lidar.png",
        text: "Precision up to 12 meters. When the environment gets complex, LiDAR cuts through the noise. Firing invisible pulses of light, this top-mounted sensor provides absolute depth accuracy."
    },
    {
        title: "Acoustic UI",
        subtitle: "Bone Conduction",
        image: "/images/v01-components/Bone Conduction.png",
        text: "Information you feel, sounds you hear. Our bone conduction transducers whisper critical navigation cues directly to your inner ear through your cheekbones, leaving your ear canals completely open."
    },
    {
        title: "Neural Core",
        subtitle: "Lantronix Open-Q™ 5165RB",
        image: "/images/v01-components/Lantronix Open-Q 5165RB.png",
        text: "Edge AI in an ultra-compact 50×29mm form factor. Powered by the Qualcomm® QRB5165 SoC with 15 AI TOPS, 8GB LPDDR5 RAM, and Wi-Fi 6 connectivity—the Lantronix Open-Q™ 5165RB SOM runs advanced neural networks, computer vision, and object detection entirely on-device."
    },
    {
        title: "Halo Chassis",
        subtitle: "Matte Black Frame",
        image: "/images/front-view.png",
        text: "Designed to be worn, not hidden. Forged with matte black and brushed dark grey metallic finishes, the frame rests gently on the forehead, maximizing comfort while leaving the user's face completely unobstructed."
    }
];

const CinematicV01Showcase = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const rotateX = useTransform(
        scrollYProgress, 
        [0, 0.05, 0.95, 1], 
        [0, 0, -300, -300]
    );

    return (
        <section ref={containerRef} className="relative h-[500vh] bg-[#050505] border-t border-b border-white/10">
            <div className="sticky top-0 h-screen w-full flex items-center justify-center [perspective:2000px] overflow-hidden">
                
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
                    <motion.h1 
                        style={{ y: useTransform(scrollYProgress, [0, 1], [200, -200]) }}
                        className="text-[18vw] font-black text-white whitespace-nowrap uppercase tracking-tighter opacity-[0.03] mix-blend-overlay"
                    >
                        VANTAGE
                    </motion.h1>
                </div>
                
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vh] h-[80vh] rounded-full blur-[150px] bg-gradient-to-tr from-[#06B6D4]/15 to-[#EC4899]/15 pointer-events-none z-0" />

                <motion.div 
                    style={{ rotateX }}
                    className="relative w-[70vw] md:w-[45vw] max-w-[600px] h-[45vh] z-10 [transform-style:preserve-3d]"
                >
                    {COMPONENTS.map((comp, idx) => {
                        const angle = idx * 60; 
                        
                        return (
                            <div 
                                key={idx}
                                className="absolute inset-0 w-full h-full bg-[#111111]/80 backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 md:p-8 flex flex-col items-center justify-between group pointer-events-auto"
                                style={{
                                    // Math: TranslateZ = height(45vh) / 2 / tan(30deg)(0.577) = 39vh
                                    transform: `rotateX(${angle}deg) translateZ(39vh)`,
                                    backfaceVisibility: 'hidden'
                                }}
                            >
                                <div className="absolute inset-0 rounded-[2rem] overflow-hidden p-6 md:p-8 flex flex-col items-center justify-between">
                                    <div className="absolute inset-0 bg-gradient-to-r from-[#06B6D4]/0 to-[#EC4899]/0 group-hover:from-[#06B6D4]/5 group-hover:to-[#EC4899]/5 transition-all duration-700 pointer-events-none" />
                                    
                                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-white tracking-[0.05em] uppercase relative z-10 text-center leading-none">
                                        {comp.title}
                                    </h2>
                                    
                                    <div className="flex-grow w-full flex items-center justify-center relative z-10 py-2 min-h-0">
                                        <img 
                                            src={comp.image} 
                                            alt={comp.title} 
                                            className="h-full w-auto max-h-[180px] object-contain grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105 drop-shadow-[0_0_40px_rgba(255,255,255,0.05)]"
                                        />
                                    </div>
                                    
                                    <div className="w-full flex justify-between items-end relative z-10 pt-4 border-t border-white/[0.08] shrink-0">
                                        <span className="text-[#999999] font-mono tracking-[0.1em] text-[10px] uppercase">Spec // {String(idx + 1).padStart(2, '0')}</span>
                                        <span className="text-white font-black tracking-[0.1em] uppercase text-[10px] md:text-xs">{comp.subtitle}</span>
                                    </div>
                                </div>

                                {/* Info Popup Box on hover - Outside the overflow-hidden wrapper! */}
                                <div className="absolute left-full ml-4 md:ml-8 top-1/2 -translate-y-1/2 w-[240px] md:w-[320px] bg-[#111111]/95 backdrop-blur-3xl border border-white/10 rounded-2xl p-5 md:p-6 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 pointer-events-none drop-shadow-[0_0_30px_rgba(6,182,212,0.1)] z-50">
                                    <h4 className="text-[#06B6D4] font-mono text-xs uppercase tracking-widest mb-3">Specification Detail</h4>
                                    <p className="text-[#999999] text-xs md:text-sm font-light leading-relaxed">
                                        {comp.text}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </motion.div>
                
                <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[#050505] to-transparent pointer-events-none z-20" />
                <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none z-20" />
            </div>
        </section>
    );
};

export default CinematicV01Showcase;

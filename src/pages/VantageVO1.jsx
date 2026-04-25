import { motion } from 'framer-motion';
import VisionForEveryone from '../components/VisionForEveryone';
import VO1Features from '../components/VO1Features';
import CinematicV01Showcase from '../components/CinematicV01Showcase';

const VantageVO1 = () => {
    return (
        <div className="bg-[#050505] w-full">
            {/* Top glow */}
            <div className="absolute top-0 left-0 right-0 glow-line z-50 pointer-events-none" />

            {/* Title Intro Header */}
            <section className="min-h-[80vh] flex flex-col items-center justify-center pt-48 pb-24 noise-bg relative z-10 w-full bg-[#050505]">
                <div className="container mx-auto px-6 relative">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="text-center"
                    >
                        <span className="text-xs md:text-sm font-mono text-vantage-electric/70 tracking-[0.3em] uppercase mb-6 block">The Ultimate Edge</span>
                        <h2 className="text-5xl md:text-7xl lg:text-[6rem] font-bold text-white mb-6 font-display tracking-tighter uppercase leading-none">Vantage VO1</h2>
                        <p className="text-[#999999] max-w-2xl mx-auto text-lg md:text-xl font-light tracking-wide">
                            Split-Pack Architecture: Separating sensing from compute for weightless autonomy.
                        </p>
                    </motion.div>
                </div>
                
                {/* Smooth blend explicitly pushing to the hardware showcase */}
                <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent"></div>
            </section>

            {/* Cinematic 3D Prism Sequence (300vh scroll) */}
            <CinematicV01Showcase />

            {/* Static Content Resumes Below */}
            <section className="relative z-20 bg-vantage-black pt-32 pb-24 border-t border-white/[0.03]">
                <div className="container mx-auto px-6">
                    <VO1Features />
                    
                    <div className="mt-32">
                        <VisionForEveryone />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default VantageVO1;

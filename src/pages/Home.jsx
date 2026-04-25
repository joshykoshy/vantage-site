import { useRef } from 'react';
import { useScroll } from 'framer-motion';
import Hero from '../components/Hero';
import QuoteSection from '../components/QuoteSection';
import TechGrid from '../components/TechGrid';
import Benefits from '../components/Benefits';
import Partnerships from '../components/Partnerships';
import ScrollSequenceBackground from '../components/ScrollSequenceBackground';

const Home = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    return (
        <div className="bg-vantage-black">
            {/* 300vh scroll track - keeps the content pinned for an extended scroll duration */}
            <div ref={containerRef} className="relative h-[300vh] bg-vantage-black">
                {/* Sticky container stays pinned to viewport */}
                <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">
                    
                    {/* Background video sequence */}
                    <div className="absolute inset-0 z-0">
                        <ScrollSequenceBackground progress={scrollYProgress} />
                    </div>
                    
                    {/* Hero text pinned on top */}
                    <div className="relative z-10 w-full h-full pointer-events-none flex flex-col">
                        <div id="home" className="pointer-events-auto h-screen w-full">
                            <Hero />
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Normal flow resumes here with the quote section and the rest of the site */}
            <div className="relative z-20 bg-vantage-black pt-10">
                <QuoteSection />
            </div>
            
            {/* Normal rest of page */}
            <div id="tech" className="relative z-20 bg-vantage-black">
                <TechGrid />
                <Benefits />
            </div>
            <div id="partners" className="relative z-20 bg-vantage-black border-t border-white/[0.06]">
                <Partnerships />
            </div>
        </div>
    );
};

export default Home;

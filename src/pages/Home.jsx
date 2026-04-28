import Hero from '../components/Hero';
import QuoteSection from '../components/QuoteSection';
import Benefits from '../components/Benefits';
import Partnerships from '../components/Partnerships';

const Home = () => {
    return (
        <div className="bg-vantage-black">
            {/* Hero — plain black screen with VANTAGE text, normal scroll */}
            <div id="home">
                <Hero />
            </div>

            {/* Normal flow — quote then rest of page */}
            <div className="relative z-20 bg-vantage-black">
                <QuoteSection />
            </div>

            <div className="relative z-20 bg-vantage-black">
                <Benefits />
            </div>

            <div id="partners" className="relative z-20 bg-vantage-black border-t border-white/[0.06]">
                <Partnerships />
            </div>
        </div>
    );
};

export default Home;

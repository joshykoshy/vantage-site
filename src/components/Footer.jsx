import { Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-vantage-black py-20 relative">
            {/* Top gradient border */}
            <div className="absolute top-0 left-0 right-0 glow-line" />

            <div className="container mx-auto px-6">

                {/* Contact Section */}
                <div className="grid md:grid-cols-3 gap-12 mb-16">

                    {/* Contact 1 - Joshua */}
                    <div className="space-y-2">
                        <h3 className="text-white font-semibold text-lg font-display">Joshua Koshy</h3>
                        <p className="text-vantage-electric/60 text-xs font-mono tracking-wider uppercase">Co-Founder</p>
                        <a href="tel:+971509970129" className="flex items-center gap-3 text-vantage-grey hover:text-white transition-colors group mt-3 inline-flex">
                            <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center group-hover:border-vantage-electric/20 transition-all duration-300">
                                <Phone size={14} className="text-vantage-grey group-hover:text-vantage-electric transition-colors duration-300" />
                            </div>
                            <span className="font-mono text-sm">+971 50 997 0129</span>
                        </a>
                    </div>

                    {/* Contact 2 - Dev */}
                    <div className="space-y-2">
                        <h3 className="text-white font-semibold text-lg font-display">Dev Bhodia</h3>
                        <p className="text-vantage-electric/60 text-xs font-mono tracking-wider uppercase">Founder</p>
                        <a href="tel:+971557857806" className="flex items-center gap-3 text-vantage-grey hover:text-white transition-colors group mt-3 inline-flex">
                            <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center group-hover:border-vantage-electric/20 transition-all duration-300">
                                <Phone size={14} className="text-vantage-grey group-hover:text-vantage-electric transition-colors duration-300" />
                            </div>
                            <span className="font-mono text-sm">+971-55 785 7806</span>
                        </a>
                    </div>

                    {/* Address */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center">
                                <MapPin size={14} className="text-vantage-grey" />
                            </div>
                            <h3 className="text-white font-semibold text-lg font-display">Location</h3>
                        </div>
                        <address className="not-italic text-vantage-grey/60 text-sm leading-relaxed ml-11">
                            <div className="font-semibold text-white/80 mb-1">University of Wollongong Dubai</div>
                            <div>Knowledge Park</div>
                            <div>Dubai, UAE</div>
                        </address>
                    </div>
                </div>

                {/* Divider */}
                <div className="glow-line mb-10"></div>

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-vantage-grey/40 font-mono text-xs">
                    <div className="flex items-center gap-6">
                        <span className="text-metallic font-bold tracking-[-0.03em] text-lg font-display">VANTAGE</span>
                        <span>© 2025</span>
                    </div>

                    <div className="flex gap-8 uppercase tracking-wider">
                        <a href="#" className="hover:text-white transition-colors duration-300 relative group">
                            Privacy
                            <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-vantage-electric group-hover:w-full transition-all duration-300" />
                        </a>
                        <a href="mailto:devbhodia17@gmail.com" className="hover:text-white transition-colors duration-300 relative group">
                            Contact
                            <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-vantage-electric group-hover:w-full transition-all duration-300" />
                        </a>
                        <a href="#" className="text-vantage-electric/60 border border-vantage-electric/20 px-3 py-1 rounded-full hover:bg-vantage-electric/10 hover:text-vantage-electric transition-all duration-300">
                            Accessibility
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

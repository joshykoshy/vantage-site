import { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id) => {
        setIsOpen(false);
        if (location.pathname !== '/') {
            return;
        }
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const navLinks = [
        { name: 'Vantage VO1', path: '/vantage-vo1' },
        { name: 'Narrator', path: '/narrator' },
        { name: 'Narrator Pro', path: '/narrator-pro' },
        { name: 'Manifesto', path: '/manifesto' },
    ];

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'glass-dark py-3' : 'bg-transparent py-6'}`}>
            {/* Subtle glow line at top when scrolled */}
            {scrolled && (
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-vantage-electric/20 to-transparent" />
            )}

            <div className="container mx-auto px-6 flex items-center justify-between">

                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 cursor-pointer group" onClick={() => window.scrollTo(0, 0)}>
                    <span className="text-2xl font-bold tracking-[-0.05em] text-white group-hover:text-metallic transition-all duration-300 font-display">VANTAGE</span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-10">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={`relative text-sm font-medium tracking-wide transition-colors duration-300 ${location.pathname === link.path ? 'text-white' : 'text-vantage-grey hover:text-white'}`}
                        >
                            {link.name}
                            {location.pathname === link.path && (
                                <motion.div
                                    layoutId="nav-underline"
                                    className="absolute -bottom-1 left-0 right-0 h-px bg-vantage-electric"
                                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                />
                            )}
                        </Link>
                    ))}
                </div>

                {/* CTA */}
                <div className="hidden md:block">
                    <Link to="/contact" className="relative flex items-center gap-2 px-6 py-2.5 rounded-full border border-white/10 bg-white/[0.03] hover:border-vantage-electric/40 hover:shadow-glow-sm transition-all duration-500 text-sm font-medium group overflow-hidden">
                        <span className="relative z-10">Get in Touch</span>
                        <ArrowRight size={15} className="relative z-10 group-hover:translate-x-0.5 transition-transform duration-300" />
                    </Link>
                </div>

                {/* Mobile Menu Toggle */}
                <button className="md:hidden text-white relative z-50" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu — Full Screen Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 bg-vantage-black/95 backdrop-blur-2xl z-40 md:hidden"
                    >
                        {/* Decorative glow */}
                        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-vantage-electric/5 rounded-full blur-[120px] pointer-events-none" />

                        <div className="flex flex-col items-center justify-center h-full gap-8">
                            {navLinks.map((link, idx) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ delay: idx * 0.1, duration: 0.4 }}
                                >
                                    <Link
                                        to={link.path}
                                        onClick={() => setIsOpen(false)}
                                        className="text-3xl font-bold text-white hover:text-vantage-electric transition-colors font-display"
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ delay: 0.2, duration: 0.4 }}
                            >
                                <Link
                                    to="/contact"
                                    onClick={() => setIsOpen(false)}
                                    className="mt-4 px-8 py-3 rounded-full border border-vantage-electric/30 text-vantage-electric text-lg font-medium hover:bg-vantage-electric/10 transition-colors"
                                >
                                    Get in Touch
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;

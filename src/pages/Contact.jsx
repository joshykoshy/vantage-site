import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Send, User, Building, MessageSquare } from 'lucide-react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        organization: '',
        phone: '',
        message: ''
    });

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
    };

    const inputClasses = "w-full bg-vantage-black/50 border border-white/[0.06] rounded-xl pl-12 pr-4 py-3.5 text-white placeholder-vantage-grey/40 focus:outline-none focus:border-vantage-electric/30 focus:shadow-glow-sm transition-all duration-300 text-sm";

    return (
        <section className="min-h-screen bg-vantage-black pt-32 pb-24 noise-bg relative">
            {/* Ambient glow */}
            <div className="absolute top-40 left-1/4 w-[400px] h-[400px] bg-vantage-electric/[0.02] rounded-full blur-[150px] pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20"
                >
                    <span className="text-xs font-mono text-vantage-electric/60 tracking-widest uppercase mb-4 block">Reach Out</span>
                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-5 font-display tracking-tight">Get in Touch</h1>
                    <p className="text-vantage-grey text-base max-w-xl mx-auto">
                        Have questions about Vantage? We'd love to hear from you.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-10 max-w-6xl mx-auto">

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="bg-vantage-charcoal/50 border border-white/[0.06] rounded-2xl p-8 backdrop-blur-sm"
                    >
                        <h2 className="text-xl font-bold text-white mb-8 font-display">Send us a Message</h2>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Name */}
                            <div>
                                <label htmlFor="name" className="block text-xs font-medium text-vantage-grey/60 mb-2 tracking-wider uppercase font-mono">
                                    Full Name *
                                </label>
                                <div className="relative">
                                    <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-vantage-grey/40" />
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        className={inputClasses}
                                        placeholder="John Doe"
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div>
                                <label htmlFor="email" className="block text-xs font-medium text-vantage-grey/60 mb-2 tracking-wider uppercase font-mono">
                                    Email Address *
                                </label>
                                <div className="relative">
                                    <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-vantage-grey/40" />
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={inputClasses}
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>

                            {/* Organization */}
                            <div>
                                <label htmlFor="organization" className="block text-xs font-medium text-vantage-grey/60 mb-2 tracking-wider uppercase font-mono">
                                    Organization
                                </label>
                                <div className="relative">
                                    <Building size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-vantage-grey/40" />
                                    <input
                                        type="text"
                                        id="organization"
                                        name="organization"
                                        value={formData.organization}
                                        onChange={handleChange}
                                        className={inputClasses}
                                        placeholder="Your Company"
                                    />
                                </div>
                            </div>

                            {/* Phone */}
                            <div>
                                <label htmlFor="phone" className="block text-xs font-medium text-vantage-grey/60 mb-2 tracking-wider uppercase font-mono">
                                    Phone Number
                                </label>
                                <div className="relative">
                                    <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-vantage-grey/40" />
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className={inputClasses}
                                        placeholder="+971 XX XXX XXXX"
                                    />
                                </div>
                            </div>

                            {/* Message */}
                            <div>
                                <label htmlFor="message" className="block text-xs font-medium text-vantage-grey/60 mb-2 tracking-wider uppercase font-mono">
                                    Message *
                                </label>
                                <div className="relative">
                                    <MessageSquare size={16} className="absolute left-4 top-4 text-vantage-grey/40" />
                                    <textarea
                                        id="message"
                                        name="message"
                                        required
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows="5"
                                        className={`${inputClasses} resize-none`}
                                        placeholder="Tell us about your inquiry..."
                                    />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="relative w-full bg-gradient-to-r from-vantage-electric to-cyan-400 text-black font-bold py-3.5 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group overflow-hidden hover:shadow-glow"
                            >
                                {/* Shimmer effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                                <span className="relative z-10 text-sm">Send Message</span>
                                <Send size={16} className="relative z-10 group-hover:translate-x-0.5 transition-transform" />
                            </button>

                            {/* Success Message */}
                            {submitted && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-vantage-electric/10 border border-vantage-electric/20 text-vantage-electric px-4 py-3 rounded-xl text-sm text-center"
                                >
                                    ✓ Message sent successfully! We'll get back to you soon.
                                </motion.div>
                            )}
                        </form>
                    </motion.div>

                    {/* Contact Information */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="space-y-6"
                    >
                        <div>
                            <h2 className="text-xl font-bold text-white mb-3 font-display">Contact Information</h2>
                            <p className="text-vantage-grey/60 mb-8 text-sm">
                                Reach out to our team directly or fill out the form and we'll respond as soon as possible.
                            </p>
                        </div>

                        {/* Joshua Koshy */}
                        <div className="bg-vantage-charcoal/50 border border-white/[0.06] rounded-xl p-6 hover:border-vantage-electric/15 transition-all duration-500 group">
                            <h3 className="text-white font-semibold text-lg mb-1 font-display">Joshua Koshy</h3>
                            <p className="text-vantage-electric/50 text-xs font-mono tracking-wider uppercase mb-4">Co-Founder</p>
                            <div className="space-y-3">
                                <a href="tel:+971509970129" className="flex items-center gap-3 text-vantage-grey hover:text-white transition-colors">
                                    <div className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center group-hover:border-vantage-electric/20 transition-all duration-300">
                                        <Phone size={15} className="text-vantage-grey group-hover:text-vantage-electric transition-colors duration-300" />
                                    </div>
                                    <span className="font-mono text-sm">+971 50 997 0129</span>
                                </a>
                            </div>
                        </div>

                        {/* Dev Bhodia */}
                        <div className="bg-vantage-charcoal/50 border border-white/[0.06] rounded-xl p-6 hover:border-vantage-electric/15 transition-all duration-500 group">
                            <h3 className="text-white font-semibold text-lg mb-1 font-display">Dev Bhodia</h3>
                            <p className="text-vantage-electric/50 text-xs font-mono tracking-wider uppercase mb-4">Founder</p>
                            <div className="space-y-3">
                                <a href="tel:+971557857806" className="flex items-center gap-3 text-vantage-grey hover:text-white transition-colors">
                                    <div className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center group-hover:border-vantage-electric/20 transition-all duration-300">
                                        <Phone size={15} className="text-vantage-grey group-hover:text-vantage-electric transition-colors duration-300" />
                                    </div>
                                    <span className="font-mono text-sm">+971 55 785 7806</span>
                                </a>
                            </div>
                        </div>

                        {/* Location */}
                        <div className="bg-vantage-charcoal/50 border border-white/[0.06] rounded-xl p-6">
                            <div className="flex items-start gap-3 mb-4">
                                <div className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center shrink-0">
                                    <MapPin size={15} className="text-vantage-grey" />
                                </div>
                                <div>
                                    <h3 className="text-white font-semibold text-lg mb-2 font-display">Location</h3>
                                    <address className="not-italic text-vantage-grey/60 text-sm leading-relaxed">
                                        <div className="font-semibold text-white/70 mb-1">University of Wollongong Dubai</div>
                                        <div>Knowledge Park</div>
                                        <div>Dubai, UAE</div>
                                    </address>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;

import { motion } from 'framer-motion';

const Partners = () => {
    return (
        <section className="py-20 bg-vantage-charcoal border-t border-white/5">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-2xl font-bold text-white mb-4">Strategic Collaboration & Incubation</h2>
                    <p className="text-vantage-muted">Co-created with experts, validated by users.</p>
                </div>

                <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-80">
                    {/* Logos styled consistently */}
                    <motion.div
                        whileHover={{ scale: 1.05, opacity: 1 }}
                        className="flex flex-col items-center gap-4 group"
                    >
                        <div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center font-bold text-white text-xl">
                            Al Noor
                        </div>
                        <span className="text-sm text-white/50 group-hover:text-white transition-colors">Strategic Partner</span>
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.05, opacity: 1 }}
                        className="flex flex-col items-center gap-4 group"
                    >
                        <div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center font-bold text-white text-xl text-center p-2">
                            Expo City
                        </div>
                        <span className="text-sm text-white/50 group-hover:text-white transition-colors">Incubator</span>
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.05, opacity: 1 }}
                        className="flex flex-col items-center gap-4 group"
                    >
                        <div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center font-bold text-white text-xl">
                            CRID
                        </div>
                        <span className="text-sm text-white/50 group-hover:text-white transition-colors">Research Unit</span>
                    </motion.div>
                </div>

                <div className="mt-16 grid md:grid-cols-3 gap-8 text-center">
                    <div className="p-6">
                        <h3 className="text-white font-bold mb-2">Expert Validation</h3>
                        <p className="text-sm text-vantage-muted">Working with mobility therapists to refine ergonomics.</p>
                    </div>
                    <div className="p-6">
                        <h3 className="text-white font-bold mb-2">User Pilots</h3>
                        <p className="text-sm text-vantage-muted">Controlled trials with students at Al Noor Centre.</p>
                    </div>
                    <div className="p-6">
                        <h3 className="text-white font-bold mb-2">Innovation Hub</h3>
                        <p className="text-sm text-vantage-muted">Flagship project demonstrating advanced assistive tech.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Partners;

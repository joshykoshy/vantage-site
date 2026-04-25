import { motion } from 'framer-motion';

const Manifesto = () => {
    const values = [
        {
            title: "Empathy-First Design",
            text: "We don't build for users; we build with them. Every feature, from haptic patterns to audio cues, is co-created with the community to solve real, lived challenges."
        },
        {
            title: "Safety Without Compromise",
            text: "In navigation, trust is everything. We prioritize reliability, precision, and real-time responsiveness above all else, ensuring our technology is a safeguard, not a distraction."
        },
        {
            title: "Inclusive Innovation",
            text: "We believe cutting-edge technology should be a right, not a luxury. We are committed to creating solutions that are adaptable, affordable, and culturally relevant for diverse global communities."
        },
        {
            title: "Bold Simplicity",
            text: "Complexity belongs in the code, not the experience. We strive to translate sophisticated AI into simple, instinctive interactions that feel natural, not robotic."
        }
    ];

    return (
        <div className="bg-vantage-black min-h-screen pt-28 pb-24 relative overflow-hidden noise-bg">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-vantage-charcoal/20 to-transparent pointer-events-none"></div>
            <div className="absolute top-40 right-0 w-[400px] h-[400px] bg-vantage-electric/[0.02] rounded-full blur-[150px] pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto"
                >
                    <span className="text-xs font-mono text-vantage-electric/60 tracking-widest uppercase mb-6 block">About Us</span>
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-20 tracking-tight font-display">Our Manifesto</h1>

                    {/* Mission */}
                    <section className="mb-24">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="h-[2px] w-8 bg-vantage-electric"></div>
                            <h2 className="text-xl text-vantage-electric font-semibold font-display tracking-wide">Our Mission</h2>
                        </div>
                        <p className="text-xl md:text-2xl text-vantage-grey/80 leading-relaxed font-light">
                            To empower visually impaired individuals with true independence by transforming navigation from a challenge into an intuitive, seamless experience. We bridge the gap between human perception and environmental reality through advanced AI and sensor fusion, creating a world where mobility is defined by confidence, not limitations.
                        </p>
                    </section>

                    {/* Vision */}
                    <section className="mb-24">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="h-[2px] w-8 bg-vantage-electric"></div>
                            <h2 className="text-xl text-vantage-electric font-semibold font-display tracking-wide">Our Vision</h2>
                        </div>
                        <p className="text-xl md:text-2xl text-vantage-grey/80 leading-relaxed font-light">
                            A world where sight is not a prerequisite for exploration. We envision a future where assistive technology is invisible, intuitive, and universally accessible—where every individual, regardless of visual ability, can navigate any space with the same freedom, safety, and dignity as anyone else. We strive to make Vantage the global standard for AI-driven spatial awareness, born in the UAE and scaled for humanity.
                        </p>
                    </section>

                    {/* Values */}
                    <section>
                        <div className="flex items-center gap-4 mb-12">
                            <div className="h-[2px] w-8 bg-vantage-electric"></div>
                            <h2 className="text-xl text-vantage-electric font-semibold font-display tracking-wide">Our Values</h2>
                        </div>

                        <div className="grid md:grid-cols-2 gap-5">
                            {values.map((value, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.08, duration: 0.5 }}
                                    className="relative p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-vantage-electric/15 transition-all duration-500 group overflow-hidden"
                                >
                                    {/* Hover gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-vantage-electric/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                                    <div className="relative z-10">
                                        <span className="text-xs font-mono text-vantage-electric/40 mb-4 block">0{idx + 1}</span>
                                        <h3 className="text-white font-bold text-xl mb-4 font-display">{value.title}</h3>
                                        <p className="text-vantage-grey/70 leading-relaxed text-[15px]">{value.text}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </section>
                </motion.div>
            </div>
        </div>
    );
};

export default Manifesto;

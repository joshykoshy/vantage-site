import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Zap, Users, Lightbulb, ChevronRight } from 'lucide-react';

const Partnerships = () => {
    const [activeTab, setActiveTab] = useState('alnoor');

    const content = {
        alnoor: {
            title: "Al Noor Centre (CRID)",
            role: "Strategic Collaborative Partner",
            desc: "Vantage has formalized a Strategic Collaboration with the Al Noor Centre for Research, Innovation & Development, positioning them as a co-creation partner.",
            points: [
                { title: "Expert Validation", desc: "Direct vetting of ergonomics and haptics by specialist mobility therapists." },
                { title: "User-Centric R&D", desc: "Structured feedback loops from students ensuring the 'digital sensory bubble' meets real needs." },
                { title: "Innovation Showcase", desc: "Flagship project demonstrating leadership in 'Made in UAE' assistive tech." }
            ]
        },
        expo: {
            title: "Expo City Dubai Foundation",
            role: "Incubation Partner",
            desc: "As a member of the Expo Changemakers Academy, Vantage is nurtured within Dubai's premier ecosystem for social innovation.",
            points: [
                { title: "Mentorship", desc: "Strategic alignment with Dubai's vision for a future-ready, inclusive city." },
                { title: "Validation", desc: "Presence at Expo City validates Vantage as a scalable solution with social impact." },
                { title: "Ecosystem", desc: "Access to a network of social innovators and resources." }
            ]
        },
        accessibility_expo: {
            title: "Accessibility Expo 2025",
            role: "Featured Presenter",
            desc: "Vantage was proudly presented at the Accessibility Expo 2025 at the World Trade Centre Dubai, showcasing our groundbreaking sensory augmentation breakthrough to a global audience.",
            points: [
                { title: "Global Platform", desc: "Demonstrated our specialized assistive tech on an international stage for inclusive design." },
                { title: "Industry Networking", desc: "Connected with key thought leaders and organizations dedicated to advancing accessibility." },
                { title: "Live Validation", desc: "Garnered overwhelming positive feedback from users and advocates experiencing Vantage firsthand." }
            ]
        }
    };

    const awards = [
        {
            icon: Award,
            title: "Grant Prize Winner",
            subtitle: "MBRIF Innovation Pitch",
            image: "/images/achievements/MBRIF Innovation Pitch.png",
            description: "Won the Mohammed Bin Rashid Innovation Fund Pitch competition, a prestigious UAE federal initiative supporting high-impact innovation startups through mentorship, ecosystem access, and grant funding."
        },
        {
            icon: Award,
            title: "Incubated Startup",
            subtitle: "Expo Change Makers Academy",
            image: "/images/achievements/Expo Change Makers Academy.jpg",
            description: "Selected for the Expo City Dubai Foundation Changemakers Academy, receiving up to AED 50,000 in grant funding, dedicated workspace, business licensing support, and mentorship to scale purpose-driven innovation."
        },
        {
            icon: Lightbulb,
            title: "Community Built",
            subtitle: "Expo City Dubai Foundation",
            image: "/images/achievements/Expo City Incubation.png",
            description: "Incubated within Dubai's premier ecosystem for social innovation at Expo City, gaining access to an Urban Lab testbed, strategic partnerships, global visibility, and cross-sector networking with major industry players."
        },
        {
            icon: Zap,
            title: "Featured Presenters",
            subtitle: "Accessibility Expo 2025",
            image: "/images/achievements/Accessibilities Expo.png",
            description: "Presented Vantage at the Accessibility Expo 2025, World Trade Centre Dubai—the region's largest gathering for inclusive design and assistive technology, earning recognition from global accessibility leaders and advocates."
        },
    ];

    const tabs = [
        { key: 'alnoor', icon: Users, label: 'Al Noor Centre', sub: 'Co-Creation Partner' },
        { key: 'expo', icon: Lightbulb, label: 'Expo City Dubai Foundation', sub: 'Incubation Partner' },
        { key: 'accessibility_expo', icon: Award, label: 'Accessibility Expo 2025', sub: 'Featured Presenter' },
    ];

    return (
        <section id="partners" className="py-28 bg-vantage-charcoal relative noise-bg">
            {/* Top glow line */}
            <div className="absolute top-0 left-0 right-0 glow-line" />

            <div className="container mx-auto px-6 relative z-10">

                {/* Awards Strip */}
                <div className="flex flex-wrap justify-center gap-6 md:gap-10 mb-28 border-b border-white/[0.06] pb-14">
                    {awards.map((award, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.08, duration: 0.5 }}
                            className="relative group"
                        >
                            {/* Compact default state */}
                            <div className="flex items-center gap-4 text-vantage-grey cursor-pointer">
                                <div className="w-10 h-10 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center group-hover:border-vantage-electric/30 group-hover:shadow-glow-sm transition-all duration-500">
                                    <award.icon size={18} className="text-vantage-grey group-hover:text-vantage-electric transition-colors duration-500" />
                                </div>
                                <div className="text-sm">
                                    <span className="block font-semibold text-white text-[13px]">{award.title}</span>
                                    <span className="text-vantage-grey/60 text-xs">{award.subtitle}</span>
                                </div>
                            </div>

                            {/* Expandable hover card */}
                            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[320px] opacity-0 translate-y-2 scale-95 group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 transition-all duration-500 ease-out pointer-events-none group-hover:pointer-events-auto z-50">
                                <div className="bg-[#111111]/95 backdrop-blur-3xl border border-white/[0.08] rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(6,182,212,0.08)]">
                                    {/* Image */}
                                    <div className="w-full h-[220px] overflow-hidden bg-black/30">
                                        <img
                                            src={award.image}
                                            alt={award.title}
                                            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700"
                                        />
                                    </div>
                                    {/* Content */}
                                    <div className="p-5">
                                        <div className="flex items-center gap-2 mb-2">
                                            <award.icon size={14} className="text-vantage-electric" />
                                            <span className="text-vantage-electric font-mono text-[10px] uppercase tracking-widest">{award.subtitle}</span>
                                        </div>
                                        <h4 className="text-white font-semibold text-sm mb-2">{award.title}</h4>
                                        <p className="text-vantage-grey/70 text-xs leading-relaxed">{award.description}</p>
                                    </div>
                                </div>
                                {/* Arrow pointing up */}
                                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45 bg-[#111111]/95 border-l border-t border-white/[0.08]" />
                            </div>

                            {idx < awards.length - 1 && (
                                <div className="h-8 w-px bg-white/[0.06] ml-4 hidden md:block absolute right-[-1.25rem] top-1/2 -translate-y-1/2"></div>
                            )}
                        </motion.div>
                    ))}
                </div>

                <div className="grid lg:grid-cols-12 gap-10">

                    {/* Navigation */}
                    <div className="lg:col-span-4 space-y-3">
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                        >
                            <span className="text-xs font-mono text-vantage-electric/60 tracking-widest uppercase mb-3 block">Partners</span>
                            <h2 className="text-3xl font-bold text-white mb-8 font-display">Strategic Partnerships</h2>
                        </motion.div>

                        {tabs.map((tab) => (
                            <button
                                key={tab.key}
                                onClick={() => setActiveTab(tab.key)}
                                className={`w-full text-left p-5 rounded-xl border transition-all duration-300 relative overflow-hidden ${activeTab === tab.key ? 'bg-white/[0.06] border-white/[0.08] text-white' : 'bg-transparent border-white/[0.04] text-vantage-grey hover:bg-white/[0.02] hover:border-white/[0.06]'}`}
                            >
                                {/* Active indicator */}
                                {activeTab === tab.key && (
                                    <motion.div
                                        layoutId="tab-indicator"
                                        className="absolute left-0 top-0 bottom-0 w-[2px] bg-vantage-electric"
                                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                    />
                                )}
                                <div className="flex items-center gap-3 mb-1.5">
                                    <tab.icon size={18} className={activeTab === tab.key ? 'text-vantage-electric' : ''} />
                                    <span className="font-semibold text-[15px]">{tab.label}</span>
                                </div>
                                <span className="text-xs text-vantage-grey/50 ml-[30px]">{tab.sub}</span>
                            </button>
                        ))}
                    </div>

                    {/* Content Area */}
                    <div className="lg:col-span-8 bg-vantage-black/50 border border-white/[0.06] rounded-2xl p-8 md:p-12 relative overflow-hidden">
                        {/* Decorative glow */}
                        <div className="absolute -top-20 -right-20 w-64 h-64 bg-vantage-electric/[0.03] rounded-full blur-[100px] pointer-events-none"></div>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, x: 15 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -15 }}
                                transition={{ duration: 0.3 }}
                            >
                                <span className="inline-block px-3 py-1.5 rounded-full bg-vantage-electric/10 text-vantage-electric text-xs font-mono uppercase tracking-wider mb-6">
                                    {content[activeTab].role}
                                </span>
                                <h3 className="text-3xl font-bold text-white mb-6 font-display">{content[activeTab].title}</h3>
                                <p className="text-base text-vantage-grey/80 mb-12 leading-relaxed max-w-2xl">
                                    {content[activeTab].desc}
                                </p>

                                <div className="grid md:grid-cols-3 gap-8">
                                    {content[activeTab].points.map((point, idx) => (
                                        <div key={idx}>
                                            <div className="h-[2px] w-10 bg-gradient-to-r from-vantage-electric/40 to-transparent mb-4"></div>
                                            <h4 className="text-white font-semibold mb-2 text-[15px]">{point.title}</h4>
                                            <p className="text-sm text-vantage-grey/60 leading-relaxed">{point.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Partnerships;

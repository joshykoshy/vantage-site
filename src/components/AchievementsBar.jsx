import { motion } from 'framer-motion';
import { Award, Zap, Lightbulb } from 'lucide-react';

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

const AchievementsBar = () => {
    return (
        <div className="border-t border-b border-white/[0.06] bg-vantage-charcoal/40 py-10 relative noise-bg">
            <div className="container mx-auto px-6">
                <div className="flex flex-wrap justify-center gap-6 md:gap-10">
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
            </div>
        </div>
    );
};

export default AchievementsBar;

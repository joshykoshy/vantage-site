import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * ImpactCard — hover-blowout card with image, icon, stat and description.
 *
 * Props:
 *   title       — card heading
 *   description — full text revealed on hover
 *   stat        — big number / value
 *   statLabel   — label below stat
 *   imageSrc    — path to image (falls back to placeholder if missing)
 *   imageAlt    — alt text
 *   icon        — React node (Lucide icon)
 *   accentColor — 'cyan' | 'blue' | 'amber' | 'green'
 *   span        — 'normal' | 'wide'  (wide = col-span-2 on desktop)
 *   delay       — entrance animation delay
 */

const ACCENT = {
    cyan:  { border: 'border-cyan-500/60',  stat: 'text-cyan-400',  badge: 'bg-cyan-500/10 text-cyan-300',  glow: 'from-cyan-500/20' },
    blue:  { border: 'border-blue-500/60',  stat: 'text-blue-400',  badge: 'bg-blue-500/10 text-blue-300',  glow: 'from-blue-500/20' },
    amber: { border: 'border-amber-500/60', stat: 'text-amber-400', badge: 'bg-amber-500/10 text-amber-300', glow: 'from-amber-500/20' },
    green: { border: 'border-green-500/60', stat: 'text-green-400', badge: 'bg-green-500/10 text-green-300', glow: 'from-green-500/20' },
};

const ImpactCard = ({
    title,
    description,
    stat,
    statLabel,
    imageSrc,
    imageAlt,
    icon,
    accentColor = 'cyan',
    span = 'normal',
    delay = 0,
}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-60px' });
    const accent = ACCENT[accentColor] || ACCENT.cyan;

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
            className={`group relative rounded-2xl overflow-visible ${span === 'wide' ? 'md:col-span-2' : ''}`}
        >
            {/* Card surface */}
            <motion.div
                whileHover={{ scale: 1.03, zIndex: 50 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className={`relative rounded-2xl overflow-hidden border border-white/[0.07]
                            group-hover:${accent.border} transition-colors duration-400
                            bg-[#0D1E33] cursor-default`}
                style={{ aspectRatio: span === 'wide' ? '16/7' : '4/3' }}
            >
                {/* Background image or placeholder */}
                {imageSrc ? (
                    <img
                        src={imageSrc}
                        alt={imageAlt}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        onError={(e) => { e.target.style.display = 'none'; }}
                    />
                ) : (
                    <div className={`absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center`}>
                        <p className="text-slate-600 text-sm">{title} — Image Placeholder</p>
                    </div>
                )}

                {/* Always-on dark gradient layer — stronger on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10 transition-all duration-400 group-hover:from-black/90 group-hover:via-black/50" />

                {/* Accent glow on hover */}
                <div className={`absolute inset-0 bg-gradient-to-t ${accent.glow} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400`} />

                {/* Icon badge — top right */}
                <div className={`absolute top-4 right-4 w-10 h-10 rounded-xl ${accent.badge}
                                 flex items-center justify-center backdrop-blur-sm border border-white/10`}>
                    <span className="w-5 h-5">{icon}</span>
                </div>

                {/* Bottom content area */}
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                    {/* Title — always visible */}
                    <h3 className="text-white font-bold text-xl md:text-2xl tracking-tight mb-2 font-display">
                        {title}
                    </h3>

                    {/* Description — slides up on hover */}
                    <div className="overflow-hidden">
                        <motion.div
                            initial={false}
                            className="origin-top"
                        >
                            <p className="text-slate-300 text-sm md:text-base leading-relaxed
                                          max-h-0 opacity-0 group-hover:max-h-48 group-hover:opacity-100
                                          transition-all duration-500 ease-out mb-3">
                                {description}
                            </p>
                        </motion.div>
                    </div>

                    {/* Stat row — slides in on hover */}
                    <div className="flex items-end gap-3 opacity-0 translate-y-3
                                    group-hover:opacity-100 group-hover:translate-y-0
                                    transition-all duration-400 delay-75">
                        <span className={`text-3xl font-black ${accent.stat} leading-none`}>{stat}</span>
                        <span className="text-slate-400 text-xs pb-1 leading-tight">{statLabel}</span>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default ImpactCard;

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import {
    ChevronDown,
    GraduationCap,
    Users,
    Zap,
    Trophy,
    ImageIcon,
    CheckCircle2,
} from 'lucide-react';

import FlipboardText from '../components/ui/FlipboardText';
import InteractiveCardStack from '../components/ui/InteractiveCardStack';
import AchievementsWheel from '../components/ui/AchievementsWheel';
import CardSwap, { Card } from '../components/ui/CardSwap';

/* ─────────────────────────────────────────────────────────────────────────────
   Reusable fade-up wrapper
───────────────────────────────────────────────────────────────────────────── */
const FadeUp = ({ children, delay = 0, className = '' }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-60px' });
    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 36 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

/* ─────────────────────────────────────────────────────────────────────────────
   Section 1 — Hero with scroll-activated lamp spotlight
───────────────────────────────────────────────────────────────────────────── */
const HeroSection = () => {
    const [lampActive, setLampActive] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            if (window.scrollY > 20) {
                setLampActive(true);
                window.removeEventListener('scroll', onScroll);
            }
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <section
            data-section="hero"
            className="relative w-full min-h-screen bg-vantage-black flex flex-col items-center justify-center overflow-hidden"
        >
            {/* ── Clean theater spotlight from top-centre ────────────── */}
            <div className="absolute inset-0 pointer-events-none" aria-hidden>

                {/* Main cone: wide radial glow emanating downward from top-centre */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={lampActive ? { opacity: 1 } : {}}
                    transition={{ duration: 1.2, ease: 'easeOut' }}
                    className="absolute inset-0"
                    style={{
                        background:
                            'radial-gradient(ellipse 70% 65% at 50% -10%, rgba(0,212,255,0.22) 0%, rgba(0,212,255,0.07) 50%, transparent 75%)',
                    }}
                />

                {/* Left beam edge — thin diagonal ray */}
                <motion.div
                    initial={{ opacity: 0, scaleY: 0 }}
                    animate={lampActive ? { opacity: 1, scaleY: 1 } : {}}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                    className="absolute top-0 left-1/2"
                    style={{
                        width: '1px',
                        height: '72vh',
                        transformOrigin: 'top center',
                        transform: 'rotate(-32deg)',
                        background: 'linear-gradient(to bottom, rgba(0,212,255,0.5), transparent)',
                    }}
                />

                {/* Right beam edge — thin diagonal ray */}
                <motion.div
                    initial={{ opacity: 0, scaleY: 0 }}
                    animate={lampActive ? { opacity: 1, scaleY: 1 } : {}}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                    className="absolute top-0 left-1/2"
                    style={{
                        width: '1px',
                        height: '72vh',
                        transformOrigin: 'top center',
                        transform: 'rotate(32deg)',
                        background: 'linear-gradient(to bottom, rgba(0,212,255,0.5), transparent)',
                    }}
                />

                {/* Bright horizontal line at the lamp source */}
                <motion.div
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={lampActive ? { opacity: 1, scaleX: 1 } : {}}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="absolute top-0 left-1/2 -translate-x-1/2 h-px"
                    style={{
                        width: '28rem',
                        background: 'linear-gradient(to right, transparent, rgba(0,212,255,0.8), transparent)',
                    }}
                />

                {/* Hot-spot orb directly at top centre */}
                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={lampActive ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    style={{
                        width: '200px',
                        height: '80px',
                        background: 'rgba(0,212,255,0.35)',
                        borderRadius: '50%',
                        filter: 'blur(30px)',
                    }}
                />

                {/* Soft ambient fill — lights up the content area */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={lampActive ? { opacity: 1 } : {}}
                    transition={{ duration: 1.8, delay: 0.4 }}
                    className="absolute left-1/2 -translate-x-1/2"
                    style={{
                        top: '15%',
                        width: '600px',
                        height: '350px',
                        background: 'rgba(0,212,255,0.04)',
                        borderRadius: '50%',
                        filter: 'blur(80px)',
                    }}
                />
            </div>

            {/* ── Content — always visible, just lit by the lamp ─────── */}
            <div className="relative z-10 flex flex-col items-center text-center px-6 pt-28 pb-20">
                {/* Eyebrow */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="text-vantage-electric text-xs md:text-sm font-mono tracking-[0.3em] uppercase mb-6"
                >
                    Real People. Real Change.
                </motion.p>

                {/* Main heading */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="text-white text-4xl sm:text-5xl md:text-7xl lg:text-[5.5rem]
                               font-bold tracking-tighter leading-[1.05] max-w-4xl font-display"
                >
                    What does it feel like<br />
                    <span className="text-metallic">to just — walk?</span>
                </motion.h1>

                {/* Subtext */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.55, duration: 0.7 }}
                    className="mt-6 text-vantage-grey text-base md:text-xl max-w-2xl leading-relaxed"
                >
                    For 250 million people with severe visual impairment,
                    that question has never had a good answer.
                    Vantage is changing that.
                </motion.p>

                {/* Stats row */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.75, duration: 0.6 }}
                    className="mt-12 flex flex-wrap gap-y-8 gap-x-0 items-center justify-center"
                >
                    {[
                        { value: '250M+', label: 'Visually impaired globally' },
                        { value: '$26B',  label: 'Assistive tech market' },
                        { value: '1',     label: 'Device solving it all' },
                    ].map((item, i) => (
                        <div key={i} className="flex items-center">
                            {i > 0 && (
                                <div className="w-px h-10 bg-white/10 mx-6 md:mx-10 hidden sm:block" />
                            )}
                            <div className="text-center px-4 sm:px-0">
                                <p className="text-3xl md:text-5xl font-bold text-gradient-cyan font-display">
                                    {item.value}
                                </p>
                                <p className="text-vantage-grey text-xs md:text-sm mt-2 max-w-[130px] leading-snug">
                                    {item.label}
                                </p>
                            </div>
                        </div>
                    ))}
                </motion.div>

                {/* Scroll cue */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.4, duration: 0.8 }}
                    className="mt-16 flex flex-col items-center gap-2"
                >
                    <span className="text-vantage-grey/40 text-[10px] tracking-[0.25em] uppercase font-mono">
                        Scroll
                    </span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                    >
                        <ChevronDown className="w-4 h-4 text-vantage-electric/50" />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

/* ─────────────────────────────────────────────────────────────────────────────
   Section 2 — Flipboard Partnership Reveal
───────────────────────────────────────────────────────────────────────────── */
const PartnershipSection = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const badges = [
        'Memorandum of Collaboration Signed',
        'Active User Trials Ongoing',
        'Clinical Validation Partner',
    ];

    return (
        <section
            ref={ref}
            data-section="partnership"
            className="w-full bg-vantage-charcoal py-28 md:py-36 px-6 border-t border-white/[0.04]"
        >
            <div className="max-w-4xl mx-auto text-center">
                {/* Label */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-vantage-electric text-xs font-mono tracking-[0.3em] uppercase mb-6"
                >
                    Our First Partnership
                </motion.p>

                {/* Flipboard headline */}
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight font-display">
                    <FlipboardText
                        text="Co-Creating With Al Noor CRID"
                        scrambleDuration={500}
                        wordDelay={100}
                        charDelay={25}
                    />
                </h2>

                {/* Body text */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 1.8, duration: 0.7 }}
                    className="text-vantage-grey text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-12"
                >
                    Al Noor Centre for Research, Innovation &amp; Development is our primary
                    strategic collaborative partner — where we test, validate, and co-create
                    the Vantage Halo alongside visually impaired students and expert mobility
                    therapists.
                </motion.p>

                {/* Badges */}
                <div className="flex flex-wrap gap-3 justify-center">
                    {badges.map((badge, i) => (
                        <motion.span
                            key={badge}
                            initial={{ opacity: 0, y: 10 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 2.1 + i * 0.15, duration: 0.5 }}
                            className="flex items-center gap-2 border border-vantage-electric/20
                                       bg-vantage-electric/5 text-vantage-electric/80
                                       text-xs px-4 py-2 rounded-full font-mono tracking-wide"
                        >
                            <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                            {badge}
                        </motion.span>
                    ))}
                </div>
            </div>
        </section>
    );
};

/* ─────────────────────────────────────────────────────────────────────────────
   Section 3 — Al Noor CRID Photo Gallery
───────────────────────────────────────────────────────────────────────────── */
const GallerySection = () => {
    const alNoorImages = [
        '/images/al-noor/al-noor-01.jpg',
        '/images/al-noor/al-noor-02.jpg',
        '/images/al-noor/al-noor-03.jpg',
    ];

    const cards = alNoorImages.map((src, i) => (
        <div key={i} className="w-full h-full relative group select-none">
            <img
                src={src}
                alt={`Vantage x Al Noor CRID Session ${i + 1}`}
                draggable={false}
                className="w-full h-full object-cover rounded-2xl pointer-events-none"
            />
            {/* Fallback placeholder hidden by default */}
            <div className="absolute inset-0 bg-vantage-slate rounded-2xl hidden flex-col
                            items-center justify-center border border-white/10 border-dashed">
                <div className="w-14 h-14 rounded-full bg-vantage-electric/10 flex items-center justify-center mb-3">
                    <ImageIcon className="w-7 h-7 text-vantage-electric/40" />
                </div>
                <p className="text-vantage-grey/50 text-sm">Al Noor CRID</p>
            </div>
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent
                            opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />
            <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100
                            transition-opacity duration-300 pointer-events-none">
                <p className="text-white text-sm font-medium">Al Noor CRID Testing</p>
                <p className="text-vantage-electric text-xs">Vantage Halo V0 Trial</p>
            </div>
        </div>
    ));

    return (
        <section
            data-section="gallery"
            className="w-full bg-vantage-black py-28 md:py-36 px-6 border-t border-white/[0.04]"
        >
            <div className="max-w-6xl mx-auto">
                <FadeUp className="text-center mb-16">
                    <p className="text-vantage-electric text-xs font-mono tracking-[0.3em] uppercase mb-4">
                        Field Testing
                    </p>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-display">
                        Vantage In Action
                    </h2>
                    <p className="text-vantage-grey text-base md:text-lg max-w-xl mx-auto">
                        Real testing. Real users. Real feedback.
                    </p>
                </FadeUp>

                <FadeUp delay={0.2} className="flex flex-col items-center">
                    <div className="w-[320px] h-[400px] sm:w-[360px] sm:h-[440px]">
                        <InteractiveCardStack
                            cards={cards}
                            randomRotation={true}
                            sendToBackOnClick={true}
                            autoplay={true}
                            autoplayDelay={4000}
                            pauseOnHover={true}
                            animationConfig={{ stiffness: 240, damping: 22 }}
                        />
                    </div>
                    <p className="text-vantage-grey/40 text-xs text-center mt-10 tracking-wide">
                        Drag or click to explore our sessions →
                    </p>
                </FadeUp>
            </div>
        </section>
    );
};

/* ─────────────────────────────────────────────────────────────────────────────
   Section 4 — Who Vantage Changes Everything For (CardSwap)
───────────────────────────────────────────────────────────────────────────── */
const IMPACT_CARDS = [
    {
        title: 'Education',
        subtitle: 'Al Noor CRID Partnership',
        stat: '1,100+',
        statLabel: 'Students at Al Noor Centre',
        description:
            'Vantage enables visually impaired students to navigate school environments independently — reading signs, detecting obstacles, and accessing information in real time.',
        image: '/images/impact/education.jpg',
        icon: GraduationCap,
        accent: '#00D4FF',
    },
    {
        title: 'Society',
        subtitle: 'UAE People of Determination',
        stat: '1.1M+',
        statLabel: 'People of Determination in UAE',
        description:
            'Independence creates inclusion. When visually impaired individuals can navigate the world alone, they participate fully — in workplaces, social events, and communities.',
        image: '/images/impact/society.png',
        icon: Users,
        accent: '#818CF8',
    },
    {
        title: 'Everyday Confidence',
        subtitle: 'Real-time Spatial Awareness',
        stat: '< 20ms',
        statLabel: 'Response latency',
        description:
            'Grocery stores. Restaurants. Streets. Malls. Vantage gives users real-time audio and haptic guidance so every environment becomes navigable — no guide, no cane, no fear.',
        image: '/images/impact/confidence.png',
        icon: Zap,
        accent: '#F59E0B',
    },
    {
        title: 'Sports & Events',
        subtitle: 'Athletic Freedom',
        stat: '360°',
        statLabel: 'Full spatial awareness',
        description:
            'Blind athletes compete at the highest levels. Vantage opens the door for assisted athletic training, stadium navigation, and competitive participation without limits.',
        image: '/images/impact/sports.png',
        icon: Trophy,
        accent: '#34D399',
    },
];

const CardSwapSection = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <section
            ref={ref}
            data-section="impact-cards"
            className="w-full bg-vantage-charcoal py-28 md:py-36 px-6 border-t border-white/[0.04]"
        >
            <div className="max-w-7xl mx-auto">
                {/* Section header */}
                <FadeUp className="text-center mb-20">
                    <p className="text-vantage-electric text-xs font-mono tracking-[0.3em] uppercase mb-4">
                        Prospective Impact
                    </p>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-display">
                        Who Vantage Changes Everything For
                    </h2>
                    <p className="text-vantage-grey text-base md:text-xl max-w-2xl mx-auto leading-relaxed">
                        From classrooms to stadiums, from daily commutes to international competition —
                        spatial independence transforms every life.
                    </p>
                </FadeUp>

                {/* CardSwap layout — card stack left, detail text right */}
                <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20">
                    {/* Card stack */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="flex-shrink-0"
                    >
                        <div style={{ width: 340, height: 420 }} className="relative">
                            <CardSwap
                                width={320}
                                height={400}
                                cardDistance={50}
                                verticalDistance={55}
                                delay={2000}
                                pauseOnHover={true}
                                skewAmount={5}
                                easing="elastic"
                            >
                                {IMPACT_CARDS.map((card, i) => {
                                    const Icon = card.icon;
                                    return (
                                        <Card key={i}>
                                            {/* Full-bleed image */}
                                            <div className="relative w-full h-full">
                                                <img
                                                    src={card.image}
                                                    alt={card.title}
                                                    className="w-full h-full object-cover"
                                                />
                                                {/* Dark gradient bottom overlay */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10" />

                                                {/* Icon badge top-right */}
                                                <div
                                                    className="absolute top-4 right-4 w-9 h-9 rounded-xl flex items-center justify-center backdrop-blur-sm"
                                                    style={{ background: `${card.accent}22`, border: `1px solid ${card.accent}40` }}
                                                >
                                                    <Icon
                                                        className="w-4 h-4"
                                                        style={{ color: card.accent }}
                                                    />
                                                </div>

                                                {/* Bottom text */}
                                                <div className="absolute bottom-0 left-0 right-0 p-5">
                                                    <p
                                                        className="text-xs font-mono tracking-[0.2em] uppercase mb-1"
                                                        style={{ color: card.accent }}
                                                    >
                                                        {card.subtitle}
                                                    </p>
                                                    <h3 className="text-white font-bold text-xl font-display leading-tight mb-2">
                                                        {card.title}
                                                    </h3>
                                                    <div className="flex items-baseline gap-2">
                                                        <span
                                                            className="text-2xl font-black"
                                                            style={{ color: card.accent }}
                                                        >
                                                            {card.stat}
                                                        </span>
                                                        <span className="text-white/50 text-xs">{card.statLabel}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Card>
                                    );
                                })}
                            </CardSwap>
                        </div>
                    </motion.div>

                    {/* Description cards — stacked list */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-col gap-4 max-w-md w-full"
                    >
                        {IMPACT_CARDS.map((card, i) => {
                            const Icon = card.icon;
                            return (
                                <div
                                    key={card.title}
                                    className="group flex items-start gap-4 p-5 rounded-xl
                                               border border-white/[0.06] bg-vantage-black/60
                                               hover:border-white/[0.12] hover:bg-vantage-black
                                               transition-all duration-300 cursor-default"
                                >
                                    {/* Icon */}
                                    <div
                                        className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center mt-0.5"
                                        style={{ background: `${card.accent}15`, border: `1px solid ${card.accent}30` }}
                                    >
                                        <Icon className="w-4 h-4" style={{ color: card.accent }} />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <h4 className="text-white font-semibold text-sm">{card.title}</h4>
                                            <span
                                                className="text-xs font-mono font-bold"
                                                style={{ color: card.accent }}
                                            >
                                                {card.stat}
                                            </span>
                                        </div>
                                        <p className="text-vantage-grey text-xs leading-relaxed">
                                            {card.description}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

/* ─────────────────────────────────────────────────────────────────────────────
   Section 5 — UAE National Vision Alignment
───────────────────────────────────────────────────────────────────────────── */
const UAEVisionSection = () => {
    const pillars = [
        { icon: '🏛', label: 'Policy Aligned' },
        { icon: '🤝', label: 'Institutionally Validated' },
        { icon: '🌍', label: 'Globally Scalable' },
    ];

    return (
        <section
            data-section="uae-vision"
            className="w-full bg-vantage-black py-28 md:py-36 px-6 border-t border-white/[0.04]"
        >
            <div className="max-w-4xl mx-auto text-center">
                {/* Logo placeholders */}
                <FadeUp className="flex flex-wrap items-center justify-center gap-8 md:gap-16 mb-16">
                    {[
                        { src: '/images/logos/we-the-uae-2031.png', label: 'We The UAE 2031' },
                        { src: '/images/logos/people-of-determination.png', label: 'People of Determination' },
                    ].map((logo, i) => (
                        <div key={i} className="flex items-center gap-8">
                            {i > 0 && <div className="w-px h-12 bg-white/10 hidden md:block" />}
                            <div className="h-16 px-6 flex items-center justify-center
                                            bg-white/[0.03] rounded-xl border border-white/[0.06]">
                                <img
                                    src={logo.src}
                                    alt={logo.label}
                                    className="h-10 object-contain opacity-80"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.nextSibling.style.display = 'block';
                                    }}
                                />
                                <span
                                    className="text-amber-400/70 font-bold text-sm tracking-wide hidden"
                                >
                                    {logo.label}
                                </span>
                            </div>
                        </div>
                    ))}
                </FadeUp>

                <FadeUp delay={0.1}>
                    <h2 className="text-3xl md:text-4xl font-bold text-amber-400 mb-6 font-display">
                        Alignment With National Vision
                    </h2>
                    <p className="text-vantage-grey text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-10">
                        "Vantage directly supports the UAE National Policy for Empowering People of
                        Determination — delivering a tangible, scalable solution for accessibility
                        and inclusion across the Emirates and beyond."
                    </p>
                </FadeUp>

                <FadeUp delay={0.2} className="flex flex-wrap gap-3 justify-center">
                    {pillars.map((p, i) => (
                        <motion.span
                            key={p.label}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.25 + i * 0.12, duration: 0.5 }}
                            className="flex items-center gap-2 border border-amber-500/20
                                       bg-amber-500/5 text-amber-400/80
                                       text-xs px-4 py-2 rounded-full font-mono tracking-wide"
                        >
                            <span>{p.icon}</span>
                            {p.label}
                        </motion.span>
                    ))}
                </FadeUp>
            </div>
        </section>
    );
};

/* ─────────────────────────────────────────────────────────────────────────────
   Section 6 — Closing CTA
───────────────────────────────────────────────────────────────────────────── */
const ClosingCTA = () => (
    <section
        data-section="cta"
        className="w-full bg-vantage-charcoal py-28 md:py-36 px-6 relative overflow-hidden border-t border-white/[0.04]"
    >
        {/* Glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[500px] h-[200px] bg-vantage-electric/[0.04] blur-[100px] rounded-full" />
        </div>

        <div className="max-w-3xl mx-auto text-center relative z-10">
            <FadeUp>
                <p className="text-vantage-electric text-xs font-mono tracking-[0.3em] uppercase mb-6">
                    Get Involved
                </p>
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight font-display">
                    The Impact Starts Now
                </h2>
                <p className="text-vantage-grey text-base md:text-xl max-w-xl mx-auto leading-relaxed mb-12">
                    We are actively seeking partners, researchers, and investors who believe
                    every person deserves spatial independence.
                </p>

                <div className="flex flex-wrap gap-4 justify-center">
                    <motion.a
                        href="/contact"
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.97 }}
                        className="bg-vantage-electric hover:bg-cyan-300 text-black font-semibold
                                   rounded-full px-8 py-4 transition-colors duration-200 text-sm md:text-base"
                    >
                        Partner With Us
                    </motion.a>
                    <motion.a
                        href="/vantage-vo1"
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.97 }}
                        className="border border-white/[0.12] hover:border-white/30 text-white
                                   font-semibold rounded-full px-8 py-4 transition-colors duration-200
                                   text-sm md:text-base"
                    >
                        See the Product
                    </motion.a>
                </div>
            </FadeUp>
        </div>
    </section>
);

/* ─────────────────────────────────────────────────────────────────────────────
   Page root
───────────────────────────────────────────────────────────────────────────── */
const Impact = () => (
    <div className="bg-vantage-black min-h-screen">
        <HeroSection />
        <PartnershipSection />
        <GallerySection />
        <CardSwapSection />
        <UAEVisionSection />
        <AchievementsWheel />
        <ClosingCTA />
    </div>
);

export default Impact;

import { useRef } from 'react';
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

import LampContainer from '../components/ui/LampContainer';
import FlipboardText from '../components/ui/FlipboardText';
import InteractiveCardStack from '../components/ui/InteractiveCardStack';
import ImpactCard from '../components/ui/ImpactCard';

/* ─────────────────────────────────────────────────────────────────────────────
   Reusable fade-up wrapper
───────────────────────────────────────────────────────────────────────────── */
const FadeUp = ({ children, delay = 0, className = '' }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });
    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

/* ─────────────────────────────────────────────────────────────────────────────
   Section 1 — Lamp Hero
───────────────────────────────────────────────────────────────────────────── */
const HeroSection = () => (
    <section data-section="hero" className="relative">
        <LampContainer>
            {/* Eyebrow */}
            <motion.p
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6, ease: 'easeInOut' }}
                className="text-cyan-400 text-sm md:text-lg font-medium tracking-widest uppercase mb-4"
            >
                Real People. Real Change.
            </motion.p>

            {/* Main heading */}
            <motion.h1
                initial={{ opacity: 0.5, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8, ease: 'easeInOut' }}
                className="bg-gradient-to-br from-slate-100 to-slate-400 bg-clip-text text-transparent
                           text-center text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-tight"
                style={{ fontFamily: "'Space Grotesk', 'Outfit', sans-serif" }}
            >
                What does it feel like<br />to just — walk?
            </motion.h1>

            {/* Subtext */}
            <motion.p
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.7, ease: 'easeInOut' }}
                className="mt-6 text-slate-400 text-base md:text-xl text-center max-w-2xl leading-relaxed px-4"
            >
                For 250 million people with severe visual impairment,
                that question has never had a good answer.
                Vantage is changing that.
            </motion.p>

            {/* Stats row */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="mt-10 flex flex-wrap gap-y-6 gap-x-2 items-center justify-center"
            >
                {[
                    { value: '250M+', label: 'Visually impaired globally' },
                    { value: '$26B',  label: 'Assistive tech market'      },
                    { value: '1',     label: 'Device solving it all'       },
                ].map((item, i) => (
                    <div key={i} className="flex items-center">
                        {i > 0 && <div className="w-px h-10 bg-slate-700 mx-5 hidden sm:block" />}
                        <div className="text-center px-4 sm:px-0">
                            <p className="text-3xl md:text-5xl font-bold text-cyan-400">{item.value}</p>
                            <p className="text-slate-400 text-xs md:text-sm mt-1 max-w-[120px]">{item.label}</p>
                        </div>
                    </div>
                ))}
            </motion.div>
        </LampContainer>

        {/* Scroll cue */}
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
            <span className="text-slate-500 text-xs tracking-widest uppercase">Scroll</span>
            <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            >
                <ChevronDown className="w-5 h-5 text-cyan-400" />
            </motion.div>
        </motion.div>
    </section>
);

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
            className="w-full bg-[#0F1F35] py-32 px-6"
        >
            <div className="max-w-4xl mx-auto text-center">
                {/* Label */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-cyan-400 text-xs md:text-sm font-medium tracking-widest uppercase mb-6"
                >
                    Our First Partnership
                </motion.p>

                {/* Flipboard headline */}
                <h2
                    className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-8 leading-tight"
                    style={{ fontFamily: "'Space Grotesk', 'Outfit', sans-serif" }}
                >
                    <FlipboardText
                        text="Co-Creating With Al Noor CRID"
                        scrambleDuration={500}
                        wordDelay={100}
                        charDelay={25}
                    />
                </h2>

                {/* Body text fades in */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 1.8, duration: 0.7 }}
                    className="text-slate-400 text-base md:text-xl max-w-2xl mx-auto leading-relaxed mb-12"
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
                            transition={{ delay: 2.2 + i * 0.15, duration: 0.5 }}
                            className="flex items-center gap-2 border border-cyan-500/30 bg-cyan-500/10
                                       text-cyan-300 text-xs md:text-sm px-4 py-2 rounded-full"
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
                onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                }}
            />
            {/* Fallback placeholder */}
            <div
                className="absolute inset-0 bg-slate-800 rounded-2xl hidden flex-col items-center justify-center border border-slate-700 border-dashed"
                style={{ display: 'none' }}
            >
                <div className="w-16 h-16 rounded-full bg-cyan-500/10 flex items-center justify-center mb-4">
                    <ImageIcon className="w-8 h-8 text-cyan-400/50" />
                </div>
                <p className="text-slate-500 text-sm">Al Noor CRID</p>
                <p className="text-slate-600 text-xs">Testing Session Photo</p>
            </div>

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent
                            opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />
            <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100
                            transition-opacity duration-300 pointer-events-none">
                <p className="text-white text-sm font-medium">Al Noor CRID Testing</p>
                <p className="text-cyan-300 text-xs">Vantage Halo V0 Trial</p>
            </div>
        </div>
    ));

    return (
        <section data-section="gallery" className="w-full bg-[#0A1628] py-32 px-6">
            <div className="max-w-6xl mx-auto">
                {/* Heading */}
                <FadeUp className="text-center mb-16">
                    <p className="text-cyan-400 text-xs md:text-sm font-medium tracking-widest uppercase mb-4">
                        Field Testing
                    </p>
                    <h2
                        className="text-3xl md:text-4xl font-bold text-white mb-4"
                        style={{ fontFamily: "'Space Grotesk', 'Outfit', sans-serif" }}
                    >
                        Vantage In Action
                    </h2>
                    <p className="text-slate-400 text-base md:text-lg max-w-xl mx-auto">
                        Real testing. Real users. Real feedback.
                    </p>
                </FadeUp>

                {/* Card stack */}
                <FadeUp delay={0.2} className="flex flex-col items-center">
                    <div className="w-[320px] h-[420px] sm:w-[360px] sm:h-[460px]">
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
                    <p className="text-slate-500 text-sm text-center mt-10">
                        Drag or click to explore our sessions →
                    </p>
                </FadeUp>
            </div>
        </section>
    );
};

/* ─────────────────────────────────────────────────────────────────────────────
   Section 4 — Prospective Impact Grid
───────────────────────────────────────────────────────────────────────────── */
const ImpactGridSection = () => {
    const cards = [
        {
            title: 'Education',
            description:
                'Vantage enables visually impaired students to navigate school environments independently — reading signs, detecting obstacles, and accessing information in real time. Paired with Al Noor CRID, we are co-developing the first AI-assisted educational navigation experience in the UAE.',
            stat: '1,100+',
            statLabel: 'Students at Al Noor Centre',
            imageSrc: '/images/impact/education.jpg',
            imageAlt: 'Education impact',
            icon: <GraduationCap className="w-full h-full" />,
            accentColor: 'cyan',
            span: 'wide',
        },
        {
            title: 'Society',
            description:
                'Independence creates inclusion. When visually impaired individuals can navigate the world alone, they participate fully — in workplaces, social events, and communities. Vantage removes the invisible wall between determination and participation.',
            stat: '1.1M+',
            statLabel: 'People of Determination in UAE',
            imageSrc: '/images/impact/society.jpg',
            imageAlt: 'Society impact',
            icon: <Users className="w-full h-full" />,
            accentColor: 'blue',
            span: 'normal',
        },
        {
            title: 'Everyday Confidence',
            description:
                'Grocery stores. Restaurants. Streets. Malls. The moments everyone takes for granted become obstacles without spatial awareness. Vantage gives users real-time audio and haptic guidance so every environment becomes navigable — no guide, no cane, no fear.',
            stat: '< 20ms',
            statLabel: 'Real-time response latency',
            imageSrc: '/images/impact/confidence.jpg',
            imageAlt: 'Everyday confidence impact',
            icon: <Zap className="w-full h-full" />,
            accentColor: 'amber',
            span: 'normal',
        },
        {
            title: 'Sports & Events',
            description:
                'Blind athletes compete at the highest levels. Vantage\'s spatial awareness system opens the door for assisted athletic training, stadium navigation, and competitive participation — giving every athlete the freedom to perform without limits.',
            stat: '360°',
            statLabel: 'Full spatial awareness',
            imageSrc: '/images/impact/sports.jpg',
            imageAlt: 'Sports and events impact',
            icon: <Trophy className="w-full h-full" />,
            accentColor: 'green',
            span: 'normal',
        },
    ];

    return (
        <section data-section="impact-grid" className="w-full bg-[#0F1F35] py-32 px-6">
            <div className="max-w-6xl mx-auto">
                {/* Section header */}
                <FadeUp className="text-center mb-16">
                    <p className="text-cyan-400 text-xs md:text-sm font-medium tracking-widest uppercase mb-4">
                        Prospective Impact
                    </p>
                    <h2
                        className="text-4xl md:text-5xl font-bold text-white mb-6"
                        style={{ fontFamily: "'Space Grotesk', 'Outfit', sans-serif" }}
                    >
                        Who Vantage Changes Everything For
                    </h2>
                    <p className="text-slate-400 text-base md:text-xl max-w-3xl mx-auto leading-relaxed">
                        From classrooms to stadiums, from daily commutes to international competition —
                        spatial independence transforms every life.
                    </p>
                </FadeUp>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {cards.map((card, i) => (
                        <ImpactCard key={card.title} {...card} delay={0.1 * i} />
                    ))}
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
        <section data-section="uae-vision" className="w-full bg-[#0F1E2E] py-32 px-6">
            <div className="max-w-4xl mx-auto text-center">
                {/* Logo row */}
                <FadeUp className="flex flex-wrap items-center justify-center gap-8 md:gap-16 mb-16">
                    {/* We The UAE 2031 — text placeholder if logo missing */}
                    <div className="flex flex-col items-center gap-2">
                        <div className="h-20 px-6 flex items-center justify-center bg-white/5 rounded-xl border border-white/10">
                            <img
                                src="/images/logos/we-the-uae-2031.png"
                                alt="We The UAE 2031"
                                className="h-14 object-contain opacity-90"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.nextSibling.style.display = 'block';
                                }}
                            />
                            <span
                                className="text-amber-300 font-bold text-sm tracking-wide"
                                style={{ display: 'none' }}
                            >
                                We The UAE 2031
                            </span>
                        </div>
                    </div>

                    <div className="w-px h-16 bg-slate-700 hidden md:block" />

                    <div className="flex flex-col items-center gap-2">
                        <div className="h-20 px-6 flex items-center justify-center bg-white/5 rounded-xl border border-white/10">
                            <img
                                src="/images/logos/people-of-determination.png"
                                alt="National Policy for Empowering People of Determination"
                                className="h-14 object-contain opacity-90"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.nextSibling.style.display = 'block';
                                }}
                            />
                            <span
                                className="text-amber-300 font-bold text-sm tracking-wide text-center max-w-[160px]"
                                style={{ display: 'none' }}
                            >
                                People of Determination
                            </span>
                        </div>
                    </div>
                </FadeUp>

                {/* Text */}
                <FadeUp delay={0.1}>
                    <h2
                        className="text-3xl md:text-4xl font-bold text-amber-400 mb-6"
                        style={{ fontFamily: "'Space Grotesk', 'Outfit', sans-serif" }}
                    >
                        Alignment With National Vision
                    </h2>
                    <p className="text-slate-300 text-base md:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
                        "Vantage directly supports the UAE National Policy for Empowering People of
                        Determination — delivering a tangible, scalable solution for accessibility
                        and inclusion across the Emirates and beyond."
                    </p>
                </FadeUp>

                {/* Amber pillars */}
                <FadeUp delay={0.25} className="flex flex-wrap gap-3 justify-center">
                    {pillars.map((p, i) => (
                        <motion.span
                            key={p.label}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 + i * 0.15, duration: 0.5 }}
                            className="flex items-center gap-2 border border-amber-500/30 bg-amber-500/10
                                       text-amber-300 text-xs md:text-sm px-4 py-2 rounded-full"
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
    <section data-section="cta" className="w-full bg-[#0A1628] py-32 px-6 relative overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[600px] h-[300px] bg-cyan-500/5 blur-[120px] rounded-full" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
            <FadeUp>
                <p className="text-cyan-400 text-xs md:text-sm font-medium tracking-widest uppercase mb-6">
                    Get Involved
                </p>
                <h2
                    className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight"
                    style={{ fontFamily: "'Space Grotesk', 'Outfit', sans-serif" }}
                >
                    The Impact Starts Now
                </h2>
                <p className="text-slate-400 text-base md:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
                    We are actively seeking partners, researchers, and investors who believe
                    every person deserves spatial independence.
                </p>

                <div className="flex flex-wrap gap-4 justify-center">
                    <motion.a
                        href="/contact"
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.97 }}
                        className="bg-cyan-500 hover:bg-cyan-400 text-white font-semibold
                                   rounded-full px-8 py-4 transition-colors duration-200
                                   text-sm md:text-base"
                    >
                        Partner With Us
                    </motion.a>
                    <motion.a
                        href="/vantage-vo1"
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.97 }}
                        className="border border-white/20 hover:border-white/40 text-white
                                   font-semibold rounded-full px-8 py-4 transition-colors duration-200
                                   text-sm md:text-base backdrop-blur-sm"
                    >
                        Watch Our Demo
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
    <div className="bg-[#0A1628] min-h-screen">
        <HeroSection />
        <PartnershipSection />
        <GallerySection />
        <ImpactGridSection />
        <UAEVisionSection />
        <ClosingCTA />
    </div>
);

export default Impact;

import { motion } from 'framer-motion';

/**
 * LampContainer — cinematic spotlight hero wrapper.
 * Renders a conic-gradient "lamp beam" from the top centre,
 * plus an ambient ellipse glow beneath it.
 * Children are rendered centred inside the lit area.
 */
const LampContainer = ({ children, className = '' }) => {
    return (
        <div
            className={`relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#0A1628] w-full z-0 ${className}`}
        >
            {/* ── Lamp beams ─────────────────────────────────────────── */}
            <div className="relative flex w-full flex-1 scale-y-125 items-center justify-center isolate z-0">
                {/* Left beam */}
                <motion.div
                    initial={{ opacity: 0.5, width: '15rem' }}
                    whileInView={{ opacity: 1, width: '30rem' }}
                    transition={{ delay: 0.3, duration: 0.8, ease: 'easeInOut' }}
                    style={{
                        backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
                    }}
                    className="absolute inset-auto right-1/2 h-56 overflow-visible w-[30rem]
                               bg-gradient-conic from-cyan-500 via-transparent to-transparent
                               text-white [--conic-position:from_70deg_at_center_top]"
                >
                    {/* Hard edge mask — left side */}
                    <div className="absolute w-[100%] left-0 bg-[#0A1628] h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
                    <div className="absolute w-40 h-[100%] left-0 bg-[#0A1628] bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]" />
                </motion.div>

                {/* Right beam */}
                <motion.div
                    initial={{ opacity: 0.5, width: '15rem' }}
                    whileInView={{ opacity: 1, width: '30rem' }}
                    transition={{ delay: 0.3, duration: 0.8, ease: 'easeInOut' }}
                    style={{
                        backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
                    }}
                    className="absolute inset-auto left-1/2 h-56 w-[30rem] overflow-visible
                               bg-gradient-conic from-transparent via-transparent to-cyan-500
                               text-white [--conic-position:from_290deg_at_center_top]"
                >
                    {/* Hard edge mask — right side */}
                    <div className="absolute w-40 h-[100%] right-0 bg-[#0A1628] bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
                    <div className="absolute w-[100%] right-0 bg-[#0A1628] h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
                </motion.div>

                {/* Centre white hot-spot */}
                <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-[#0A1628] blur-2xl" />
                <div className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md" />

                {/* Glowing line at beam apex */}
                <div className="absolute inset-auto z-50 h-0.5 w-[30rem] -translate-y-1/2 bg-cyan-400 opacity-60" />

                {/* Radial ambient glow beneath line */}
                <motion.div
                    initial={{ width: '8rem' }}
                    whileInView={{ width: '16rem' }}
                    transition={{ delay: 0.3, duration: 0.8, ease: 'easeInOut' }}
                    className="absolute inset-auto z-30 h-36 w-64 -translate-y-[6rem] rounded-full bg-cyan-400 blur-2xl"
                />

                {/* Large background glow ellipse */}
                <motion.div
                    initial={{ width: '15rem' }}
                    whileInView={{ width: '30rem' }}
                    transition={{ delay: 0.3, duration: 0.8, ease: 'easeInOut' }}
                    className="absolute inset-auto z-50 h-0.5 w-[30rem] -translate-y-1/2 bg-cyan-300 opacity-80"
                />

                <div className="absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem] bg-[#0A1628]" />
            </div>

            {/* ── Children ─────────────────────────────────────────────── */}
            <div className="relative z-50 flex -translate-y-80 flex-col items-center px-5 text-center">
                {children}
            </div>
        </div>
    );
};

export default LampContainer;

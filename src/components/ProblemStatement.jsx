import { useRef, useEffect, useState } from 'react';
import { motion, useScroll } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

// ─── Config ───────────────────────────────────────────────────────────────────
const LOCK_AT = 0.18;          // scroll progress that triggers the lock (end of Act 0)
const ANIM_DURATION = 13000;   // ms for Acts 1–3 to auto-play

// ─── SVG: Animated White Cane ─────────────────────────────────────────────────
const CaneIcon = ({ sweep }) => {
  const angle = (sweep - 0.5) * 70; // −35° to +35°
  const atEdge = sweep < 0.08 || sweep > 0.92;
  return (
    <svg width="160" height="220" viewBox="0 0 160 220" fill="none">
      {/* Grip cap */}
      <ellipse cx="80" cy="18" rx="9" ry="14" fill="#2a2a2a" stroke="#555" strokeWidth="1.5" />
      {/* Shaft + tip group — rotates from grip base */}
      <g style={{ transformOrigin: '80px 32px', transform: `rotate(${angle}deg)` }}>
        <rect x="77" y="32" width="6" height="148" rx="3" fill="white" opacity="0.95" />
        {/* Red tip band */}
        <rect x="77" y="160" width="6" height="12" rx="2" fill="#ef4444" />
        {/* Ball tip */}
        <ellipse cx="80" cy="178" rx="4" ry="4" fill="white" opacity="0.85" />
        {/* Tap-contact ripple */}
        {atEdge && (
          <>
            <circle cx="80" cy="180" r="9"  stroke="white" strokeWidth="1"   opacity="0.25" />
            <circle cx="80" cy="180" r="16" stroke="white" strokeWidth="0.5" opacity="0.10" />
          </>
        )}
      </g>
    </svg>
  );
};

// ─── SVG: Ground Barrier ──────────────────────────────────────────────────────
const GroundBarrier = ({ opacity = 1, orange = false }) => {
  const col = orange ? '#FF6B00' : 'white';
  const subOpacity = orange ? 0.55 : 0.25;
  return (
    <svg width="320" height="60" viewBox="0 0 320 60" fill="none" style={{ opacity }}>
      <rect x="10" y="20" width="300" height="30" rx="4"
        stroke={col} strokeWidth="1.5" fill="none" />
      <line x1="10" y1="50" x2="310" y2="50" stroke={col} strokeWidth="1" opacity="0.4" />
      {[0,1,2,3,4].map(i => (
        <g key={i} transform={`translate(${40 + i * 56}, 22)`}>
          <line x1="0" y1="28" x2="14" y2="0"  stroke={`rgba(255,255,255,${subOpacity})`} strokeWidth="1.5" />
          <line x1="14" y1="0"  x2="28" y2="28" stroke={`rgba(255,255,255,${subOpacity})`} strokeWidth="1.5" />
        </g>
      ))}
      <text x="160" y="15" textAnchor="middle"
        fill={`rgba(255,255,255,0.35)`} fontSize="9" letterSpacing="3" fontFamily="monospace">
        CONSTRUCTION BARRIER
      </text>
    </svg>
  );
};

// ─── SVG: Overhead Obstacle ───────────────────────────────────────────────────
const Overhang = ({ orangePulse }) => {
  const col = orangePulse ? '#FF6B00' : '#1E1E1E';
  return (
    <svg width="280" height="90" viewBox="0 0 280 90" fill="none"
      style={{ transition: 'all 0.35s' }}>
      <rect x="214" y="0"  width="18" height="90" rx="2" stroke={col} strokeWidth="1.5" fill="none" />
      <rect x="60"  y="30" width="154" height="16" rx="3" stroke={col} strokeWidth="1.5" fill="none" />
      <rect x="60"  y="46" width="90"  height="38" rx="3" stroke={col} strokeWidth="1.5" fill="none" />
      <text x="105" y="70" textAnchor="middle"
        fill={col} fontSize="9" letterSpacing="2" fontFamily="monospace" opacity="0.85">
        SHOP SIGN
      </text>
      {orangePulse && (
        <>
          <circle cx="105" cy="62" r="30" stroke="#FF6B00" strokeWidth="0.5" opacity="0.25" />
          <circle cx="105" cy="62" r="22" stroke="#FF6B00" strokeWidth="0.5" opacity="0.15" />
        </>
      )}
    </svg>
  );
};

// ─── SVG: Orange Sonar Rings ───────────────────────────────────────────────────
const PulseRings = ({ progress }) => (
  <svg className="absolute inset-0 w-full h-full pointer-events-none"
    viewBox="0 0 600 400" preserveAspectRatio="xMidYMid slice">
    {[0, 1, 2, 3].map(i => {
      const delay = i * 0.18;
      const p = Math.max(0, progress - delay);
      const r = p * 390;
      const opacity = Math.max(0, 0.75 - p * 0.85 - i * 0.08);
      return (
        <circle key={i} cx="300" cy="200" r={r}
          stroke="#FF6B00" strokeWidth={2 - i * 0.35} fill="none" opacity={opacity} />
      );
    })}
  </svg>
);

// ─── Dot Nav ──────────────────────────────────────────────────────────────────
const DotNav = ({ current }) => (
  <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-50">
    {[0, 1, 2, 3, 4].map(i => (
      <div key={i} style={{
        width: 6, height: 6, borderRadius: '50%',
        background: current === i ? '#FF6B00' : 'rgba(255,255,255,0.2)',
        transform: current === i ? 'scale(1.7)' : 'scale(1)',
        transition: 'all 0.4s ease',
        boxShadow: current === i ? '0 0 6px rgba(255,107,0,0.6)' : 'none',
      }} />
    ))}
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────
const ProblemStatement = () => {
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const phaseRef = useRef('pre');       // 'pre' | 'locked' | 'post'
  const animRafRef = useRef(null);
  const sweepRafRef = useRef(null);
  const sweepValRef = useRef(0.5);
  const sweepDirRef = useRef(1);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const [phase, setPhase] = useState('pre');
  const [internalT, setInternalT] = useState(0);
  const [scrollProg, setScrollProg] = useState(0);
  const [sweepT, setSweepT] = useState(0.5);

  // ── Continuous cane sweep ──────────────────────────────────────────────────
  useEffect(() => {
    const animate = () => {
      sweepValRef.current += 0.007 * sweepDirRef.current;
      if (sweepValRef.current >= 1) { sweepValRef.current = 1; sweepDirRef.current = -1; }
      if (sweepValRef.current <= 0) { sweepValRef.current = 0; sweepDirRef.current = 1; }
      setSweepT(sweepValRef.current);
      sweepRafRef.current = requestAnimationFrame(animate);
    };
    sweepRafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(sweepRafRef.current);
  }, []);

  // ── Scroll lock when phase === 'locked' ────────────────────────────────────
  useEffect(() => {
    if (phase !== 'locked') return;
    const blockWheel = (e) => e.preventDefault();
    const blockKey = (e) => {
      if ([' ', 'ArrowDown', 'ArrowUp', 'PageDown', 'PageUp'].includes(e.key)) {
        e.preventDefault();
      }
    };
    document.addEventListener('wheel',     blockWheel, { passive: false });
    document.addEventListener('touchmove', blockWheel, { passive: false });
    document.addEventListener('keydown',   blockKey);
    return () => {
      document.removeEventListener('wheel',     blockWheel);
      document.removeEventListener('touchmove', blockWheel);
      document.removeEventListener('keydown',   blockKey);
    };
  }, [phase]);

  // ── Scroll progress watcher + phase trigger ────────────────────────────────
  useEffect(() => {
    return scrollYProgress.on('change', (v) => {
      setScrollProg(v);

      // Transition pre → locked when Act 0 finishes
      if (phaseRef.current === 'pre' && v >= LOCK_AT) {
        phaseRef.current = 'locked';
        setPhase('locked');

        const startTime = performance.now();
        const tick = (now) => {
          const t = Math.min(1, (now - startTime) / ANIM_DURATION);
          setInternalT(t);
          if (t < 1) {
            animRafRef.current = requestAnimationFrame(tick);
          } else {
            // Jump scroll to the 80% position of this section
            if (containerRef.current) {
              const containerTop =
                containerRef.current.getBoundingClientRect().top + window.scrollY;
              window.scrollTo({ top: containerTop + 3.2 * window.innerHeight, behavior: 'instant' });
            }
            phaseRef.current = 'post';
            setPhase('post');
          }
        };
        animRafRef.current = requestAnimationFrame(tick);
      }
    });
  }, [scrollYProgress]);

  // Cleanup RAF on unmount
  useEffect(() => () => { if (animRafRef.current) cancelAnimationFrame(animRafRef.current); }, []);

  // ── Derive display values ──────────────────────────────────────────────────

  // Act 0 — hook text (scroll-driven)
  const a0 = phase === 'pre' ? Math.min(1, scrollProg / LOCK_AT) : 1;
  const hookOp   = a0 < 0.65 ? Math.min(1, a0 * 4) : Math.max(0, 1 - (a0 - 0.65) * 5.5);
  const hookBlur = a0 > 0.65 ? (a0 - 0.65) * 42 : 0;

  // Acts 1–3 segments within internalT
  const int1 = Math.min(1,          internalT / 0.30);
  const int2 = Math.max(0, Math.min(1, (internalT - 0.30) / 0.34));
  const int3 = Math.max(0, Math.min(1, (internalT - 0.64) / 0.36));

  // Act 1 values
  const barrierOp  = int1 > 0.25 ? Math.min(1, (int1 - 0.25) * 4.5) : 0;
  const caneTextOp = int1 > 0.40 ? Math.min(1, (int1 - 0.40) * 4.5) : 0;

  // Act 2 values
  const overhangOp   = int2 > 0.12 ? Math.min(1, (int2 - 0.12) * 3.5) : 0;
  const dangerTextOp = int2 > 0.42 ? Math.min(1, (int2 - 0.42) * 5.0) : 0;
  const blackoutOp   = int2 > 0.84 ? Math.min(1, (int2 - 0.84) * 7.0) : 0;

  // Act 3 values
  const pulseP    = int3 > 0.06 ? Math.min(1, (int3 - 0.06) * 2.6) : 0;
  const orangeOn  = int3 > 0.06 && int3 < 0.88;
  const illTextOp = int3 > 0.50 ? Math.min(1, (int3 - 0.50) * 5.0) : 0;
  const illTextOut= int3 > 0.88 ? Math.min(1, (int3 - 0.88) * 9.0) : 0;

  // Act 4 — quote (scroll-driven, phase === 'post')
  const a4   = phase === 'post' ? Math.min(1, Math.max(0, (scrollProg - 0.80) / 0.19)) : 0;
  const l1   = a4 > 0.05 ? Math.min(1, (a4 - 0.05) * 7) : 0;
  const l2   = a4 > 0.22 ? Math.min(1, (a4 - 0.22) * 7) : 0;
  const l3   = a4 > 0.42 ? Math.min(1, (a4 - 0.42) * 7) : 0;
  const l4   = a4 > 0.58 ? Math.min(1, (a4 - 0.58) * 7) : 0;
  const ctaOp= a4 > 0.76 ? Math.min(1, (a4 - 0.76) * 7) : 0;

  // Current act (drives dot nav)
  const currentAct =
    phase === 'pre'  ? 0 :
    phase === 'post' ? 4 :
    internalT < 0.30 ? 1 :
    internalT < 0.64 ? 2 : 3;

  // Panel visibility helper
  const panel = (act) => ({
    position: 'absolute', inset: 0,
    opacity: currentAct === act ? 1 : 0,
    transition: 'opacity 0.55s ease',
    pointerEvents: currentAct === act ? 'auto' : 'none',
  });

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div ref={containerRef} style={{ height: '500vh' }} className="relative">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#0A0A0A]">

        {/* Film grain texture */}
        <div className="absolute inset-0 pointer-events-none z-50 opacity-[0.028]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: '128px',
          }} />

        <DotNav current={currentAct} />

        {/* ═══════════════════════════════════════════
            ACT 0 — THE HOOK  (scroll-driven)
        ═══════════════════════════════════════════ */}
        <div style={{
          ...panel(0),
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          // also visible during the brief crossfade into act 1
          opacity: phase === 'pre' ? 1 : 0,
        }}>
          <p
            className="text-2xl md:text-4xl lg:text-[2.8rem] font-light text-white text-center max-w-3xl px-8 leading-tight tracking-wide font-display"
            style={{
              opacity: hookOp,
              filter: `blur(${hookBlur}px)`,
              transform: `translateY(${hookBlur * 0.18}px)`,
              transition: 'filter 0.08s linear, transform 0.08s linear',
            }}>
            The world is built for<br />
            <span style={{ color: 'rgba(255,255,255,0.45)' }}>those who can see it.</span>
          </p>
        </div>

        {/* ═══════════════════════════════════════════
            PERSISTENT CANE LAYER — shown during Acts 1, 2, 3
        ═══════════════════════════════════════════ */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          opacity: phase === 'locked' ? 1 : 0,
          transition: 'opacity 0.7s ease',
        }}>
          {/* Ground line */}
          <div style={{
            position: 'absolute', bottom: 92, left: 0, right: 0, height: 1,
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
          }} />
          {/* Cane */}
          <div style={{ position: 'absolute', bottom: 120, left: '50%', transform: 'translateX(-50%)' }}>
            <CaneIcon sweep={sweepT} />
          </div>
          {/* Barrier (fades in during Act 1) */}
          <div style={{
            position: 'absolute', bottom: 76, left: '50%', transform: 'translateX(-50%)',
            opacity: barrierOp, transition: 'opacity 0.25s',
          }}>
            <GroundBarrier opacity={1} orange={false} />
          </div>
        </div>

        {/* ═══════════════════════════════════════════
            ACT 1 — THE CANE'S LIMIT  (auto-play)
        ═══════════════════════════════════════════ */}
        <div style={panel(1)}>
          {/* Side copy */}
          <div style={{
            position: 'absolute', left: 52, top: '50%', transform: 'translateY(-50%)',
            maxWidth: 210, opacity: caneTextOp, transition: 'opacity 0.25s',
          }}>
            <p style={{ fontSize: 10, fontFamily: 'monospace', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 12 }}>
              The Problem
            </p>
            <p className="text-lg md:text-xl font-light font-display" style={{ color: 'rgba(255,255,255,0.8)', lineHeight: 1.45 }}>
              The white cane<br />maps the ground...
            </p>
          </div>
        </div>

        {/* ═══════════════════════════════════════════
            ACT 2 — THE UNSEEN DANGER  (auto-play)
        ═══════════════════════════════════════════ */}
        <div style={panel(2)}>
          {/* Dashed gap indicator */}
          <div style={{
            position: 'absolute', left: '50%', top: '23%', height: '47%', width: 1,
            borderLeft: '1px dashed rgba(255,255,255,0.12)',
            opacity: overhangOp * 0.6, transition: 'opacity 0.3s',
          }} />
          <div style={{
            position: 'absolute', left: 'calc(50% + 12px)', top: '43%',
            fontSize: 8, fontFamily: 'monospace', color: 'rgba(255,255,255,0.18)',
            letterSpacing: '0.25em', writingMode: 'vertical-rl',
            opacity: overhangOp * 0.5,
          }}>
            UNDETECTED ZONE
          </div>

          {/* Overhang — barely visible, lurking */}
          <div style={{
            position: 'absolute', top: '16%', left: '50%', transform: 'translateX(-50%)',
            opacity: overhangOp, transition: 'opacity 0.5s',
          }}>
            <Overhang orangePulse={false} />
          </div>

          {/* Copy — right side */}
          <div style={{
            position: 'absolute', right: 52, top: '50%', transform: 'translateY(-50%)',
            maxWidth: 220, textAlign: 'right',
            opacity: dangerTextOp, transition: 'opacity 0.25s',
          }}>
            <p className="text-lg md:text-xl font-light font-display" style={{ color: 'rgba(255,255,255,0.8)', lineHeight: 1.5 }}>
              ...but the most dangerous obstacles are the ones you never see coming.
            </p>
          </div>

          {/* Blackout veil — fades in to bridge into Act 3 */}
          <div style={{
            position: 'absolute', inset: 0, background: '#0A0A0A',
            opacity: blackoutOp, pointerEvents: 'none',
          }} />
        </div>

        {/* ═══════════════════════════════════════════
            ACT 3 — THE ILLUMINATION  (auto-play)
        ═══════════════════════════════════════════ */}
        <div style={{ ...panel(3), display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* Sonar rings */}
          <PulseRings progress={pulseP} />

          {/* Orange barrier reveal */}
          <div style={{
            position: 'absolute', bottom: 76, left: '50%', transform: 'translateX(-50%)',
            opacity: orangeOn ? 0.88 : 0.05, transition: 'opacity 0.2s',
          }}>
            <GroundBarrier opacity={1} orange={true} />
          </div>

          {/* Orange overhang reveal */}
          <div style={{
            position: 'absolute', top: '16%', left: '50%', transform: 'translateX(-50%)',
            opacity: orangeOn ? 0.88 : 0.05, transition: 'opacity 0.2s',
          }}>
            <Overhang orangePulse={orangeOn} />
          </div>

          {/* Safe corridor glow */}
          {orangeOn && (
            <div style={{
              position: 'absolute', left: '50%', top: '38%',
              transform: 'translateX(-50%)',
              width: 180, height: '28%',
              background: 'linear-gradient(to bottom, rgba(255,107,0,0.08), rgba(255,107,0,0.03))',
              border: '1px solid rgba(255,107,0,0.15)',
              borderRadius: 4,
              opacity: pulseP * 0.9,
              pointerEvents: 'none',
            }} />
          )}

          {/* Copy */}
          <div style={{
            position: 'absolute', bottom: 44, left: '50%', transform: 'translateX(-50%)',
            textAlign: 'center', whiteSpace: 'nowrap',
            opacity: Math.max(0, illTextOp - illTextOut),
            transition: 'opacity 0.2s',
          }}>
            <p style={{ fontSize: 10, fontFamily: 'monospace', color: 'rgba(255,107,0,0.55)', letterSpacing: '0.3em', marginBottom: 10 }}>
              VANTAGE
            </p>
            <p className="text-xl md:text-2xl font-light font-display" style={{ color: 'rgba(255,255,255,0.85)', letterSpacing: '0.04em' }}>
              We translate the unseen into intuition.
            </p>
          </div>
        </div>

        {/* ═══════════════════════════════════════════
            ACT 4 — THE WORD + CTA  (scroll-driven)
        ═══════════════════════════════════════════ */}
        <div style={{ ...panel(4), display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* Ambient glow */}
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%,-50%)',
            width: 520, height: 320, borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(255,107,0,0.06) 0%, transparent 70%)',
            opacity: l4, pointerEvents: 'none',
          }} />

          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, padding: '0 32px' }}>
            <p className="text-xl md:text-2xl font-light font-display"
              style={{ opacity: l1, transform: `translateY(${(1-l1)*14}px)`, color: 'rgba(255,255,255,0.58)', letterSpacing: '0.03em', transition: 'transform 0.05s' }}>
              The problem was right under our noses,
            </p>
            <p className="text-xl md:text-2xl font-light font-display"
              style={{ opacity: l2, transform: `translateY(${(1-l2)*14}px)`, color: 'rgba(255,255,255,0.82)', letterSpacing: '0.03em', transition: 'transform 0.05s' }}>
              so we built a solution above it.
            </p>

            {/* Orange divider */}
            <div style={{
              width: 88, height: 1, opacity: l3,
              background: 'linear-gradient(90deg, transparent, rgba(255,107,0,0.55), transparent)',
            }} />

            <p className="text-3xl md:text-5xl font-bold font-display"
              style={{ opacity: l3, transform: `translateY(${(1-l3)*10}px)`, color: '#fff', letterSpacing: '-0.02em', transition: 'transform 0.05s' }}>
              Welcome to Vantage.
            </p>
            <p className="text-base md:text-lg font-light"
              style={{ opacity: l4, transform: `translateY(${(1-l4)*8}px)`, color: '#FF8C38', letterSpacing: '0.3em', textTransform: 'uppercase', transition: 'transform 0.05s' }}>
              Navigate with Instinct.
            </p>

            {/* CTA Button */}
            <motion.button
              onClick={() => navigate('/vantage-vo1')}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              style={{ opacity: ctaOp, marginTop: 10, cursor: 'pointer' }}
              className="group flex items-center gap-3 px-8 py-4 rounded-full border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/20 transition-all duration-300 backdrop-blur-sm">
              <span className="text-sm font-medium text-white/75 group-hover:text-white transition-colors duration-300"
                style={{ letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                Meet the Vantage V01
              </span>
              <div className="w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-300"
                style={{ borderColor: 'rgba(255,107,0,0.4)' }}
                onMouseEnter={e => e.currentTarget.style.borderColor='rgba(255,107,0,0.8)'}
                onMouseLeave={e => e.currentTarget.style.borderColor='rgba(255,107,0,0.4)'}>
                <ArrowRight size={13} color="#FF6B00" />
              </div>
            </motion.button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProblemStatement;

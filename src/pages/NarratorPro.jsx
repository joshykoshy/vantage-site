import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Eye, Volume2, Wifi, WifiOff, Server, Cloud, 
  ArrowRight, Play, Pause, CheckCircle, AlertTriangle,
  Download, Monitor, Headphones, Zap, Shield, Code,
  ChevronDown, Terminal, Settings, AudioLines
} from 'lucide-react';

/* ───────────────────────── FAQ Accordion ───────────────────────── */
const FaqItem = ({ q, a, isOpen, onToggle, idx }) => (
  <div className="border-b border-white/[0.06] last:border-b-0">
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between py-5 px-1 text-left group"
    >
      <span className={`text-base font-medium transition-colors ${isOpen ? 'text-vantage-electric' : 'text-white group-hover:text-vantage-electric/80'}`}>
        {q}
      </span>
      <ChevronDown 
        size={18} 
        className={`text-vantage-grey flex-shrink-0 ml-4 transition-transform duration-300 ${isOpen ? 'rotate-180 text-vantage-electric' : ''}`} 
      />
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden"
        >
          <p className="pb-5 px-1 text-[#888] text-sm leading-relaxed">{a}</p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

/* ───────────────────────── Step Card ───────────────────────── */
const StepCard = ({ num, title, desc, icon: Icon, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="relative group"
  >
    <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-white/[0.08] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="relative p-7 rounded-2xl bg-[#0e0e0e] border border-white/[0.06] hover:border-vantage-electric/20 transition-colors duration-500">
      <div className="flex items-start gap-5">
        <div className="w-12 h-12 rounded-xl bg-vantage-electric/10 border border-vantage-electric/20 flex items-center justify-center flex-shrink-0">
          <Icon size={22} className="text-vantage-electric" />
        </div>
        <div>
          <div className="text-[10px] font-mono text-vantage-electric/60 tracking-[0.2em] uppercase mb-1">Step {num}</div>
          <h3 className="text-lg font-bold text-white mb-2 font-display">{title}</h3>
          <p className="text-[#777] text-sm leading-relaxed">{desc}</p>
        </div>
      </div>
    </div>
  </motion.div>
);

/* ───────────────────────── Stat Block ───────────────────────── */
const StatBlock = ({ value, label, delay }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay }}
    className="text-center"
  >
    <div className="text-4xl md:text-5xl font-bold text-white font-display mb-2">{value}</div>
    <div className="text-[#666] text-sm tracking-wide">{label}</div>
  </motion.div>
);

/* ───────────────────────── Architecture Node ───────────────────────── */
const ArchNode = ({ label, sublabel, accent, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay }}
    className={`px-5 py-3 rounded-xl border ${accent ? 'border-vantage-electric/30 bg-vantage-electric/5' : 'border-white/10 bg-white/[0.02]'} text-center`}
  >
    <div className={`text-sm font-semibold ${accent ? 'text-vantage-electric' : 'text-white'}`}>{label}</div>
    {sublabel && <div className="text-[10px] text-[#666] mt-0.5 font-mono">{sublabel}</div>}
  </motion.div>
);

/* ═══════════════════════════════════════════════════════════════ */
/*                       MAIN PAGE COMPONENT                       */
/* ═══════════════════════════════════════════════════════════════ */

const NarratorPro = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const [activeBackend, setActiveBackend] = useState('ollama');

  const faqs = [
    {
      q: 'What AI models does Narrator Pro support?',
      a: 'Out of the box, it supports any Ollama-compatible vision model (LLaVA, BakLLaVA, etc.) running locally, plus cloud models via OpenRouter including GPT-4o Mini, Gemini Flash 1.5, and Claude 3 Haiku. You can configure the model in the extension popup.'
    },
    {
      q: 'Does it work on videos other than YouTube?',
      a: 'The current version is architected specifically for YouTube, handling its SPA navigation, MediaElementSource, and video element selectors. Support for other video platforms is on the roadmap.'
    },
    {
      q: 'How does silence detection work without triggering on ambient sounds?',
      a: 'We use the Web Audio API AnalyserNode to read frequency data at 100ms intervals. The silence threshold is set at -45 dB, which catches true gaps (like scene transitions) without triggering on background music or ambient sound. A hysteresis gap between -45 dB (silence) and -35 dB (resume) prevents oscillation.'
    },
    {
      q: 'Is my video data sent to the cloud?',
      a: 'Only if you choose the OpenRouter backend. With Ollama, everything runs on your local machine — the captured frame never leaves your device. The extension uses captureVisibleTab at the GPU compositor level, entirely bypassing DOM/CORS restrictions.'
    },
    {
      q: 'Can I use my own locally downloaded models like Gemma or DeepSeek?',
      a: 'Yes! Any model served through Ollama that supports vision/image input can be used. Pull the model with `ollama pull <model-name>`, then enter the model name in the extension settings. Note: text-only models like Gemma and DeepSeek Coder cannot describe images — you need a VLM like LLaVA, BakLLaVA, or LLaVA-Llama3.'
    },
  ];

  return (
    <div className="bg-[#050505] w-full min-h-screen font-sans selection:bg-vantage-electric selection:text-black">
      {/* Top glow line */}
      <div className="absolute top-0 left-0 right-0 glow-line z-50 pointer-events-none" />

      {/* ════════════════════ HERO ════════════════════ */}
      <section className="relative min-h-[95vh] flex flex-col items-center justify-center pt-32 pb-28 noise-bg overflow-hidden">
        {/* Ambient glows */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] max-w-[900px] max-h-[900px] bg-vantage-electric opacity-[0.03] rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-cyan-500 opacity-[0.015] rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-5xl mx-auto"
          >
            {/* Badge */}
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 mb-8 px-5 py-2 rounded-full border border-vantage-electric/20 bg-vantage-electric/[0.06] text-vantage-electric text-sm font-medium tracking-wide"
            >
              <Eye size={16} />
              <span>Narrator Pro — Chrome Extension</span>
            </motion.div>

            {/* Headline */}
            <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold text-white mb-8 font-display tracking-tighter leading-[1.05]">
              Silence becomes{' '}
              <span className="text-metallic">sight.</span>
            </h1>

            {/* Subhead */}
            <p className="text-[#a0a0a0] text-lg md:text-xl font-light tracking-wide leading-relaxed mb-14 max-w-3xl mx-auto">
              Narrator Pro listens for silent gaps in YouTube videos, captures the frame via GPU compositor, 
              and whispers a one-sentence visual description through TTS — so you never miss what's on screen.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="relative group bg-white text-black px-8 py-4 rounded-full font-bold tracking-wide shadow-glow-sm overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-vantage-electric/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative flex items-center gap-2">
                  <Download size={20} />
                  Download Extension
                </span>
              </motion.button>
              <motion.a
                href="#architecture"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-8 py-4 rounded-full border border-white/10 text-white/80 hover:border-vantage-electric/30 hover:text-white transition-all duration-300 font-medium"
              >
                <Code size={18} />
                View Architecture
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1.5"
          >
            <div className="w-1 h-2 rounded-full bg-white/40" />
          </motion.div>
        </motion.div>
      </section>

      {/* ════════════════════ STATS BAR ════════════════════ */}
      <section className="py-16 border-y border-white/[0.04] bg-[#080808]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatBlock value="~2.5s" label="Silence detection threshold" delay={0.1} />
            <StatBlock value="−45dB" label="Audio trigger level" delay={0.2} />
            <StatBlock value="<1s" label="TTS interrupt latency" delay={0.3} />
            <StatBlock value="65%" label="JPEG quality (VLM-optimal)" delay={0.4} />
          </div>
        </div>
      </section>

      {/* ════════════════════ HOW IT WORKS ════════════════════ */}
      <section className="py-32 relative bg-[#050505]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 mb-5 text-vantage-electric text-xs font-mono tracking-[0.2em] uppercase"
            >
              <Zap size={14} />
              Pipeline
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-white mb-6 font-display uppercase tracking-tight"
            >
              How Narrator Pro Works
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-[#888] max-w-2xl mx-auto text-lg"
            >
              Four stages, zero user friction. The extension does everything automatically once installed.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
            <StepCard
              num="01"
              title="Audio Tap"
              desc="Connects a Web Audio AnalyserNode to YouTube's <video> element. Reads frequency data at 100ms intervals without modifying playback. Falls back to volume/mute polling if CORS blocks MediaElementSource."
              icon={Headphones}
              delay={0.1}
            />
            <StepCard
              num="02"
              title="Silence Detection"
              desc="When the average spectral energy drops below −45 dB for 2.5 seconds and the cooldown (8s) has elapsed, the extension flags a 'silent gap' — the natural window for description."
              icon={AudioLines}
              delay={0.2}
            />
            <StepCard
              num="03"
              title="Frame Capture"
              desc="The background service worker calls captureVisibleTab() — a privileged API that reads the GPU compositor output, completely bypassing CORS canvas tainting. Returns a 65%-quality JPEG."
              icon={Monitor}
              delay={0.3}
            />
            <StepCard
              num="04"
              title="AI → TTS"
              desc="The frame is sent to your chosen VLM (local Ollama or cloud OpenRouter). The one-sentence response is sanitized and spoken via Web Speech API. If dialogue resumes above −35 dB, TTS is immediately interrupted."
              icon={Volume2}
              delay={0.4}
            />
          </div>
        </div>
      </section>

      {/* ════════════════════ ARCHITECTURE DIAGRAM ════════════════════ */}
      <section id="architecture" className="py-32 bg-[#080808] border-y border-white/[0.04]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-white mb-6 font-display uppercase tracking-tight"
            >
              System Architecture
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-[#888] max-w-2xl mx-auto text-lg"
            >
              Three execution contexts, one seamless pipeline.
            </motion.p>
          </div>

          {/* Architecture Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="p-px rounded-2xl bg-gradient-to-br from-vantage-electric/20 via-transparent to-white/5">
              <div className="bg-[#0a0a0a] rounded-2xl p-8 md:p-12">
                {/* YouTube Tab Context */}
                <div className="mb-10">
                  <div className="text-[10px] font-mono tracking-[0.2em] text-vantage-electric/60 uppercase mb-4">
                    YouTube Tab · Content Script World
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <ArchNode label="<video>" sublabel="html5-main-video" delay={0.1} />
                    <ArchNode label="AudioContext" sublabel="AnalyserNode · FFT" delay={0.15} />
                    <ArchNode label="Silence Detector" sublabel="−45 dB · 2.5s" accent delay={0.2} />
                    <ArchNode label="SpeechSynthesis" sublabel="TTS Output" delay={0.25} />
                  </div>
                </div>

                {/* Arrow down */}
                <div className="flex justify-center mb-8">
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-px h-8 bg-gradient-to-b from-vantage-electric/40 to-vantage-electric/10" />
                    <div className="text-[9px] font-mono text-[#555]">chrome.runtime.sendMessage</div>
                    <div className="w-px h-8 bg-gradient-to-b from-vantage-electric/10 to-vantage-electric/40" />
                  </div>
                </div>

                {/* Background Service Worker */}
                <div className="mb-10">
                  <div className="text-[10px] font-mono tracking-[0.2em] text-vantage-electric/60 uppercase mb-4">
                    Background · Service Worker
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <ArchNode label="captureVisibleTab()" sublabel="GPU Compositor Bypass" accent delay={0.3} />
                    <ArchNode label="JPEG → Base64" sublabel="65% quality · ~50KB" delay={0.35} />
                    <ArchNode label="API Router" sublabel="Ollama | OpenRouter" accent delay={0.4} />
                  </div>
                </div>

                {/* Arrow down */}
                <div className="flex justify-center mb-8">
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-px h-8 bg-gradient-to-b from-vantage-electric/40 to-vantage-electric/10" />
                    <div className="text-[9px] font-mono text-[#555]">fetch() · POST</div>
                    <div className="w-px h-8 bg-gradient-to-b from-vantage-electric/10 to-vantage-electric/40" />
                  </div>
                </div>

                {/* AI Backends */}
                <div>
                  <div className="text-[10px] font-mono tracking-[0.2em] text-vantage-electric/60 uppercase mb-4">
                    AI Backend
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div 
                      onClick={() => setActiveBackend('ollama')}
                      className={`p-5 rounded-xl border cursor-pointer transition-all duration-300 ${activeBackend === 'ollama' ? 'border-vantage-electric/40 bg-vantage-electric/[0.06]' : 'border-white/10 bg-white/[0.02] hover:border-white/20'}`}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <Server size={18} className={activeBackend === 'ollama' ? 'text-vantage-electric' : 'text-[#666]'} />
                        <span className={`font-semibold ${activeBackend === 'ollama' ? 'text-white' : 'text-[#999]'}`}>Ollama · Local</span>
                        {activeBackend === 'ollama' && <span className="ml-auto text-[10px] font-mono text-vantage-electric/70 bg-vantage-electric/10 px-2 py-0.5 rounded">SELECTED</span>}
                      </div>
                      <div className="text-[#666] text-xs leading-relaxed">
                        localhost:11434 · LLaVA, BakLLaVA · Zero latency · Fully private · No API key required
                      </div>
                    </div>
                    <div 
                      onClick={() => setActiveBackend('openrouter')}
                      className={`p-5 rounded-xl border cursor-pointer transition-all duration-300 ${activeBackend === 'openrouter' ? 'border-vantage-electric/40 bg-vantage-electric/[0.06]' : 'border-white/10 bg-white/[0.02] hover:border-white/20'}`}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <Cloud size={18} className={activeBackend === 'openrouter' ? 'text-vantage-electric' : 'text-[#666]'} />
                        <span className={`font-semibold ${activeBackend === 'openrouter' ? 'text-white' : 'text-[#999]'}`}>OpenRouter · Cloud</span>
                        {activeBackend === 'openrouter' && <span className="ml-auto text-[10px] font-mono text-vantage-electric/70 bg-vantage-electric/10 px-2 py-0.5 rounded">SELECTED</span>}
                      </div>
                      <div className="text-[#666] text-xs leading-relaxed">
                        Gemini Flash · GPT-4o Mini · Claude 3 Haiku · Higher fidelity · Requires API key
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════ KEY DECISIONS ════════════════════ */}
      <section className="py-32 bg-[#050505]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-white mb-6 font-display uppercase tracking-tight"
            >
              Critical Design Decisions
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                icon: Shield,
                title: 'captureVisibleTab over Canvas',
                desc: 'YouTube streams video from *.googlevideo.com — a different origin. Drawing cross-origin video onto a canvas taints it permanently. captureVisibleTab operates at the GPU compositing layer, completely bypassing CORS.',
              },
              {
                icon: Zap,
                title: 'Three-Prong SPA Detection',
                desc: 'YouTube uses pushState for navigation. We use three redundant detectors: yt-navigate-finish event, pushState intercept, and MutationObserver for new <video> elements. Intentionally redundant for YouTube A/B variants.',
              },
              {
                icon: AudioLines,
                title: 'Hysteresis Silence Gap',
                desc: 'Silence threshold at −45 dB, resume threshold at −35 dB. The 10 dB gap prevents oscillation where quiet audio triggers a description, then immediately cancels TTS, then re-triggers in a tight loop.',
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative"
              >
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-white/[0.06] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative p-7 rounded-2xl bg-[#0e0e0e] border border-white/[0.06] hover:border-vantage-electric/20 transition-colors duration-500 h-full">
                  <div className="mb-5 inline-flex p-3 rounded-xl bg-white/5 text-vantage-electric border border-white/10 group-hover:bg-vantage-electric/10 transition-colors">
                    <item.icon size={22} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3 font-display">{item.title}</h3>
                  <p className="text-[#777] text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════ INSTALL GUIDE ════════════════════ */}
      <section className="py-32 bg-[#080808] border-y border-white/[0.04]">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            <div className="lg:w-1/2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 mb-5 text-vantage-electric text-xs font-mono tracking-[0.2em] uppercase"
              >
                <Terminal size={14} />
                Installation
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-bold text-white mb-6 font-display uppercase tracking-tight"
              >
                Get Started<br />in 3 Minutes
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-[#888] text-lg leading-relaxed mb-8"
              >
                Load the extension as unpacked in Chrome, start Ollama, and you're narrating.
              </motion.p>

              <div className="space-y-5">
                {[
                  { step: '1', title: 'Load Extension', desc: 'Go to chrome://extensions → Enable Developer Mode → Load Unpacked → Select the vantage-narrator-pro folder.' },
                  { step: '2', title: 'Start Ollama', desc: 'Run `ollama serve` in terminal. Pull a vision model: `ollama pull llava`. The extension connects automatically.' },
                  { step: '3', title: 'Open YouTube', desc: 'Navigate to any YouTube video. The content script auto-attaches. Check DevTools for "[Vantage] Audio pipeline connected".' },
                  { step: '4', title: 'Listen', desc: 'During a silent gap (>2.5s), the extension captures the frame, sends it to AI, and speaks the description. That\'s it.' },
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 + idx * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-sm font-bold text-vantage-electric flex-shrink-0 font-mono">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-1">{item.title}</h4>
                      <p className="text-[#666] text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Terminal-style code preview */}
            <div className="lg:w-1/2 w-full">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="p-px rounded-2xl bg-gradient-to-br from-white/10 to-transparent"
              >
                <div className="bg-[#0a0a0a] rounded-2xl overflow-hidden border border-white/5">
                  {/* Terminal header */}
                  <div className="flex items-center gap-2 px-5 py-3 border-b border-white/[0.06] bg-[#0d0d0d]">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                    <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                    <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                    <span className="ml-3 text-[11px] text-[#666] font-mono">Terminal — zsh</span>
                  </div>
                  {/* Terminal body */}
                  <div className="p-5 font-mono text-sm leading-relaxed">
                    <div className="text-[#888]"><span className="text-vantage-electric">$</span> ollama serve</div>
                    <div className="text-[#555] text-xs mt-1 mb-3">Listening on 127.0.0.1:11434...</div>
                    
                    <div className="text-[#888]"><span className="text-vantage-electric">$</span> ollama pull llava</div>
                    <div className="text-[#555] text-xs mt-1 mb-3">pulling manifest... done ✓</div>
                    
                    <div className="mt-4 pt-4 border-t border-white/[0.06]">
                      <div className="text-[10px] text-[#555] tracking-wider uppercase mb-2">Chrome DevTools Console</div>
                      <div className="text-green-400/80 text-xs">[Vantage Narrator Pro] Initialising...</div>
                      <div className="text-green-400/80 text-xs">[Vantage] Audio pipeline connected via MediaElementSource.</div>
                      <div className="text-yellow-400/70 text-xs mt-1">[Vantage] Silence threshold met — requesting AI description.</div>
                      <div className="text-cyan-400/80 text-xs mt-1">[Vantage] TTS → "A woman in a red dress walks through a dimly lit corridor."</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════ LOCAL MODELS GUIDE ════════════════════ */}
      <section className="py-32 bg-[#050505]">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 mb-5 text-vantage-electric text-xs font-mono tracking-[0.2em] uppercase"
            >
              <Settings size={14} />
              Local AI
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-white mb-6 font-display uppercase tracking-tight"
            >
              Using Your Own Models
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-[#888] max-w-2xl mx-auto text-lg"
            >
              You have Gemma and DeepSeek Coder installed locally — here's how to use vision models with Narrator Pro.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-px rounded-2xl bg-gradient-to-br from-vantage-electric/20 via-transparent to-white/5"
          >
            <div className="bg-[#0a0a0a] rounded-2xl p-8">
              {/* Important note */}
              <div className="mb-8 p-5 rounded-xl bg-yellow-400/[0.04] border border-yellow-400/20">
                <div className="flex items-start gap-3">
                  <AlertTriangle size={18} className="text-yellow-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-yellow-400 font-semibold text-sm mb-1">Important: Vision Models Required</h4>
                    <p className="text-[#999] text-sm leading-relaxed">
                      Gemma and DeepSeek Coder are <strong className="text-white">text-only</strong> models — they cannot process images. 
                      Narrator Pro requires a <strong className="text-white">Vision-Language Model (VLM)</strong> that can understand image input.
                    </p>
                  </div>
                </div>
              </div>

              {/* Model table */}
              <h3 className="text-white font-bold mb-4 font-display">Compatible Vision Models for Ollama</h3>
              <div className="overflow-x-auto mb-8">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-3 px-4 text-[#666] font-medium text-xs uppercase tracking-wider">Model</th>
                      <th className="text-left py-3 px-4 text-[#666] font-medium text-xs uppercase tracking-wider">Size</th>
                      <th className="text-left py-3 px-4 text-[#666] font-medium text-xs uppercase tracking-wider">Speed</th>
                      <th className="text-left py-3 px-4 text-[#666] font-medium text-xs uppercase tracking-wider">Command</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: 'LLaVA 1.6', size: '4.7 GB', speed: 'Fast', cmd: 'ollama pull llava', rec: true },
                      { name: 'BakLLaVA', size: '4.7 GB', speed: 'Fast', cmd: 'ollama pull bakllava' },
                      { name: 'LLaVA-Llama3', size: '5.5 GB', speed: 'Medium', cmd: 'ollama pull llava-llama3' },
                      { name: 'LLaVA 34B', size: '20 GB', speed: 'Slow', cmd: 'ollama pull llava:34b' },
                    ].map((m, i) => (
                      <tr key={i} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                        <td className="py-3 px-4 text-white font-medium">
                          {m.name}
                          {m.rec && <span className="ml-2 text-[9px] font-mono bg-vantage-electric/10 text-vantage-electric px-1.5 py-0.5 rounded">RECOMMENDED</span>}
                        </td>
                        <td className="py-3 px-4 text-[#999]">{m.size}</td>
                        <td className="py-3 px-4 text-[#999]">{m.speed}</td>
                        <td className="py-3 px-4 font-mono text-xs text-vantage-electric/70">{m.cmd}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Quick setup */}
              <div className="p-5 rounded-xl bg-[#0d0d0d] border border-white/[0.06] font-mono text-sm">
                <div className="text-[10px] text-[#555] tracking-wider uppercase mb-3">Quick Setup</div>
                <div className="space-y-1.5 text-[#888]">
                  <div><span className="text-vantage-electric">$</span> ollama pull llava <span className="text-[#555]"># download the recommended VLM</span></div>
                  <div><span className="text-vantage-electric">$</span> ollama serve <span className="text-[#555]"># start the local server</span></div>
                  <div className="text-[#555] text-xs pt-2">Then open the extension popup → set model to "llava" → Save</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════ FAQ ════════════════════ */}
      <section className="py-32 bg-[#080808] border-y border-white/[0.04]">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-white mb-6 font-display uppercase tracking-tight"
            >
              FAQ
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-6 md:p-8 rounded-2xl bg-[#0e0e0e] border border-white/[0.06]"
          >
            {faqs.map((faq, idx) => (
              <FaqItem
                key={idx}
                q={faq.q}
                a={faq.a}
                idx={idx}
                isOpen={openFaq === idx}
                onToggle={() => setOpenFaq(openFaq === idx ? null : idx)}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════════════════ CTA ════════════════════ */}
      <section className="py-32 bg-[#050505] relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] bg-vantage-electric opacity-[0.03] rounded-full blur-[120px] pointer-events-none" />
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-display tracking-tight">
              Ready to give YouTube videos a voice?
            </h2>
            <p className="text-[#888] text-lg mb-10">
              Download the extension, pull LLaVA, and experience the web the way everyone deserves to.
            </p>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="relative group bg-white text-black px-10 py-5 rounded-full font-bold text-lg tracking-wide shadow-glow overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-vantage-electric/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="relative flex items-center gap-3">
                <Download size={22} />
                Download Narrator Pro
              </span>
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default NarratorPro;

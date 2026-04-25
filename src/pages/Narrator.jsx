import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Video, Image as ImageIcon, Layout, Code, Activity, Building, User } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, desc, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay }}
        className="group relative p-8 glass-dark rounded-2xl border border-white/5 hover:border-vantage-electric/30 transition-colors duration-500 overflow-hidden"
    >
        <div className="absolute inset-0 bg-gradient-to-br from-vantage-electric/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative z-10">
            <div className="mb-6 inline-flex p-3 rounded-xl bg-white/5 text-vantage-electric border border-white/10 group-hover:bg-vantage-electric/10 transition-colors">
                <Icon size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3 font-display">{title}</h3>
            <p className="text-[#999999] leading-relaxed font-light">{desc}</p>
        </div>
    </motion.div>
);

const Narrator = () => {
    return (
        <div className="bg-[#050505] w-full min-h-screen font-sans selection:bg-vantage-electric selection:text-black">
            {/* Top glow */}
            <div className="absolute top-0 left-0 right-0 glow-line z-50 pointer-events-none" />

            {/* Hero Section */}
            <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-32 pb-24 noise-bg overflow-hidden">
                {/* Background effects */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] md:w-[800px] md:h-[800px] bg-vantage-electric opacity-[0.03] rounded-full blur-[100px] pointer-events-none" />
                
                <div className="container mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="text-center max-w-4xl mx-auto"
                    >
                        <div className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full border border-vantage-electric/20 bg-vantage-electric/5 text-vantage-electric text-sm font-medium tracking-wide">
                            <Eye size={16} />
                            <span>Browser Extension MVP</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 font-display tracking-tighter leading-tight">
                            Giving your screen reader <span className="text-metallic">eyes.</span>
                        </h1>
                        <p className="text-[#a0a0a0] text-xl md:text-2xl font-light tracking-wide leading-relaxed mb-12">
                            Current screen readers are literal. They only see broken code. <br className="hidden md:block" />
                            The Vantage Narrator uses Vision-Language Models to visually "look" at the screen and generate rich spatial context in real-time.
                        </p>
                        <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-white text-black px-8 py-4 rounded-full font-bold tracking-wide hover:bg-gray-200 transition-colors shadow-glow-sm"
                        >
                            <span className="flex items-center gap-2">
                                <Activity size={20} />
                                Install MVP Extension
                            </span>
                        </motion.button>
                    </motion.div>
                </div>
            </section>

            {/* Core Features */}
            <section className="py-32 relative bg-vantage-black">
                <div className="container mx-auto px-6">
                    <div className="mb-20 text-center">
                        <motion.h2 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-bold text-white mb-6 font-display uppercase tracking-tight"
                        >
                            The Three Pillars
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-[#999999] max-w-2xl mx-auto text-lg"
                        >
                            Shifting the burden of accessibility away from lazy content creators and directly into the hands of the visually impaired user.
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                        <FeatureCard 
                            icon={Video}
                            title="Video Auto-Describer"
                            desc="Monitors for audio drops (silence) in videos. Grabs frames, sends to fast VLMs (GPT-4o-mini), and uses TTS to whisper visual action: 'A man in a dark coat cautiously opens the door.'"
                            delay={0.2}
                        />
                        <FeatureCard 
                            icon={ImageIcon}
                            title="'True Image' Generator"
                            desc="Intercepts images missing alt-text. Generates a rich description in real-time instead of a file name. Replaces 'Graphic 4' with 'Photograph of a crowded street illuminated by neon signs.'"
                            delay={0.3}
                        />
                        <FeatureCard 
                            icon={Layout}
                            title="Spatial Summarizer"
                            desc="Sighted users see structure instantly. Screen readers tab linearly. Hit Alt+S to take a full-page snapshot and summarize layout: 'Search is top. Content is a grid. Tab 15 times to skip filters.'"
                            delay={0.4}
                        />
                    </div>
                </div>
            </section>

            {/* Architecture / How to Vibecode this MVP */}
            <section className="py-32 bg-[#050505] border-y border-white/[0.03]">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col lg:flex-row gap-16 items-center">
                        <div className="lg:w-1/2">
                            <motion.h2 
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="text-4xl md:text-5xl font-bold text-white mb-8 font-display tracking-tight uppercase"
                            >
                                vibecoding <br/> The mvp
                            </motion.h2>
                            <motion.p 
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="text-[#999999] text-lg font-light leading-relaxed mb-6"
                            >
                                Our prototype architecture bridges the gap instantly:
                            </motion.p>
                            
                            <div className="space-y-6">
                                {[
                                    { step: '1', title: 'Manifest & Permissions', desc: 'Secure activeTab permissions and code injection via Manifest V3.' },
                                    { step: '2', title: 'DOM Interceptor', desc: 'Background script scans for <img> tags missing alt-text and playing <video> tags.' },
                                    { step: '3', title: 'VLM API Bridge', desc: 'Converts target elements to base64, instantly pinging the Vantage backend.' },
                                    { step: '4', title: 'Native TTS Engine', desc: 'Uses window.speechSynthesis to read AI-generated context locally, with zero latency.' }
                                ].map((item, idx) => (
                                    <motion.div 
                                        key={idx}
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.2 + (idx * 0.1) }}
                                        className="flex gap-4"
                                    >
                                        <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-sm font-bold text-vantage-electric flex-shrink-0">
                                            {item.step}
                                        </div>
                                        <div>
                                            <h4 className="text-white font-medium mb-1">{item.title}</h4>
                                            <p className="text-[#666666] text-sm">{item.desc}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                        
                        {/* Decorative Code Panel */}
                        <div className="lg:w-1/2 w-full">
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="p-1 rounded-2xl bg-gradient-to-br from-white/10 to-transparent"
                            >
                                <div className="bg-[#0a0a0a] rounded-xl p-6 h-full border border-white/5 font-mono text-sm">
                                    <div className="flex gap-2 items-center mb-6 border-b border-white/10 pb-4">
                                        <Code size={16} className="text-[#666]" />
                                        <span className="text-[#999]">background.js</span>
                                    </div>
                                    <pre className="text-left overflow-x-auto text-[#a0a0a0] leading-relaxed">
 <span className="text-blue-400">const</span> observeVideo = <span className="text-yellow-300">()</span> <span className="text-blue-400">=&gt;</span> {'{'}
    <span className="text-blue-400">const</span> video = document.<span className="text-green-300">querySelector</span>('video');
    <span className="text-pink-400">if</span> (!video) <span className="text-pink-400">return</span>;
    
    <span className="text-[#666] italic">// Listen for silent gaps</span>
    audioContext.<span className="text-green-300">onSilence</span>(<span className="text-yellow-300">()</span> <span className="text-blue-400">=&gt;</span> {'{'}
        <span className="text-blue-400">const</span> frame = <span className="text-green-300">captureFrame</span>(video);
        
        <span className="text-blue-400">await</span> <span className="text-green-300">fetch</span>('/api/vantage-vision', {'{'}
            method: <span className="text-orange-300">'POST'</span>,
            body: <span className="text-green-300">JSON.stringify</span>({'{'} image: frame {'}'})
        {'}'}).<span className="text-green-300">then</span>(res <span className="text-blue-400">=&gt;</span> {'{'}
            <span className="text-[#666] italic">// Read response locally</span>
            voiceEngine.<span className="text-green-300">speak</span>(res.description);
        {'}'});
    {'}'});
 {'}'};
                                    </pre>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* The Business Angle */}
            <section className="py-32 relative bg-vantage-black overflow-hidden">
                <div className="container mx-auto px-6 relative z-10">
                    <div className="text-center mb-16">
                        <motion.h2 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-bold text-white mb-6 font-display uppercase tracking-tight"
                        >
                            The Ecosystem Model
                        </motion.h2>
                        <p className="text-[#999999] max-w-2xl mx-auto text-lg">
                            Building a holistic accessibility portfolio, monetizing pure VLM value.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="p-8 glass-dark rounded-3xl border border-white/5 flex flex-col items-start"
                        >
                            <div className="p-3 bg-white/5 rounded-xl border border-white/10 mb-6 font-bold text-white/80">
                                <User className="text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2 font-display">B2C Users</h3>
                            <div className="font-mono text-vantage-electric mb-6 text-sm">Free Basic / $5 Premium</div>
                            <p className="text-[#999999] leading-relaxed mb-8 flex-grow">
                                Basic image auto-describing completely free. A small $5/mo subscription unlocks the advanced "Video Narrator" capability to offset vision API scaling costs.
                            </p>
                            <ul className="space-y-3 mb-8 w-full">
                                <li className="flex gap-2 text-sm text-[#cccccc]"><div className="text-vantage-electric">✓</div> True Image Parsing</li>
                                <li className="flex gap-2 text-sm text-[#cccccc]"><div className="text-vantage-electric">✓</div> Spatial Summary</li>
                                <li className="flex gap-2 text-sm text-[#cccccc]"><div className="text-vantage-electric">✓</div> Video Nano-Narration (Premium)</li>
                            </ul>
                            <button className="w-full py-3 rounded-full border border-white/10 hover:bg-white flex justify-center items-center gap-2 hover:text-black transition-colors font-medium">
                                View Plans
                            </button>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="p-8 bg-gradient-to-b from-[#0a0f12] to-[#050505] rounded-3xl border border-vantage-electric/20 flex flex-col items-start relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-vantage-electric/10 blur-[50px] pointer-events-none" />
                            <div className="p-3 bg-vantage-electric/10 rounded-xl border border-vantage-electric/20 mb-6 font-bold text-vantage-electric">
                                <Building />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2 font-display">B2B Enterprise</h3>
                            <div className="font-mono text-vantage-electric mb-6 text-sm">Vantage WebSight API</div>
                            <p className="text-[#999999] leading-relaxed mb-8 flex-grow">
                                The extension flags sites with high accessibility failures (e.g., 500 missing alt-tags). We use that audit to pitch the Enterprise API, automatically fixing their code globally.
                            </p>
                            <ul className="space-y-3 mb-8 w-full">
                                <li className="flex gap-2 text-sm text-[#cccccc]"><div className="text-vantage-electric">✓</div> Global DOM Patching</li>
                                <li className="flex gap-2 text-sm text-[#cccccc]"><div className="text-vantage-electric">✓</div> Automated Compliance</li>
                                <li className="flex gap-2 text-sm text-[#cccccc]"><div className="text-vantage-electric">✓</div> Dedicated Account Support</li>
                            </ul>
                            <button className="w-full py-3 rounded-full bg-vantage-electric text-black font-bold hover:shadow-glow-sm transition-all flex justify-center items-center gap-2">
                                License API
                            </button>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Narrator;

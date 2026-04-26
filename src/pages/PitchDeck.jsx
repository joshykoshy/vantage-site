import React from 'react';
import { motion } from 'framer-motion';

const PitchDeck = () => {
  return (
    <div className="pt-32 pb-20 min-h-screen bg-vantage-black">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-block border border-vantage-electric/30 bg-vantage-electric/5 rounded-full px-4 py-1.5 mb-6 backdrop-blur-md">
            <span className="text-vantage-electric text-xs font-bold tracking-[0.2em] uppercase">Red Bull Basement</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-display text-white mb-6">
            Team Vantage Pitch
          </h1>
          <p className="text-vantage-grey text-lg max-w-2xl mx-auto">
            Interactive presentation optimized for the Red Bull Basement competition. Use the arrows to navigate through our vision.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full relative glass-panel p-2 rounded-xl border border-white/10 shadow-2xl"
        >
          {/* Canva Embed Code */}
          <div style={{ position: 'relative', width: '100%', height: 0, paddingTop: '56.25%', paddingBottom: 0, overflow: 'hidden', borderRadius: '8px', willChange: 'transform' }}>
            <iframe 
              loading="lazy" 
              style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, border: 'none', padding: 0, margin: 0 }}
              src="https://www.canva.com/design/DAHBpiXRLtQ/n8MsswAnaSNq6LvGszvkig/view?embed" 
              allowFullScreen={true} 
              allow="fullscreen">
            </iframe>
          </div>
        </motion.div>
        
        <div className="text-center mt-6">
          <a href="https://www.canva.com/design/DAHBpiXRLtQ/n8MsswAnaSNq6LvGszvkig/view?utm_content=DAHBpiXRLtQ&utm_campaign=designshare&utm_medium=embeds&utm_source=link" target="_blank" rel="noopener noreferrer" className="text-vantage-grey hover:text-white transition-colors text-sm flex items-center justify-center gap-2">
            <span>View full screen on Canva</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default PitchDeck;

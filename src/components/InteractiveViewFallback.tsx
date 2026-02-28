import React from 'react';
import { motion } from 'motion/react';
import { Info, ArrowRight } from 'lucide-react';
import { Product } from '@/src/types';

interface InteractiveViewFallbackProps {
  product: Product;
  onRequestQuote: () => void;
  onViewGallery: () => void;
}

export const InteractiveViewFallback: React.FC<InteractiveViewFallbackProps> = ({ 
  product, 
  onRequestQuote, 
  onViewGallery 
}) => {
  const fallbackImage = product.gallery?.[0] || product.image;

  return (
    <div className="w-full h-full relative rounded-2xl overflow-hidden border border-white/5 flex items-center justify-center group">
      {/* Blurred Background */}
      <motion.div 
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.3 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <img 
          src={fallbackImage} 
          alt={product.name}
          className="w-full h-full object-cover blur-xl scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0C]/40 via-transparent to-[#0B0B0C]/80" />
      </motion.div>

      {/* Glass Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
        className="relative z-10 max-w-sm mx-auto p-8 sm:p-10 glass-panel rounded-3xl border border-white/10 text-center backdrop-blur-2xl shadow-2xl"
      >
        <div className="mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-accent/10 border border-brand-accent/20">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
          <span className="text-[9px] uppercase tracking-[0.2em] text-brand-accent font-bold">Coming Soon</span>
        </div>

        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6 border border-white/10">
          <Info className="text-brand-accent" size={24} />
        </div>

        <h3 className="text-2xl sm:text-3xl font-serif mb-4 tracking-tight">Interactive View</h3>
        <p className="text-brand-muted text-sm leading-relaxed mb-10 px-4">
          The 3D architectural study for this piece is currently in development.
        </p>

        <div className="flex flex-col gap-3">
          <button 
            onClick={onRequestQuote}
            className="w-full bg-brand-ink text-brand-bg py-4 rounded-full uppercase tracking-widest text-[10px] font-bold hover:bg-brand-accent transition-all duration-300 shadow-lg"
          >
            Request Quote
          </button>
          <button 
            onClick={onViewGallery}
            className="w-full border border-white/10 py-4 rounded-full uppercase tracking-widest text-[10px] font-bold hover:bg-white/5 transition-all duration-300 flex items-center justify-center gap-2 group/btn"
          >
            View Gallery
            <ArrowRight size={12} className="group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};

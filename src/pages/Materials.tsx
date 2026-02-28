import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { MATERIALS } from '@/src/types';

const MaterialSection = ({ material, index }: { material: any, index: number }) => {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <motion.section 
      ref={ref}
      style={{ opacity }}
      className="min-h-screen flex flex-col justify-center py-32 relative"
    >
      <div className={`grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
        
        {/* Image Container */}
        <div className={`lg:col-span-7 relative group ${index % 2 !== 0 ? 'lg:order-2' : ''}`}>
          <motion.div 
            style={{ y }}
            className="relative aspect-[4/5] md:aspect-[16/10] overflow-hidden rounded-xl shadow-2xl border border-white/5"
          >
            <img 
              src={material.image} 
              alt={material.name}
              className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-[2s] ease-out"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-brand-bg/10 group-hover:bg-transparent transition-colors duration-700" />
          </motion.div>
          
          {/* Floating Label */}
          <div className={`absolute -bottom-8 ${index % 2 === 0 ? '-right-8' : '-left-8'} hidden md:block`}>
            <div className="glass-panel p-8 rounded-xl backdrop-blur-xl border-white/5">
              <span className="micro-label text-brand-accent">Origin</span>
              <p className="text-xs tracking-widest uppercase mt-1">Authentic Sourcing</p>
            </div>
          </div>
        </div>

        {/* Text Content */}
        <div className={`lg:col-span-5 space-y-8 md:space-y-12 ${index % 2 !== 0 ? 'lg:order-1 lg:text-right' : ''}`}>
          <div className="space-y-4 md:space-y-6">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="micro-label text-brand-accent tracking-[0.4em]"
            >
              Study No. {String(index + 1).padStart(2, '0')}
            </motion.span>
            <h2 className="text-4xl sm:text-6xl md:text-8xl leading-none">{material.name}</h2>
            <p className="text-lg md:text-2xl text-brand-muted leading-relaxed font-serif italic">
              {material.description}
            </p>
          </div>

          <div className={`grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12 pt-8 md:pt-12 border-t border-white/10 ${index % 2 !== 0 ? 'sm:justify-items-end' : ''}`}>
            <div className={index % 2 !== 0 ? 'text-right' : ''}>
              <h4 className="micro-label mb-3 text-brand-accent">Application</h4>
              <p className="text-[10px] sm:text-sm tracking-wide leading-relaxed uppercase">{material.usage}</p>
            </div>
            <div className={index % 2 !== 0 ? 'text-right' : ''}>
              <h4 className="micro-label mb-3 text-brand-accent">Curation Notes</h4>
              <p className="text-[10px] sm:text-sm text-brand-muted leading-relaxed italic">{material.notes}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export const Materials = () => {
  return (
    <div className="bg-brand-bg text-brand-ink">
      {/* Hero Header */}
      <section className="h-[60vh] sm:h-[80vh] flex flex-col items-center justify-center px-6 sm:px-8 text-center relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
          className="z-10"
        >
          <span className="micro-label tracking-[0.5em] mb-6 block">The Soul of Form</span>
          <h1 className="text-5xl sm:text-7xl md:text-[10vw] leading-none mb-6 sm:mb-8 tracking-tighter">MATERIALS</h1>
          <p className="max-w-2xl mx-auto text-brand-muted text-base sm:text-lg md:text-xl leading-relaxed font-serif italic px-4">
            "We do not impose form upon matter; we listen to the silence within the stone, the grain within the oak, and the warmth within the hide."
          </p>
        </motion.div>
        
        {/* Background Decorative Element */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[1px] bg-gradient-to-r from-transparent via-brand-accent to-transparent rotate-12" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[1px] bg-gradient-to-r from-transparent via-brand-accent to-transparent -rotate-12" />
        </div>
      </section>

      {/* Material List */}
      <div className="px-8 md:px-16 max-w-screen-2xl mx-auto">
        {MATERIALS.map((material, i) => (
          <MaterialSection key={material.id} material={material} index={i} />
        ))}
      </div>

      {/* Footer CTA */}
      <section className="py-48 px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto space-y-12"
        >
          <h2 className="text-4xl md:text-6xl">Request a Material Sample Kit</h2>
          <p className="text-brand-muted text-lg">
            Experience the tactile reality of LUMÉRA. Our curated sample kits are available for architects and interior designers.
          </p>
          <button className="bg-brand-ink text-brand-bg px-12 py-5 rounded-full uppercase tracking-widest text-xs font-bold hover:bg-brand-accent transition-all duration-500 hover:scale-105">
            Order Sample Kit
          </button>
        </motion.div>
      </section>
    </div>
  );
};

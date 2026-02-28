import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { PRODUCTS, MATERIALS, Collection } from '@/src/types';
import collectionsData from '../data/collections.json';
const collections = collectionsData as Collection[];
import { ArrowRight, Maximize2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import stories from '../data/stories.json';

export const Home = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative">
      {/* Hero Section - Cinematic Video */}
      <section className="relative h-[100svh] w-full overflow-hidden bg-black">
        {/* Video Background */}
        <video
          className="absolute inset-0 w-full h-full object-cover object-center z-0 select-none pointer-events-none"
          src="/videos/hero.MP4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          tabIndex={-1}
          aria-hidden="true"
          poster=""
          style={{ backgroundColor: '#000', display: 'block' }}
          onContextMenu={e => e.preventDefault()}
        />
        {/* Black overlay */}
        <div className="absolute inset-0 bg-black/60 z-10 pointer-events-none" />
        {/* Gradient overlay */}
        <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-t from-black via-black/40 to-transparent" />
        {/* Centered Typography */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="relative z-30 flex flex-col items-center justify-center h-full text-center px-6"
        >
          <span className="micro-label mb-4 block text-white">Contemporary Italian Design</span>
          <h1 className="text-5xl sm:text-7xl md:text-9xl mb-6 tracking-[0.2em] text-white">LUMÉRA</h1>
          <p className="text-base md:text-xl font-serif italic text-white/80 tracking-wide mb-2">
            “Form in Silence.”
          </p>
        </motion.div>
        {/* Bottom Scroll Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-30"
        >
          <span className="micro-label text-[8px] text-white/80">Scroll to explore</span>
          <div className="w-px h-12 bg-white/20 relative overflow-hidden">
            <motion.div
              animate={{ y: [0, 48] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="absolute top-0 left-0 w-full h-1/2 bg-brand-accent"
            />
          </div>
        </motion.div>
      </section>

      {/* Editorial Full-Width Section */}
      <section className="relative h-[80vh] w-full overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img 
            src={collections[0].heroImage} 
            alt="Milan Interior"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-[#0B0B0C]/40" />
        </motion.div>
        <div className="relative h-full flex items-center justify-center text-center px-8">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="text-4xl md:text-6xl font-serif italic tracking-wider"
          >
            “Designed by Light.”
          </motion.h2>
        </div>
      </section>

      {/* Split Layout Section */}
      <section className="py-32 px-8 md:px-16 max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative aspect-[4/5] overflow-hidden rounded-2xl"
          >
            <img 
              src={collections[0].heroImage} 
              alt={collections[0].title}
              className="object-cover w-full h-full hover:scale-105 transition-transform duration-[2s]"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="space-y-8"
          >
            <span className="micro-label">Featured Collection</span>
            <h2 className="text-5xl md:text-6xl">{collections[0].title}</h2>
            <p className="text-brand-muted leading-relaxed text-lg max-w-md">
              {collections[0].description}
            </p>
            <Link to="/collections" className="inline-flex items-center gap-4 group text-brand-accent uppercase tracking-widest text-xs font-medium">
              Explore Collection
              <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-32 bg-[#F3F1EE]/[0.02]">
        <div className="px-8 md:px-16 max-w-screen-2xl mx-auto">
          <div className="flex justify-between items-end mb-16">
            <div>
              <span className="micro-label">Selected Works</span>
              <h2 className="text-4xl md:text-5xl mt-2">The Archive</h2>
            </div>
            <Link to="/products" className="nav-link border-b border-brand-accent/30 pb-1">View All</Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PRODUCTS.slice(0, 3).map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="group cursor-pointer"
              >
                <Link to={`/products/${product.id}`}>
                  <div className="relative aspect-[3/4] overflow-hidden rounded-xl mb-6">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl mb-1">{product.name}</h3>
                      <span className="micro-label text-[9px]">{product.category}</span>
                    </div>
                    <span className="text-brand-accent font-light">{product.price}</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AR Section */}
      <section className="py-32 px-8 md:px-16 max-w-screen-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass-panel p-16 rounded-3xl relative overflow-hidden"
        >
          <div className="relative z-10 max-w-2xl mx-auto space-y-8">
            <Maximize2 className="mx-auto text-brand-accent mb-4" size={48} />
            <h2 className="text-4xl md:text-5xl">Augmented Reality</h2>
            <p className="text-brand-muted text-lg">
              Experience LUMÉRA in your own space. Our AR technology allows you to visualize our sculptural pieces with millimeter precision, ensuring perfect harmony with your environment.
            </p>
            <Link to="/contact" className="inline-block bg-brand-ink text-brand-bg px-10 py-4 rounded-full uppercase tracking-widest text-xs font-bold hover:bg-brand-accent transition-colors">
              Request AR Demo
            </Link>
          </div>
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-accent rounded-full blur-[120px]" />
          </div>
        </motion.div>
      </section>

      {/* Journal Section */}
      <section className="py-32 px-8 md:px-16 max-w-screen-2xl mx-auto">
        <div className="flex justify-between items-end mb-16">
          <div>
            <span className="micro-label">Editorial</span>
            <h2 className="text-4xl md:text-5xl mt-2">The Journal</h2>
          </div>
          <Link to="/journal" className="nav-link border-b border-brand-accent/30 pb-1">View All Stories</Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {stories.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="group cursor-pointer"
            >
              <Link to={`/journal/${post.id}`} className="block">
                <div className="relative aspect-[16/9] overflow-hidden rounded-2xl mb-8">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="space-y-4">
                  <span className="micro-label">{post.date}</span>
                  <h3 className="text-3xl group-hover:text-brand-accent transition-colors">{post.title}</h3>
                  <p className="text-brand-muted leading-relaxed max-w-lg">{post.excerpt}</p>
                  <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-medium pt-4 group-hover:gap-4 transition-all text-brand-accent">
                    Read Story
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
      {/* Press Section */}
      <section className="py-32 px-8 md:px-16 max-w-screen-2xl mx-auto border-t border-white/5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 items-center opacity-40 hover:opacity-100 transition-opacity duration-700">
          <div className="text-center">
            <span className="micro-label mb-4 block">AD Digest</span>
            <p className="font-serif italic text-lg">"The future of Italian minimalism."</p>
          </div>
          <div className="text-center">
            <span className="micro-label mb-4 block">Vogue Living</span>
            <p className="font-serif italic text-lg">"Sculptural furniture for the soul."</p>
          </div>
          <div className="text-center">
            <span className="micro-label mb-4 block">Wallpaper*</span>
            <p className="font-serif italic text-lg">"Architectural rigor meets comfort."</p>
          </div>
          <div className="text-center">
            <span className="micro-label mb-4 block">Elle Decor</span>
            <p className="font-serif italic text-lg">"A masterclass in silence."</p>
          </div>
        </div>
      </section>
    </div>
  );
};

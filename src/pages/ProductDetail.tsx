import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { PRODUCTS } from '@/src/types';
import { ProductViewer } from '@/src/components/ThreeScene';
import { RequestQuoteModal } from '@/src/components/RequestQuoteModal';
import { InteractiveViewFallback } from '@/src/components/InteractiveViewFallback';
import { Maximize2, ArrowLeft, Share2, Ruler, Info } from 'lucide-react';


export const ProductDetail = () => {
  const { id } = useParams();
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'ar' | 'images'>('images');
  const product = PRODUCTS.find(p => p.id === id);

  const scrollToGallery = () => {
    const gallerySection = document.getElementById('product-gallery');
    if (gallerySection) {
      gallerySection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!product) return <div className="pt-40 text-center">Product not found</div>;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pt-24 pb-24 sm:pt-32 sm:pb-32 px-6 sm:px-8 md:px-16 max-w-screen-2xl mx-auto relative"
    >
      {/* Cinematic Overlay Fade */}
      <motion.div 
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
        className="fixed inset-0 bg-[#0B0B0C] z-[100] pointer-events-none"
      />

      <Link to="/products" className="inline-flex items-center gap-2 text-brand-muted hover:text-brand-ink mb-8 sm:mb-12 transition-colors">
        <ArrowLeft size={16} />
        <span className="micro-label">Back to Archive</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-32">
        {/* Left: AR/Images Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className="h-[350px] sm:h-[500px] lg:h-[700px] relative flex flex-col"
        >
          {/* Toggle Tabs */}
          <div className="flex gap-2 mb-4">
            {product.arEnabled && (
              <button
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-colors ${viewMode === 'ar' ? 'bg-brand-accent text-black' : 'bg-white/10 text-white/80 hover:bg-white/20'}`}
                onClick={() => setViewMode('ar')}
              >
                AR View
              </button>
            )}
            <button
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-colors ${viewMode === 'images' ? 'bg-brand-accent text-black' : 'bg-white/10 text-white/80 hover:bg-white/20'}`}
              onClick={() => setViewMode('images')}
            >
              Images
            </button>
          </div>
          {/* Content */}
          <div className="flex-1 relative">
            {viewMode === 'ar' && product.modelUrl ? (
              <ProductViewer modelUrl={product.modelUrl} />
            ) : viewMode === 'ar' && !product.modelUrl ? (
              <InteractiveViewFallback 
                product={product} 
                onRequestQuote={() => setIsQuoteOpen(true)}
                onViewGallery={scrollToGallery}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-[#F3F1EE]/5 rounded-2xl overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="object-contain max-h-full max-w-full"
                  referrerPolicy="no-referrer"
                />
              </div>
            )}
            <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 flex gap-3 sm:gap-4">
              <button className="w-10 h-10 sm:w-12 sm:h-12 rounded-full glass-panel flex items-center justify-center hover:bg-white/10 transition-colors">
                <Maximize2 size={18} />
              </button>
              <button className="w-10 h-10 sm:w-12 sm:h-12 rounded-full glass-panel flex items-center justify-center hover:bg-white/10 transition-colors">
                <Share2 size={18} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Right: Info */}
        <div className="flex flex-col">
          {/* Title Section (Stagger 1) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="mb-8 sm:mb-12"
          >
            <span className="micro-label text-brand-accent mb-2 block">{product.collection} Collection</span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl mb-4 leading-tight">{product.name}</h1>
            <p className="text-xl sm:text-2xl font-light text-brand-muted">{product.price}</p>
          </motion.div>

          {/* Details Section (Stagger 3) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="space-y-6 sm:space-y-8 mb-12 sm:mb-16"
          >
            <p className="text-base sm:text-lg leading-relaxed text-brand-muted">
              {product.description}
            </p>
            
            <div className="flex flex-col gap-4 sm:gap-6">
              <div className="flex items-start gap-4 p-5 sm:p-6 glass-panel rounded-2xl">
                <Ruler className="text-brand-accent shrink-0" size={20} />
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest font-bold mb-1">Dimensions</h4>
                  <p className="text-xs sm:text-sm text-brand-muted">{product.dimensions}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 sm:p-6 glass-panel rounded-2xl">
                <Info className="text-brand-accent shrink-0" size={20} />
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest font-bold mb-1">Materials</h4>
                  <p className="text-xs sm:text-sm text-brand-muted">{product.materials.join(', ')}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 sm:pt-8">
              <button 
                onClick={() => setIsQuoteOpen(true)}
                className="flex-1 bg-brand-ink text-brand-bg py-4 sm:py-5 rounded-full uppercase tracking-widest text-xs font-bold hover:bg-brand-accent transition-colors"
              >
                Request Quote
              </button>
              {product.arEnabled && (
                <button className="flex-1 border border-white/20 py-4 sm:py-5 rounded-full uppercase tracking-widest text-xs font-bold hover:bg-white/5 transition-colors flex items-center justify-center gap-2">
                  <Maximize2 size={16} />
                  View in AR
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Editorial Gallery Enhancement */}
      <section id="product-gallery" className="mt-32 space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {product.gallery.map((imgUrl, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -10 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              className="group relative aspect-[16/10] overflow-hidden rounded-2xl bg-[#F3F1EE]/5 transition-all duration-500"
            >
              <img 
                src={imgUrl} 
                alt={product.id === 'm01-table' ? `orizon-dining-table-detail-${i + 1}` : `${product.name} detail ${i + 1}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-[#0B0B0C]/20 group-hover:bg-transparent transition-colors duration-500" />
              <div className="absolute bottom-6 left-6">
                <span className="micro-label text-[8px] bg-[#0B0B0C]/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/5">
                  {product.id === 'm01-table'
                    ? `orizon-dining-table-detail-${i + 1}`
                    : product.id === 'm01-chair'
                      ? (i === 0
                          ? 'Detail 1'
                          : i === 1
                          ? 'Detail Texture'
                          : i === 2
                          ? 'Interior Placement'
                          : '')
                      : (i === 0
                          ? 'Lifestyle'
                          : i === 1
                          ? 'Detail Texture'
                          : 'Interior Placement')}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Related Products */}
      <section className="mt-48">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-3xl">Related Pieces</h2>
          <Link to="/products" className="nav-link">View All</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {PRODUCTS.filter(p => p.id !== id).slice(0, 4).map(p => (
            <Link key={p.id} to={`/products/${p.id}`} className="group">
              <div className="aspect-square rounded-xl overflow-hidden mb-4 bg-[#F3F1EE]/5">
                <img 
                  src={p.image} 
                  alt={p.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h3 className="text-lg">{p.name}</h3>
              <span className="micro-label text-[9px]">{p.price}</span>
            </Link>
          ))}
        </div>
      </section>

      <RequestQuoteModal 
        product={product} 
        isOpen={isQuoteOpen} 
        onClose={() => setIsQuoteOpen(false)} 
      />
    </motion.div>
  );
};

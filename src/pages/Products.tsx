import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PRODUCTS } from '@/src/types';
import { Link } from 'react-router-dom';
import { Filter } from 'lucide-react';

export const Products = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ['All', 'Seating', 'Tables', 'Bedroom', 'Lighting', 'Storage', 'Accessories'];

  const filteredProducts = activeCategory === 'All' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <div className="pt-24 pb-24 sm:pt-32 sm:pb-32 px-6 sm:px-8 md:px-16 max-w-screen-2xl mx-auto">
      <header className="mb-16 sm:mb-24">
        <span className="micro-label">The Archive</span>
        <h1 className="text-4xl sm:text-6xl md:text-7xl mt-4 mb-8 sm:mb-12">Products</h1>
        
        <div className="flex flex-wrap gap-4 sm:gap-8 items-center border-b border-white/5 pb-8">
          <div className="flex items-center gap-2 text-brand-muted mr-4 sm:mr-8">
            <Filter size={14} />
            <span className="text-[10px] uppercase tracking-widest">Filter by:</span>
          </div>
          <div className="flex flex-wrap gap-4 sm:gap-8">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`nav-link text-[10px] sm:text-xs ${activeCategory === cat ? 'text-brand-accent' : 'text-brand-muted'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-24">
        {filteredProducts.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group"
          >
            <Link to={`/products/${product.id}`}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl mb-8 bg-[#F3F1EE]/[0.03]">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-1000"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-[#0B0B0C]/0 group-hover:bg-[#0B0B0C]/10 transition-colors duration-500" />
                <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="bg-[#0B0B0C]/80 backdrop-blur-md px-4 py-2 rounded-full text-[10px] uppercase tracking-widest border border-white/10">
                    View Details
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <h3 className="text-2xl font-serif">{product.name}</h3>
                  <span className="text-brand-accent font-light">{product.price}</span>
                </div>
                <p className="text-brand-muted text-sm line-clamp-2 leading-relaxed">
                  {product.description}
                </p>
                <div className="pt-4 flex gap-2">
                  {product.materials.slice(0, 2).map(m => (
                    <span key={m} className="text-[9px] uppercase tracking-wider text-brand-muted border border-white/10 px-2 py-1 rounded">
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

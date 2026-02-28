import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import collectionsData from '../data/collections.json';
import { Collection } from '../types';

const collections = collectionsData as Collection[];

export const Collections = () => {
  return (
    <div className="pt-48 pb-32 px-8 md:px-16 max-w-screen-2xl mx-auto">
      <header className="mb-24 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="micro-label">The Anthology</span>
          <h1 className="text-6xl md:text-8xl mt-4 mb-8 leading-none">Collections</h1>
          <p className="text-xl text-brand-muted leading-relaxed">
            Each LUMÉRA collection is a curated dialogue between form, material, and the architectural space it inhabits. From our debut rationalist studies to forthcoming experimental ateliers.
          </p>
        </motion.div>
      </header>

      <div className="space-y-32">
        {collections.map((collection, i) => (
          <motion.div
            key={collection.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
            className="group relative"
          >
            <div className="relative aspect-[21/9] overflow-hidden rounded-3xl">
              <img 
                src={collection.heroImage} 
                alt={collection.title}
                className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-700" />
              
              <div className="absolute inset-0 p-12 md:p-24 flex flex-col justify-end">
                <div className="max-w-2xl space-y-6">
                  <div className="flex items-center gap-4">
                    <span className="micro-label text-white">{collection.shortLabel}</span>
                    {collection.status === 'coming_soon' && (
                      <span className="bg-brand-accent text-brand-bg px-3 py-1 rounded-full text-[8px] uppercase tracking-widest font-bold">
                        Coming Soon
                      </span>
                    )}
                  </div>
                  <h2 className="text-5xl md:text-7xl text-white">{collection.title}</h2>
                  <p className="text-white/80 text-lg leading-relaxed line-clamp-2">
                    {collection.description}
                  </p>
                  
                  <div className="pt-8">
                    {collection.status === 'active' ? (
                      <Link 
                        to={`/collections/${collection.slug}`}
                        className="inline-block bg-white text-brand-bg px-10 py-4 rounded-full uppercase tracking-widest text-xs font-bold hover:bg-brand-accent transition-colors"
                      >
                        Explore Collection
                      </Link>
                    ) : (
                      <button 
                        disabled
                        className="inline-block bg-white/20 backdrop-blur-md text-white/50 px-10 py-4 rounded-full uppercase tracking-widest text-xs font-bold cursor-not-allowed"
                      >
                        Coming Soon
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

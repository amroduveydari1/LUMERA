import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import collectionsData from '../data/collections.json';
import { PRODUCTS, Collection } from '../types';
import { ArrowLeft } from 'lucide-react';

const collections = collectionsData as Collection[];

export const CollectionDetail = () => {
  const { slug } = useParams();
  const collection = collections.find(c => c.slug === slug);

  if (!collection) return <div className="pt-40 text-center">Collection not found</div>;

  const featuredProducts = PRODUCTS.filter(p => collection.featuredProducts.includes(p.slug));

  return (
    <div className="pb-32">
      {/* Full-width Hero Header */}
      <section className="relative h-[70vh] w-full overflow-hidden">
        <motion.img 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
          src={collection.heroImage} 
          alt={collection.title}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/40" />
        
        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16 max-w-screen-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="max-w-3xl space-y-8"
          >
            <Link to="/collections" className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors">
              <ArrowLeft size={16} />
              <span className="micro-label text-white">Back to Collections</span>
            </Link>
            <h1 className="text-6xl md:text-8xl text-white leading-none">{collection.title}</h1>
            <p className="text-xl text-white/80 leading-relaxed">
              {collection.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="pt-32 px-8 md:px-16 max-w-screen-2xl mx-auto">
        <div className="mb-16">
          <span className="micro-label">Featured Pieces</span>
          <h2 className="text-4xl mt-2">The Collection Archive</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
          {featuredProducts.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <Link to={`/products/${product.slug}`}>
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl mb-8 bg-white/5">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-1000"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-brand-bg/0 group-hover:bg-brand-bg/10 transition-colors duration-500" />
                  <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span className="bg-brand-bg/80 backdrop-blur-md px-4 py-2 rounded-full text-[10px] uppercase tracking-widest border border-white/10">
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
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

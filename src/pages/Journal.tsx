import React from 'react';
import stories from '../data/stories.json';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

export const Journal = () => {
  return (
    <div className="pt-32 pb-32 px-8 md:px-16 max-w-screen-2xl mx-auto">
      <header className="mb-16">
        <span className="micro-label">Editorial</span>
        <h1 className="text-5xl md:text-7xl mt-4 mb-2">The Journal</h1>
        <p className="text-brand-muted max-w-xl">Stories and studies from the world of LUMÉRA—exploring light, material, and the art of Italian design.</p>
      </header>
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
    </div>
  );
};

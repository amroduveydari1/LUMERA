import React from 'react';
import { useParams, Link } from 'react-router-dom';
import stories from '../data/stories.json';
import { motion } from 'motion/react';

export const BlogDetail = () => {
  const { id } = useParams();
  const story = stories.find((s) => s.id === id);

  if (!story) return <div className="pt-40 text-center">Story not found</div>;

  return (
    <div className="pt-32 pb-32 px-8 md:px-16 max-w-screen-2xl mx-auto">
      <Link to="/journal" className="inline-flex items-center gap-2 text-brand-muted hover:text-brand-ink mb-8 transition-colors">
        <span className="micro-label">Back to Journal</span>
      </Link>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl mx-auto"
      >
        <img src={story.image} alt={story.title} className="w-full rounded-2xl mb-8 object-cover" referrerPolicy="no-referrer" />
        <span className="micro-label">{story.date}</span>
        <h1 className="text-4xl md:text-6xl mb-8 mt-2">{story.title}</h1>
        <div className="space-y-6">
          {story.content.map((para, idx) => (
            <p key={idx} className="text-brand-muted leading-relaxed text-lg">{para}</p>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

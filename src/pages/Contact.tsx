import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle2 } from 'lucide-react';

export const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="pt-32 pb-32 px-8 md:px-16 max-w-screen-2xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-12"
        >
          <div>
            <span className="micro-label">Inquiry</span>
            <h1 className="text-6xl md:text-7xl mt-4 mb-8">Contact</h1>
            <p className="text-brand-muted text-lg leading-relaxed max-w-md">
              Whether you are an architect, interior designer, or private collector, we invite you to begin a dialogue with our house.
            </p>
          </div>

          <div className="space-y-8">
            <div>
              <h4 className="micro-label mb-2">Milano Showroom</h4>
              <p className="text-brand-muted">Via Montenapoleone, 27<br />20121 Milano MI, Italy</p>
            </div>
            <div>
              <h4 className="micro-label mb-2">General Inquiries</h4>
              <p className="text-brand-muted">studio@lumera.design</p>
            </div>
            <div>
              <h4 className="micro-label mb-2">Press</h4>
              <p className="text-brand-muted">press@lumera.design</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-panel p-12 rounded-3xl relative overflow-hidden"
        >
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-8 relative z-10"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="micro-label">First Name</label>
                    <input required type="text" className="w-full bg-white/5 border-b border-white/20 py-3 focus:outline-none focus:border-brand-accent transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label className="micro-label">Last Name</label>
                    <input required type="text" className="w-full bg-white/5 border-b border-white/20 py-3 focus:outline-none focus:border-brand-accent transition-colors" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="micro-label">Email Address</label>
                  <input required type="email" className="w-full bg-white/5 border-b border-white/20 py-3 focus:outline-none focus:border-brand-accent transition-colors" />
                </div>

                <div className="space-y-2">
                  <label className="micro-label">Inquiry Type</label>
                  <select className="w-full bg-white/5 border-b border-white/20 py-3 focus:outline-none focus:border-brand-accent transition-colors appearance-none">
                    <option className="bg-brand-bg">Private Acquisition</option>
                    <option className="bg-brand-bg">Architectural Project</option>
                    <option className="bg-brand-bg">Press Inquiry</option>
                    <option className="bg-brand-bg">Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="micro-label">Message</label>
                  <textarea rows={4} className="w-full bg-white/5 border-b border-white/20 py-3 focus:outline-none focus:border-brand-accent transition-colors resize-none" />
                </div>

                <button type="submit" className="w-full bg-brand-accent text-brand-bg py-5 rounded-full uppercase tracking-widest text-xs font-bold hover:bg-brand-ink transition-colors flex items-center justify-center gap-3">
                  Send Inquiry
                  <Send size={14} />
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center space-y-6 py-20"
              >
                <CheckCircle2 size={64} className="text-brand-accent" />
                <h2 className="text-4xl">Inquiry Received</h2>
                <p className="text-brand-muted max-w-xs mx-auto">
                  Thank you for reaching out to LUMÉRA. A member of our concierge team will contact you shortly.
                </p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="nav-link border-b border-brand-accent/30"
                >
                  Send another message
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

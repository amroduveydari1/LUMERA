import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, Loader2 } from 'lucide-react';
import { Product } from '@/src/types';

interface RequestQuoteModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export const RequestQuoteModal: React.FC<RequestQuoteModalProps> = ({ product, isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    quantity: '1',
    finish: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          productName: product.name,
          productPrice: product.price,
          productSlug: product.id,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
      } else {
        throw new Error(data.error || 'Failed to send request');
      }
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err.message || 'Something went wrong. Please try again.');
    }
  };

  if (!isOpen && status !== 'success') return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#0B0B0C]/90 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl bg-[#0B0B0C] border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
          >
            {status === 'success' ? (
              <div className="p-12 text-center space-y-6">
                <div className="w-20 h-20 bg-brand-accent/10 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="text-brand-accent" size={40} />
                </div>
                <h2 className="text-3xl font-serif">Request Received</h2>
                <p className="text-brand-muted leading-relaxed max-w-sm mx-auto">
                  Thank you for your interest in LUMÉRA. Our digital concierge will review your inquiry and contact you within 24 hours.
                </p>
                <button
                  onClick={() => {
                    onClose();
                    setTimeout(() => setStatus('idle'), 500);
                  }}
                  className="bg-brand-accent text-brand-bg px-10 py-4 rounded-full uppercase tracking-widest text-xs font-bold hover:bg-brand-accent/80 transition-colors"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center p-6 border-b border-white/5 bg-white/[0.02]">
                  <div>
                    <span className="micro-label">Inquiry</span>
                    <h2 className="text-xl font-serif">Request a Quote</h2>
                  </div>
                  <button onClick={onClose} className="text-brand-muted hover:text-brand-ink transition-colors">
                    <X size={24} />
                  </button>
                </div>

                <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto">
                  <div className="flex items-center gap-6 mb-8 p-4 bg-white/[0.02] rounded-2xl border border-white/5">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-20 h-20 object-cover rounded-lg"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h3 className="text-lg font-serif">{product.name}</h3>
                      <p className="text-brand-accent text-sm">{product.price}</p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="micro-label text-[8px]">Full Name *</label>
                        <input
                          required
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          placeholder="John Doe"
                          className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-brand-accent/50 transition-colors"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="micro-label text-[8px]">Email Address *</label>
                        <input
                          required
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="john@example.com"
                          className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-brand-accent/50 transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <label className="micro-label text-[8px]">Phone</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+1 (555) 000-0000"
                          className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-brand-accent/50 transition-colors"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="micro-label text-[8px]">Quantity</label>
                        <input
                          type="number"
                          name="quantity"
                          min="1"
                          value={formData.quantity}
                          onChange={handleChange}
                          className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-brand-accent/50 transition-colors"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="micro-label text-[8px]">Preferred Finish</label>
                        <select
                          name="finish"
                          value={formData.finish}
                          onChange={handleChange}
                          className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-brand-accent/50 transition-colors appearance-none"
                        >
                          <option value="" className="bg-brand-bg">Select Finish</option>
                          {product.materials.map(m => (
                            <option key={m} value={m} className="bg-brand-bg">{m}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="micro-label text-[8px]">Message / Special Requirements *</label>
                      <textarea
                        required
                        name="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your project or specific needs..."
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-brand-accent/50 transition-colors resize-none"
                      />
                    </div>

                    {status === 'error' && (
                      <p className="text-red-400 text-xs text-center">{errorMessage}</p>
                    )}

                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                      <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 border border-white/10 py-4 rounded-full uppercase tracking-widest text-xs font-bold hover:bg-white/5 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="flex-1 bg-brand-accent text-brand-bg py-4 rounded-full uppercase tracking-widest text-xs font-bold hover:bg-brand-accent/80 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                      >
                        {status === 'loading' ? (
                          <>
                            <Loader2 className="animate-spin" size={16} />
                            Sending...
                          </>
                        ) : (
                          'Send Request'
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, X, MessageSquare, Sparkles } from 'lucide-react';
import { cn } from '@/src/types';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const Concierge = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Welcome to LUMÉRA. I am your digital concierge. How may I assist you in your search for silence and form?' }
  ]);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMsg = { role: 'user' as const, content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    // Simulate response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "Our Milano 01 collection is currently available for private viewing. Would you like me to arrange a consultation with one of our design architects?" 
      }]);
    }, 1000);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-50 w-14 h-14 rounded-full bg-brand-accent text-brand-bg flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300"
      >
        <MessageSquare size={24} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-0 right-0 md:bottom-28 md:right-8 z-50 w-full h-full md:w-[400px] md:h-[600px] glass-panel md:rounded-3xl flex flex-col overflow-hidden shadow-2xl"
          >
            <div className="p-6 border-bottom border-white/10 flex justify-between items-center bg-white/5">
              <div>
                <span className="micro-label">Digital Concierge</span>
                <h3 className="text-lg font-serif">LUMÉRA Assistant</h3>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-brand-muted hover:text-brand-ink">
                <X size={20} />
              </button>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6">
              {messages.map((msg, i) => (
                <div key={i} className={cn("flex", msg.role === 'user' ? "justify-end" : "justify-start")}>
                  <div className={cn(
                    "max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed",
                    msg.role === 'user' ? "bg-brand-accent text-brand-bg" : "bg-white/5 text-brand-ink"
                  )}>
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 bg-white/5 border-t border-white/10">
              <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                {['Milano 01 Collection', 'Material Inquiry', 'AR Viewing'].map(topic => (
                  <button 
                    key={topic}
                    onClick={() => setInput(topic)}
                    className="whitespace-nowrap px-3 py-1.5 rounded-full border border-white/10 text-[10px] uppercase tracking-wider hover:bg-white/10 transition-colors"
                  >
                    {topic}
                  </button>
                ))}
              </div>
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Inquire..."
                  className="w-full bg-white/5 border border-white/10 rounded-full py-3 px-6 text-sm focus:outline-none focus:border-brand-accent/50 transition-colors"
                />
                <button 
                  onClick={handleSend}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-brand-accent text-brand-bg flex items-center justify-center hover:bg-brand-accent/80 transition-colors"
                >
                  <Send size={14} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

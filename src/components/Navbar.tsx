import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Search } from 'lucide-react';
import { cn } from '@/src/types';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Collections', path: '/collections' },
    { name: 'Materials', path: '/materials' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 w-full z-50 transition-all duration-500 px-4 sm:px-8 md:px-16",
      isScrolled ? "py-3 sm:py-4 bg-brand-bg/80 backdrop-blur-lg border-b border-white/5" : "py-6 sm:py-8 bg-transparent"
    )}>
      <div className="max-w-screen-2xl mx-auto flex justify-between items-center">
        {/* Desktop Nav */}
        <div className="flex-1 hidden md:flex gap-6 sm:gap-8">
          {navLinks.slice(0, 2).map(link => (
            <Link key={link.path} to={link.path} className={cn("nav-link", location.pathname === link.path && "text-brand-accent")}> 
              {link.name}
            </Link>
          ))}
        </div>

        <Link to="/" className="text-xl sm:text-2xl tracking-[0.2em] sm:tracking-[0.3em] font-serif font-light text-brand-ink uppercase">
          LUMÉRA
        </Link>

        <div className="flex-1 hidden md:flex justify-end gap-6 sm:gap-8">
          {navLinks.slice(2).map(link => (
            <Link key={link.path} to={link.path} className={cn("nav-link", location.pathname === link.path && "text-brand-accent")}> 
              {link.name}
            </Link>
          ))}
          <button className="nav-link"><Search size={16} /></button>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-brand-ink p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-brand-accent"
          aria-label="Open menu"
          onClick={() => setIsMenuOpen(true)}
        >
          <Menu size={28} />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-0 bg-brand-bg z-[60] flex flex-col"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex justify-between items-center p-6 border-b border-white/10">
              <span className="text-xl tracking-widest font-serif">LUMÉRA</span>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="text-brand-muted hover:text-brand-accent p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-brand-accent"
                aria-label="Close menu"
              >
                <X size={28} />
              </button>
            </div>
            <div className="flex flex-col gap-6 p-8">
              {navLinks.map(link => (
                <Link 
                  key={link.path} 
                  to={link.path} 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-2xl sm:text-3xl font-serif font-light tracking-wide hover:text-brand-accent transition-colors py-2"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

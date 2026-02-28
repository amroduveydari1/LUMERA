import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { Navbar } from './components/Navbar';
import { ScrollToTop } from './components/ScrollToTop';
import { Concierge } from './components/Concierge';
import { Home } from './pages/Home';
import { Products } from './pages/Products';
import { ProductDetail } from './pages/ProductDetail';
import { Collections } from './pages/Collections';
import { CollectionDetail } from './pages/CollectionDetail';
import { Materials } from './pages/Materials';
import { Contact } from './pages/Contact';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { Journal } from './pages/Journal';
import { BlogDetail } from './pages/BlogDetail';

const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  // Check if it's a product detail page
  const isProductDetail = location.pathname.startsWith('/products/') && location.pathname !== '/products';

  return (
    <motion.div
      key={location.pathname}
      initial={{ opacity: 0, y: isProductDetail ? 30 : 0 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: isProductDetail ? -30 : 0 }}
      transition={{ 
        duration: isProductDetail ? 0.8 : 0.6, 
        ease: [0.4, 0, 0.2, 1] 
      }}
    >
      {children}
    </motion.div>
  );
};

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-[#0B0B0C] text-[#F3F1EE] selection:bg-brand-accent selection:text-brand-bg">
        <Navbar />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
            <Route path="/products" element={<PageWrapper><Products /></PageWrapper>} />
            <Route path="/products/:id" element={<PageWrapper><ProductDetail /></PageWrapper>} />
            <Route path="/collections" element={<PageWrapper><Collections /></PageWrapper>} />
            <Route path="/collections/:slug" element={<PageWrapper><CollectionDetail /></PageWrapper>} />
            <Route path="/materials" element={<PageWrapper><Materials /></PageWrapper>} />
            <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
            <Route path="/privacy" element={<PageWrapper><PrivacyPolicy /></PageWrapper>} />
            <Route path="/journal" element={<PageWrapper><Journal /></PageWrapper>} />
            <Route path="/journal/:id" element={<PageWrapper><BlogDetail /></PageWrapper>} />
          </Routes>
        </AnimatePresence>
        <Concierge />
        
        <footer className="py-24 px-8 md:px-16 border-t border-white/5 bg-white/[0.01]">
          <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
            <div className="col-span-1 md:col-span-2">
              <h2 className="text-3xl tracking-[0.3em] font-serif mb-8">LUMÉRA</h2>
              <p className="text-brand-muted max-w-xs leading-relaxed">
                Architectural furniture for the contemporary soul. Crafted in Italy, inspired by silence.
              </p>
            </div>
            <div>
              <h4 className="micro-label mb-6">Navigation</h4>
              <ul className="space-y-4">
                <li><Link to="/products" className="nav-link">Archive</Link></li>
                <li><Link to="/collections" className="nav-link">Collections</Link></li>
                <li><Link to="/materials" className="nav-link">Materials</Link></li>
                <li><Link to="/contact" className="nav-link">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="micro-label mb-6">Social</h4>
              <ul className="space-y-4">
                <li><a href="#" className="nav-link">Instagram</a></li>
                <li><a href="#" className="nav-link">Pinterest</a></li>
                <li><a href="#" className="nav-link">LinkedIn</a></li>
              </ul>
            </div>
          </div>
          <div className="max-w-screen-2xl mx-auto mt-24 pt-8 border-t border-white/5 flex justify-between items-center">
            <span className="micro-label text-[8px]">© 2026 LUMÉRA Design House. All rights reserved.</span>
            <Link to="/privacy" className="micro-label text-[8px] hover:text-brand-accent transition-colors">Privacy Policy / Terms of Service</Link>
          </div>
        </footer>
      </div>
    </Router>
  );
}

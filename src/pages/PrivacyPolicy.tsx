import React from 'react';
import { motion } from 'motion/react';

export const PrivacyPolicy = () => {
  return (
    <div className="pt-48 pb-32 px-8 md:px-16 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="space-y-12"
      >
        <header className="mb-24">
          <span className="micro-label">Legal</span>
          <h1 className="text-6xl md:text-7xl mt-4">Privacy Policy</h1>
        </header>

        <section className="space-y-6">
          <h2 className="text-3xl font-serif">Introduction</h2>
          <p className="text-brand-muted leading-relaxed">
            At LUMÉRA, we respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-serif">The Data We Collect</h2>
          <p className="text-brand-muted leading-relaxed">
            We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
          </p>
          <ul className="list-disc list-inside text-brand-muted space-y-2 ml-4">
            <li>Identity Data includes first name, last name, username or similar identifier.</li>
            <li>Contact Data includes billing address, delivery address, email address and telephone numbers.</li>
            <li>Technical Data includes internet protocol (IP) address, your login data, browser type and version.</li>
            <li>Usage Data includes information about how you use our website, products and services.</li>
          </ul>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-serif">How We Use Your Data</h2>
          <p className="text-brand-muted leading-relaxed">
            We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
          </p>
          <ul className="list-disc list-inside text-brand-muted space-y-2 ml-4">
            <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
            <li>Where it is necessary for our legitimate interests and your interests and fundamental rights do not override those interests.</li>
            <li>Where we need to comply with a legal obligation.</li>
          </ul>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-serif">Contact Us</h2>
          <p className="text-brand-muted leading-relaxed">
            If you have any questions about this privacy policy or our privacy practices, please contact our privacy compliance officer at: privacy@lumera.design
          </p>
        </section>

        <footer className="pt-24 border-t border-white/5">
          <p className="text-[10px] uppercase tracking-widest text-brand-muted">Last updated: February 2026</p>
        </footer>
      </motion.div>
    </div>
  );
};

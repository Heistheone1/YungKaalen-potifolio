import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export default function PrivacyPolicy() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-dark-bg text-white py-24 px-6"
    >
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="text-gold-primary hover:underline mb-8 inline-block">&larr; Back to Home</Link>
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-8">Privacy Policy</h1>
        <div className="prose prose-invert prose-lg">
          <p><strong>Last updated: March 7, 2026</strong></p>
          <p>I. H. Savior ("we", "us", or "our") operates the I. H. Savior website. This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.</p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">1. Information Collection and Use</h2>
          <p>We collect several different types of information for various purposes to provide and improve our Service to you.</p>
          <h3 className="text-xl font-semibold mt-4 mb-2">Types of Data Collected</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Personal Data:</strong> While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you, such as your email address, first name and last name, and phone number.</li>
            <li><strong>Usage Data:</strong> We may also collect information on how the Service is accessed and used ("Usage Data").</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">2. Use of Data</h2>
          <p>I. H. Savior uses the collected data for various purposes:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>To provide and maintain our Service.</li>
            <li>To notify you about changes to our Service.</li>
            <li>To provide customer support.</li>
            <li>To gather analysis or valuable information so that we can improve our Service.</li>
            <li>To monitor the usage of our Service.</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">3. Disclosure of Data</h2>
          <p>We do not sell your personal data. We may disclose your Personal Data in the good faith belief that such action is necessary to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>To comply with a legal obligation.</li>
            <li>To protect and defend the rights or property of I. H. Savior.</li>
            <li>To prevent or investigate possible wrongdoing in connection with the Service.</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">4. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us through our contact form on the homepage.</p>
        </div>
      </div>
    </motion.div>
  );
}

import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export default function TermsOfService() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-dark-bg text-white py-24 px-6"
    >
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="text-gold-primary hover:underline mb-8 inline-block">&larr; Back to Home</Link>
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-8">Terms of Service</h1>
        <div className="prose prose-invert prose-lg">
          <p><strong>Last updated: March 7, 2026</strong></p>
          <p>Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the I. H. Savior website (the "Service") operated by I. H. Savior.</p>

          <h2 className="text-2xl font-bold mt-8 mb-4">1. Acceptance of Terms</h2>
          <p>By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access the Service.</p>

          <h2 className="text-2xl font-bold mt-8 mb-4">2. Intellectual Property</h2>
          <p>The Service and its original content, features, and functionality are and will remain the exclusive property of I. H. Savior and its licensors. The Service is protected by copyright, trademark, and other laws of both the country and foreign countries.</p>

          <h2 className="text-2xl font-bold mt-8 mb-4">3. Links to Other Web Sites</h2>
          <p>Our Service may contain links to third-party web sites or services that are not owned or controlled by I. H. Savior. I. H. Savior has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third-party web sites or services.</p>

          <h2 className="text-2xl font-bold mt-8 mb-4">4. Limitation of Liability</h2>
          <p>In no event shall I. H. Savior, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.</p>

          <h2 className="text-2xl font-bold mt-8 mb-4">5. Governing Law</h2>
          <p>These Terms shall be governed and construed in accordance with the laws of the country, without regard to its conflict of law provisions.</p>

          <h2 className="text-2xl font-bold mt-8 mb-4">6. Changes</h2>
          <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.</p>
        </div>
      </div>
    </motion.div>
  );
}

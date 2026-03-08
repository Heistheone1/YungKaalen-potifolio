import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export default function FAQ() {
  const faqs = [
    { 
      q: "What is I. H. Savior?", 
      a: "I. H. Savior is a digital media and brand consultancy focused on bridging cultures through digital excellence, streetwear culture, and luxury branding." 
    },
    { 
      q: "How can I collaborate with the brand?", 
      a: "We are always open to creative collaborations. Please use the contact form on our homepage, providing details about your project or inquiry, and our team will get back to you." 
    },
    { 
      q: "Where can I find your latest work and collections?", 
      a: "Our latest work, content showcases, and KAYN brand collections are prominently featured on our homepage. You can also follow our social media channels linked in the footer for real-time updates." 
    },
    { 
      q: "How can I access the Media Kit?", 
      a: "The Media Kit is available for download via the link provided in the footer of our website. It contains essential brand assets and information for press and partners." 
    },
    { 
      q: "Is my personal data secure?", 
      a: "Yes, we take your privacy seriously. Please refer to our Privacy Policy page for detailed information on how we collect, use, and protect your data." 
    },
    { 
      q: "What are the Terms of Service?", 
      a: "Our Terms of Service outline the rules and regulations for using our website. You can find the full document on our Terms of Service page." 
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-dark-bg text-white py-24 px-6"
    >
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="text-gold-primary hover:underline mb-8 inline-block">&larr; Back to Home</Link>
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-8">Frequently Asked Questions</h1>
        <div className="space-y-8">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:border-gold-primary/30 transition-colors">
              <h3 className="text-xl font-bold mb-4 text-gold-primary">{faq.q}</h3>
              <p className="text-white/70 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

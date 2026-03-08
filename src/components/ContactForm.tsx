import { motion, AnimatePresence } from "motion/react";
import { Send, Mail, MapPin, Phone, Copy, Check, ExternalLink } from "lucide-react";
import { useContent } from "../context/ContentContext";
import SectionEditor from "./SectionEditor";
import { Reveal } from "./Reveal";
import React, { useState } from "react";

export default function ContactForm() {
  const { content } = useContent();
  const defaultData = {
    title: "Let's Create Together",
    subtitle: "Ready to elevate your brand? Reach out and let's discuss your vision.",
    email: "ihsavior@gmail.com",
    phone: "+250 793 736 012",
    location: "Kigali, Rwanda"
  };

  const data = { ...defaultData, ...content.contact };

  const [formData, setFormData] = useState({
    name: "",
    subject: "Brand Collaboration",
    message: ""
  });

  const [isCopied, setIsCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("ihsavior@gmail.com");
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, subject, message } = formData;
    
    // Construct body
    const body = `Name: ${name}\r\n\r\nMessage:\r\n${message}`;
    
    // Construct mailto link
    const mailtoLink = `mailto:zeddyrush7@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Open in same tab to trigger OS handler without blank page
    window.location.href = mailtoLink;
  };

  const handleGmail = () => {
    const { name, subject, message } = formData;
    const body = `Name: ${name}\n\nMessage:\n${message}`;
    const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=zeddyrush7@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(gmailLink, '_blank');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-20 md:py-32 px-6 relative overflow-hidden">
      <SectionEditor 
        sectionId="contact"
        initialData={defaultData}
        fields={[
          { key: 'title', label: 'Section Title', type: 'text' },
          { key: 'subtitle', label: 'Subtitle', type: 'textarea' },
          { key: 'email', label: 'Display Email', type: 'text' },
          { key: 'phone', label: 'Phone Number', type: 'text' },
          { key: 'location', label: 'Location', type: 'text' },
        ]}
      />
      
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black/80 pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gold-primary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 relative z-10">
        {/* Contact Info Side */}
        <div>
          <Reveal>
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-display font-bold mb-6 md:mb-8 leading-[0.9] tracking-tight">
              {data.title}
            </h2>
            <p className="text-lg md:text-xl text-white/60 mb-8 md:mb-12 font-light leading-relaxed max-w-md">
              {data.subtitle}
            </p>
          </Reveal>

          <div className="space-y-6 md:space-y-8">
            <Reveal delay={0.2}>
              <div className="group relative z-20">
                <div className="flex items-center gap-4 md:gap-6 mb-2">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gold-primary group-hover:bg-gold-primary group-hover:text-black transition-all duration-500 shrink-0">
                    <Mail size={20} className="md:w-6 md:h-6" />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-xs md:text-sm text-white/40 uppercase tracking-widest font-bold mb-1">Direct Email</p>
                    <div className="flex items-center gap-3 flex-wrap">
                      <p className="text-lg md:text-xl text-white group-hover:text-gold-primary transition-colors break-all">{data.email}</p>
                      <button 
                        onClick={handleCopyEmail}
                        className="p-2 rounded-full hover:bg-white/10 text-white/40 hover:text-white transition-colors cursor-pointer shrink-0"
                        title="Copy Email"
                      >
                        {isCopied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <a 
                href={`https://wa.me/${data.phone.replace(/[^0-9]/g, '')}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-4 md:gap-6 group relative z-20 cursor-pointer"
              >
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gold-primary group-hover:bg-gold-primary group-hover:text-black transition-all duration-500 shrink-0">
                  <Phone size={20} className="md:w-6 md:h-6" />
                </div>
                <div>
                  <p className="text-xs md:text-sm text-white/40 uppercase tracking-widest font-bold mb-1">WhatsApp / Phone</p>
                  <p className="text-lg md:text-xl text-white group-hover:text-gold-primary transition-colors">{data.phone}</p>
                </div>
              </a>
            </Reveal>

            <Reveal delay={0.4}>
              <div className="flex items-center gap-4 md:gap-6 group relative z-20">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gold-primary group-hover:bg-gold-primary group-hover:text-black transition-all duration-500 shrink-0">
                  <MapPin size={20} className="md:w-6 md:h-6" />
                </div>
                <div>
                  <p className="text-xs md:text-sm text-white/40 uppercase tracking-widest font-bold mb-1">Location</p>
                  <p className="text-lg md:text-xl text-white group-hover:text-gold-primary transition-colors">{data.location}</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Form Side */}
        <Reveal delay={0.2}>
          <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 p-6 md:p-12 rounded-3xl backdrop-blur-sm relative overflow-hidden mt-8 lg:mt-0">
            {/* Form Header */}
            <div className="mb-6 md:mb-8 border-b border-white/10 pb-6">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Send a Message</h3>
              <p className="text-white/40 text-sm">We'll get back to you within 24 hours.</p>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gold-primary uppercase tracking-widest ml-1">Your Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white focus:border-gold-primary focus:bg-black/60 outline-none transition-all"
                  placeholder="John Doe"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-bold text-gold-primary uppercase tracking-widest ml-1">Subject</label>
                <select 
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white focus:border-gold-primary focus:bg-black/60 outline-none transition-all appearance-none cursor-pointer"
                >
                  <option>Brand Collaboration</option>
                  <option>Content Creation</option>
                  <option>Event Booking</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gold-primary uppercase tracking-widest ml-1">Message</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white focus:border-gold-primary focus:bg-black/60 outline-none transition-all resize-none"
                  placeholder="Tell us about your vision..."
                  required
                />
              </div>

              <div className="space-y-3">
                <button 
                  type="submit" 
                  className="w-full bg-gold-primary text-black font-bold py-4 rounded-xl hover:bg-white transition-colors flex items-center justify-center gap-2 group cursor-pointer"
                >
                  Send Message
                  <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
                
                <button 
                  type="button"
                  onClick={handleGmail}
                  className="w-full bg-white/5 border border-white/10 text-white/60 font-medium py-3 rounded-xl hover:bg-white/10 hover:text-white transition-colors flex items-center justify-center gap-2 cursor-pointer text-sm"
                >
                  Or send via Gmail
                  <ExternalLink size={14} />
                </button>
              </div>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

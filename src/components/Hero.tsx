import { motion, useScroll, useTransform, useAnimation } from "motion/react";
import { Play, Send } from "lucide-react";
import { useContent } from "../context/ContentContext";
import { useRef, useEffect } from "react";
import SectionEditor from "./SectionEditor";

interface HeroProps {
  enableAnimation?: boolean;
}

export const defaultData = {
    badge: "INEZAYE HIRWA SAVIOR 🇷🇼",
    titleLine1: "YUNG",
    titleLine2: "KAALEN",
    subtitlePre: "Founder & Owner of",
    subtitleHighlight: "KAYN",
    description: "Streamer | Content Creator | Visionary.",
    image: "https://picsum.photos/seed/kaalen/800/1000",
    imageAlt: "YungKaalen Profile",
    avatarImage: "https://picsum.photos/seed/avatar/100/100",
    profileName: "YungKaalen",
    profileTitle: "Official Creator",
    ctaText: "Collaborate Now",
    watchText: "Watch Live",
    twitchUrl: "https://twitch.tv/yungkaalen"
  };

export const fields: { key: string; label: string; type: 'text' | 'textarea' | 'image' }[] = [
    { key: 'badge', label: 'Badge Text', type: 'text' },
    { key: 'titleLine1', label: 'Title Line 1', type: 'text' },
    { key: 'titleLine2', label: 'Title Line 2', type: 'text' },
    { key: 'subtitlePre', label: 'Subtitle Prefix', type: 'text' },
    { key: 'subtitleHighlight', label: 'Subtitle Highlight', type: 'text' },
    { key: 'description', label: 'Description', type: 'textarea' },
    { key: 'image', label: 'Profile Image URL', type: 'image' },
    { key: 'imageAlt', label: 'Profile Image Alt Text', type: 'text' },
    { key: 'avatarImage', label: 'Avatar Image', type: 'image' },
    { key: 'profileName', label: 'Profile Name', type: 'text' },
    { key: 'profileTitle', label: 'Profile Title', type: 'text' },
    { key: 'ctaText', label: 'CTA Button Text', type: 'text' },
    { key: 'watchText', label: 'Watch Button Text', type: 'text' },
    { key: 'twitchUrl', label: 'Twitch URL', type: 'text' },
  ];

export default function Hero({ enableAnimation = true }: HeroProps) {
  const { content } = useContent();
  const containerRef = useRef(null);
  const controls = useAnimation();

  useEffect(() => {
    if (enableAnimation) {
      controls.start("visible");
    }
  }, [enableAnimation, controls]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  const data = { ...defaultData, ...content.hero };

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.8,
      },
    }),
  };

  return (
    <section id="home" ref={containerRef} className="relative pt-32 pb-20 px-6 overflow-hidden min-h-screen flex items-center">
      <SectionEditor 
        sectionId="hero"
        initialData={defaultData}
        fields={fields}
      />
      <motion.div style={{ y: useTransform(scrollYProgress, [0, 1], [0, -100]) }} className="absolute top-1/4 -left-20 w-96 h-96 bg-gold-primary/10 rounded-full blur-[120px]" />
      <motion.div style={{ y: useTransform(scrollYProgress, [0, 1], [0, 100]) }} className="absolute bottom-1/4 -right-20 w-96 h-96 bg-gold-dark/10 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
          initial="hidden"
          animate={controls}
          style={{ y, opacity }}
        >
          <motion.div 
            custom={0} 
            variants={textVariants}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-gold-primary mb-6 uppercase tracking-widest"
          >
            <span className="w-2 h-2 rounded-full bg-gold-primary animate-pulse" />
            {data.badge}
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-extrabold mb-6 leading-[0.9] md:leading-tight tracking-tight">
            <motion.span custom={1} variants={textVariants} className="block">{data.titleLine1}</motion.span>
            <motion.span 
              custom={2} 
              variants={textVariants} 
              className="block gold-text-gradient"
              whileHover={{ x: 10, skewX: -10, transition: { duration: 0.2 } }}
            >
              {data.titleLine2}
            </motion.span>
          </h1>
          
          <motion.p custom={3} variants={textVariants} className="text-lg md:text-xl text-white/60 mb-8 max-w-lg leading-relaxed font-light">
            {data.subtitlePre} <span className="text-gold-primary font-bold">{data.subtitleHighlight}</span>. 
            <span className="block mt-2 italic text-gold-light/80">{data.description}</span>
          </motion.p>

          <motion.div custom={4} variants={textVariants} className="flex flex-col sm:flex-row gap-4">
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(212, 175, 55, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gold-primary text-black font-bold gold-glow shadow-xl shadow-gold-primary/10 relative overflow-hidden group w-full sm:w-auto"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <Send size={18} className="relative z-10" />
              <span className="relative z-10">{data.ctaText}</span>
            </motion.a>
            
            <motion.a
              href={data.twitchUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-bold transition-all cursor-pointer w-full sm:w-auto"
            >
              <Play size={18} fill="currentColor" />
              {data.watchText}
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div
          style={{ scale }}
          initial={{ opacity: 0, x: 50 }}
          animate={controls}
          variants={{
            hidden: { opacity: 0, x: 50 },
            visible: { opacity: 1, x: 0, transition: { duration: 1, ease: "easeOut", delay: 0.5 } }
          }}
          className="relative perspective-1000"
        >
          <motion.div 
            animate={{ 
              y: [0, -20, 0],
              rotateY: [0, 5, 0]
            }}
            transition={{ 
              duration: 6, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="relative z-10 rounded-3xl overflow-hidden border border-gold-primary/20 gold-glow aspect-[4/5] bg-dark-card transform-style-3d"
          >
            <img 
              src={data.image} 
              alt={data.imageAlt} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-dark-bg via-dark-bg/60 to-transparent">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gold-primary flex items-center justify-center overflow-hidden">
                  <img src={data.avatarImage} alt="Avatar" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <div className="font-bold text-gold-light">{data.profileName}</div>
                  <div className="text-xs text-white/50">{data.profileTitle}</div>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Decorative Elements with Parallax */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-12 -right-12 w-48 h-48 border border-gold-primary/20 rounded-full border-dashed" 
          />
          <div className="absolute -top-6 -right-6 w-32 h-32 border-t-2 border-r-2 border-gold-primary/40 rounded-tr-3xl" />
          <div className="absolute -bottom-6 -left-6 w-32 h-32 border-b-2 border-l-2 border-gold-primary/40 rounded-bl-3xl" />
        </motion.div>
      </div>
    </section>
  );
}

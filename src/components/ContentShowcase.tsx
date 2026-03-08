import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play, ArrowUpRight, Youtube, Instagram, Twitter, X } from "lucide-react";
import { useContent } from "../context/ContentContext";
import SectionEditor from "./SectionEditor";
import { Reveal } from "./Reveal";

export default function ContentShowcase() {
  const { content } = useContent();
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);

  const defaultData = {
    title: "Curated Content",
    subtitle: "A selection of our most impactful digital narratives.",
    v1Title: "KAYN Fashion Week",
    v1Category: "Event Coverage",
    v1Image: "https://picsum.photos/seed/fashion/600/400",
    v1Url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    v2Title: "Urban Culture Doc",
    v2Category: "Documentary",
    v2Image: "https://picsum.photos/seed/urban/600/400",
    v2Url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    v3Title: "Music Video BTS",
    v3Category: "Behind the Scenes",
    v3Image: "https://picsum.photos/seed/music/600/400",
    v3Url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  };

  const data = { ...defaultData, ...content.showcase };

  const videos = [
    { title: data.v1Title, category: data.v1Category, image: data.v1Image, url: data.v1Url },
    { title: data.v2Title, category: data.v2Category, image: data.v2Image, url: data.v2Url },
    { title: data.v3Title, category: data.v3Category, image: data.v3Image, url: data.v3Url },
  ];

  return (
    <section id="content" className="py-20 md:py-32 px-6 bg-black relative">
      <SectionEditor 
        sectionId="showcase"
        initialData={defaultData}
        fields={[
          { key: 'title', label: 'Section Title', type: 'text' },
          { key: 'subtitle', label: 'Subtitle', type: 'textarea' },
          { key: 'v1Title', label: 'Video 1 Title', type: 'text' },
          { key: 'v1Category', label: 'Video 1 Category', type: 'text' },
          { key: 'v1Image', label: 'Video 1 Image', type: 'image' },
          { key: 'v1Url', label: 'Video 1 URL', type: 'text' },
          { key: 'v2Title', label: 'Video 2 Title', type: 'text' },
          { key: 'v2Category', label: 'Video 2 Category', type: 'text' },
          { key: 'v2Image', label: 'Video 2 Image', type: 'image' },
          { key: 'v2Url', label: 'Video 2 URL', type: 'text' },
          { key: 'v3Title', label: 'Video 3 Title', type: 'text' },
          { key: 'v3Category', label: 'Video 3 Category', type: 'text' },
          { key: 'v3Image', label: 'Video 3 Image', type: 'image' },
          { key: 'v3Url', label: 'Video 3 URL', type: 'text' },
        ]}
      />
      
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-20 gap-8">
          <Reveal>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold mb-4">{data.title}</h2>
            <p className="text-lg md:text-xl text-white/50 max-w-xl font-light">{data.subtitle}</p>
          </Reveal>
          
          <Reveal delay={0.2}>
            <div className="flex gap-4">
              {[Youtube, Instagram, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-gold-primary hover:text-black hover:border-gold-primary transition-all duration-300">
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video, i) => (
            <Reveal key={i} delay={i * 0.15}>
              <div className="group cursor-pointer" onClick={() => setPlayingVideo(video.url)}>
                <div className="relative overflow-hidden rounded-2xl aspect-video mb-6 border border-white/5">
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500 z-10" />
                  <img 
                    src={video.image} 
                    alt={video.title} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  
                  <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-50 group-hover:scale-100">
                    <div className="w-16 h-16 rounded-full bg-gold-primary/90 backdrop-blur-sm flex items-center justify-center text-black shadow-xl shadow-black/50">
                      <Play size={24} fill="currentColor" className="ml-1" />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between items-start group-hover:translate-x-2 transition-transform duration-300">
                  <div>
                    <div className="text-gold-primary text-xs font-bold tracking-widest uppercase mb-2">{video.category}</div>
                    <h3 className="text-xl md:text-2xl font-bold group-hover:text-gold-primary transition-colors">{video.title}</h3>
                  </div>
                  <ArrowUpRight className="text-white/20 group-hover:text-gold-primary transition-colors" />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {playingVideo && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
            onClick={() => setPlayingVideo(null)}
          >
            <button className="absolute top-8 right-8 text-white hover:text-gold-primary" onClick={() => setPlayingVideo(null)}>
              <X size={40} />
            </button>
            <div className="w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
              <iframe 
                src={playingVideo?.replace('watch?v=', 'embed/')} 
                width="100%" 
                height="100%" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

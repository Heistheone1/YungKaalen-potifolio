import { motion } from "motion/react";
import { Globe, Award, Heart, Quote } from "lucide-react";
import { useContent } from "../context/ContentContext";
import SectionEditor from "./SectionEditor";
import { Reveal } from "./Reveal";

export default function About() {
  const { content } = useContent();
  const defaultData = {
    titleLine1: "The Visionary Behind",
    titleHighlight: "KAYN & YungKaalen",
    para1: "Inezaye Hirwa Savior, known professionally as YungKaalen, is a visionary Rwandan entrepreneur and digital creator. As the founder and owner of the KAYN brand, he has redefined what it means to be a creator in the modern era.",
    para2: "With a focus on luxury, influence, and authentic storytelling, Savior has built a global platform that bridges the gap between East African culture and international digital trends.",
    image: "https://picsum.photos/seed/about/800/800",
    highlight1Title: "Founder of KAYN",
    highlight1Desc: "Leading a new era of digital branding and lifestyle.",
    highlight2Title: "Inezaye Hirwa Savior",
    highlight2Desc: "The visionary behind the YungKaalen persona.",
    highlight3Title: "Global Influence",
    highlight3Desc: "Connecting Rwanda to the international digital stage."
  };

  const data = { ...defaultData, ...content.about };

  const highlights = [
    { icon: <Globe size={24} />, title: data.highlight1Title, desc: data.highlight1Desc },
    { icon: <Award size={24} />, title: data.highlight2Title, desc: data.highlight2Desc },
    { icon: <Heart size={24} />, title: data.highlight3Title, desc: data.highlight3Desc },
  ];

  return (
    <section id="about" className="py-20 md:py-32 px-6 relative overflow-hidden">
      <SectionEditor 
        sectionId="about"
        initialData={defaultData}
        fields={[
          { key: 'titleLine1', label: 'Title Line 1', type: 'text' },
          { key: 'titleHighlight', label: 'Title Highlight', type: 'text' },
          { key: 'para1', label: 'Paragraph 1', type: 'textarea' },
          { key: 'para2', label: 'Paragraph 2', type: 'textarea' },
          { key: 'image', label: 'Image URL', type: 'image' },
          { key: 'highlight1Title', label: 'Highlight 1 Title', type: 'text' },
          { key: 'highlight1Desc', label: 'Highlight 1 Desc', type: 'text' },
          { key: 'highlight2Title', label: 'Highlight 2 Title', type: 'text' },
          { key: 'highlight2Desc', label: 'Highlight 2 Desc', type: 'text' },
          { key: 'highlight3Title', label: 'Highlight 3 Title', type: 'text' },
          { key: 'highlight3Desc', label: 'Highlight 3 Desc', type: 'text' },
        ]}
      />
      
      {/* Background Texture */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div className="relative order-2 lg:order-1">
          <Reveal>
            <div className="relative z-10 rounded-[2rem] overflow-hidden border border-white/10 aspect-[4/5] bg-dark-card group">
              <div className="absolute inset-0 bg-gold-primary/20 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <img 
                src={data.image} 
                alt="Inezaye Hirwa Savior" 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-100 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </div>
          </Reveal>
          
          {/* Decorative Quote Card - Visible on mobile but relative */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            viewport={{ once: true }}
            className="relative lg:absolute -bottom-6 lg:-bottom-10 right-0 lg:-right-10 z-20 bg-dark-card/90 backdrop-blur-xl border border-gold-primary/30 p-6 md:p-8 rounded-2xl max-w-xs shadow-2xl shadow-black/50 mt-6 lg:mt-0 mx-auto lg:mx-0"
          >
            <Quote className="text-gold-primary mb-4" size={24} />
            <p className="font-serif italic text-white/90 leading-relaxed text-sm md:text-base">
              "Creativity is not just about making things. It's about creating a legacy that outlives us."
            </p>
            <div className="mt-4 text-sm font-bold text-gold-primary tracking-widest uppercase">
              — Savior
            </div>
          </motion.div>

          <div className="absolute -top-20 -left-20 w-64 h-64 bg-gold-primary/10 rounded-full blur-[100px]" />
        </div>

        <div className="order-1 lg:order-2">
          <Reveal>
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-display font-bold mb-8 md:mb-10 leading-[0.9] tracking-tight">
              {data.titleLine1} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-primary to-gold-light italic font-serif pr-4">
                {data.titleHighlight}
              </span>
            </h2>
          </Reveal>
          
          <div className="space-y-6 md:space-y-8">
            <Reveal delay={0.4}>
              <p className="text-lg md:text-xl text-white/70 leading-relaxed font-light border-l-2 border-gold-primary/30 pl-6">
                {data.para1}
              </p>
            </Reveal>
            
            <Reveal delay={0.5}>
              <p className="text-base md:text-lg text-white/50 leading-relaxed font-light">
                {data.para2}
              </p>
            </Reveal>
          </div>

          <div className="mt-12 md:mt-16 grid gap-4 md:gap-6">
            {highlights.map((item, i) => (
              <Reveal key={i} delay={0.6 + i * 0.1}>
                <div 
                  className="flex items-start gap-4 md:gap-6 p-4 md:p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-gold-primary/30 hover:bg-white/10 transition-all duration-500 group"
                >
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gold-primary/10 flex items-center justify-center text-gold-primary shrink-0 group-hover:scale-110 group-hover:bg-gold-primary group-hover:text-black transition-all duration-500">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-lg md:text-xl font-bold mb-1 md:mb-2 group-hover:text-gold-primary transition-colors font-display">{item.title}</h4>
                    <p className="text-sm md:text-base text-white/50 leading-relaxed group-hover:text-white/70 transition-colors">{item.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

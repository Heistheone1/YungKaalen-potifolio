import { motion } from "motion/react";
import { Quote, Star } from "lucide-react";
import { useContent } from "../context/ContentContext";
import SectionEditor from "./SectionEditor";
import { Reveal } from "./Reveal";

export default function Testimonials() {
  const { content } = useContent();
  const defaultData = {
    title: "Impact & Influence",
    subtitle: "Voices from the community and partners.",
    t1Name: "Alex M.",
    t1Role: "Brand Partner",
    t1Text: "Working with YungKaalen was a game-changer. His vision for the KAYN brand is unmatched in the region.",
    t1Avatar: "https://picsum.photos/seed/t1/100/100",
    t2Name: "Sarah K.",
    t2Role: "Content Creator",
    t2Text: "Savior is a true visionary. He inspires all of us to push the boundaries of what's possible in digital media.",
    t2Avatar: "https://picsum.photos/seed/t2/100/100",
    t3Name: "David R.",
    t3Role: "Event Organizer",
    t3Text: "The energy he brings to every project is infectious. A true professional who delivers excellence.",
    t3Avatar: "https://picsum.photos/seed/t3/100/100"
  };

  const data = { ...defaultData, ...content.testimonials };

  const testimonials = [
    { name: data.t1Name, role: data.t1Role, text: data.t1Text, avatar: data.t1Avatar },
    { name: data.t2Name, role: data.t2Role, text: data.t2Text, avatar: data.t2Avatar },
    { name: data.t3Name, role: data.t3Role, text: data.t3Text, avatar: data.t3Avatar },
  ];

  return (
    <section className="py-20 md:py-32 px-6 relative overflow-hidden bg-black/20">
      <SectionEditor 
        sectionId="testimonials"
        initialData={defaultData}
        fields={[
          { key: 'title', label: 'Section Title', type: 'text' },
          { key: 'subtitle', label: 'Subtitle', type: 'textarea' },
          // Testimonial 1
          { key: 't1Name', label: 'Person 1 Name', type: 'text' },
          { key: 't1Role', label: 'Person 1 Role', type: 'text' },
          { key: 't1Text', label: 'Person 1 Feedback', type: 'textarea' },
          { key: 't1Avatar', label: 'Person 1 Avatar URL', type: 'image' },
          // Testimonial 2
          { key: 't2Name', label: 'Person 2 Name', type: 'text' },
          { key: 't2Role', label: 'Person 2 Role', type: 'text' },
          { key: 't2Text', label: 'Person 2 Feedback', type: 'textarea' },
          { key: 't2Avatar', label: 'Person 2 Avatar URL', type: 'image' },
          // Testimonial 3
          { key: 't3Name', label: 'Person 3 Name', type: 'text' },
          { key: 't3Role', label: 'Person 3 Role', type: 'text' },
          { key: 't3Text', label: 'Person 3 Feedback', type: 'textarea' },
          { key: 't3Avatar', label: 'Person 3 Avatar URL', type: 'image' },
        ]}
      />
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-20">
          <Reveal width="100%">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs md:text-sm font-bold text-gold-primary mb-4 md:mb-6 uppercase tracking-widest">
              <Star size={14} fill="currentColor" />
              Testimonials
            </div>
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-4 md:mb-6">{data.title}</h2>
            <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto font-light">{data.subtitle}</p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((t, i) => (
            <Reveal key={i} delay={i * 0.2}>
              <div className="relative p-8 rounded-3xl bg-white/5 border border-white/5 hover:border-gold-primary/30 hover:bg-white/10 transition-all duration-500 group h-full flex flex-col">
                <div className="absolute top-6 right-6 text-white/10 group-hover:text-gold-primary/20 transition-colors">
                  <Quote size={48} />
                </div>
                
                <div className="mb-8 relative z-10">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className="text-gold-primary" fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-lg text-white/80 leading-relaxed italic font-serif">"{t.text}"</p>
                </div>
                
                <div className="mt-auto flex items-center gap-4 pt-6 border-t border-white/5">
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-white/10 group-hover:border-gold-primary transition-colors">
                    <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white group-hover:text-gold-primary transition-colors">{t.name}</h4>
                    <p className="text-sm text-white/40 uppercase tracking-wider font-medium">{t.role}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

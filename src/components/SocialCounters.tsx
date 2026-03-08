import { motion } from "motion/react";
import { useContent } from "../context/ContentContext";
import SectionEditor from "./SectionEditor";

export default function SocialCounters() {
  const { content } = useContent();
  const defaultData = {
    stat1Label: "KAYN Brand Reach",
    stat1Value: "100K+",
    stat2Label: "YouTube Subs",
    stat2Value: "2K+",
    stat3Label: "Instagram",
    stat3Value: "35K+",
    stat4Label: "Twitch",
    stat4Value: "13.5K"
  };

  const data = { ...defaultData, ...content.socialCounters };

  const stats = [
    { label: data.stat1Label, value: data.stat1Value },
    { label: data.stat2Label, value: data.stat2Value },
    { label: data.stat3Label, value: data.stat3Value },
    { label: data.stat4Label, value: data.stat4Value },
  ];

  return (
    <section className="py-16 md:py-24 px-6 border-y border-white/5 bg-black/20 relative">
      <SectionEditor 
        sectionId="socialCounters"
        initialData={defaultData}
        fields={[
          { key: 'stat1Label', label: 'Stat 1 Label', type: 'text' },
          { key: 'stat1Value', label: 'Stat 1 Value', type: 'text' },
          { key: 'stat2Label', label: 'Stat 2 Label', type: 'text' },
          { key: 'stat2Value', label: 'Stat 2 Value', type: 'text' },
          { key: 'stat3Label', label: 'Stat 3 Label', type: 'text' },
          { key: 'stat3Value', label: 'Stat 3 Value', type: 'text' },
          { key: 'stat4Label', label: 'Stat 4 Label', type: 'text' },
          { key: 'stat4Value', label: 'Stat 4 Value', type: 'text' },
        ]}
      />
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.8 }}
            viewport={{ once: true }}
            className={`flex flex-col items-center justify-center py-8 md:py-12 px-4 text-center relative ${
              i !== stats.length - 1 ? "md:border-r border-white/10" : ""
            } ${i % 2 === 0 && i !== stats.length - 1 ? "max-md:border-r" : ""} ${i < 2 ? "max-md:border-b" : ""}`}
          >
            <div className="text-4xl md:text-5xl lg:text-7xl font-display font-bold text-gold-primary mb-2 md:mb-4 tracking-tighter">
              {stat.value}
            </div>
            <div className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] text-white/40">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}


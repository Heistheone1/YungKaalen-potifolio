import { motion } from "motion/react";
import { useContent } from "../context/ContentContext";
import SectionEditor from "./SectionEditor";
import { Shield, Zap, Target } from "lucide-react";

export const defaultData = {
  title: "Professional Standards",
  description: "Setting the benchmark for excellence in digital content creation and streaming.",
  item1Title: "Quality Assurance",
  item1Desc: "Delivering high-fidelity content with precision.",
  item2Title: "Creative Strategy",
  item2Desc: "Data-driven approach to audience engagement.",
  item3Title: "Technical Precision",
  item3Desc: "Optimized workflows for seamless production.",
};

export const fields: { key: string; label: string; type: 'text' | 'textarea' | 'image' }[] = [
  { key: 'title', label: 'Section Title', type: 'text' },
  { key: 'description', label: 'Description', type: 'textarea' },
  { key: 'item1Title', label: 'Item 1 Title', type: 'text' },
  { key: 'item1Desc', label: 'Item 1 Description', type: 'textarea' },
  { key: 'item2Title', label: 'Item 2 Title', type: 'text' },
  { key: 'item2Desc', label: 'Item 2 Description', type: 'textarea' },
  { key: 'item3Title', label: 'Item 3 Title', type: 'text' },
  { key: 'item3Desc', label: 'Item 3 Description', type: 'textarea' },
];

export default function ProfessionalStandards() {
  const { content } = useContent();
  const data = { ...defaultData, ...content.professionalStandards };

  const items = [
    { title: data.item1Title, desc: data.item1Desc, icon: Shield },
    { title: data.item2Title, desc: data.item2Desc, icon: Zap },
    { title: data.item3Title, desc: data.item3Desc, icon: Target },
  ];

  return (
    <section className="py-24 px-6 bg-dark-bg relative">
      <SectionEditor 
        sectionId="professionalStandards"
        initialData={defaultData}
        fields={fields}
      />
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">{data.title}</h2>
          <p className="text-white/60 max-w-2xl mx-auto text-lg">{data.description}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {items.map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="bg-dark-card p-8 rounded-2xl border border-white/10 hover:border-gold-primary/50 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-gold-primary/10 flex items-center justify-center text-gold-primary mb-6">
                <item.icon size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
              <p className="text-white/50 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

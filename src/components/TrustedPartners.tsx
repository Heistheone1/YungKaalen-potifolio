import { motion } from "motion/react";
import { useContent } from "../context/ContentContext";
import SectionEditor from "./SectionEditor";

export const defaultData = {
  title: "Trusted Partners",
  p1Name: "RWAFLIX.STORE",
  p1Logo: "https://picsum.photos/seed/rwaflix/200/100",
  p2Name: "1X BET",
  p2Logo: "https://picsum.photos/seed/1xbet/200/100",
  p3Name: "FUNCRASH",
  p3Logo: "https://picsum.photos/seed/funcrash/200/100",
  p4Name: "MELBET",
  p4Logo: "https://picsum.photos/seed/melbet/200/100",
  p5Name: "4RABET",
  p5Logo: "https://picsum.photos/seed/4rabet/200/100",
};

export const fields: { key: string; label: string; type: 'text' | 'textarea' | 'image' }[] = [
  { key: 'title', label: 'Section Title', type: 'text' },
  { key: 'p1Name', label: 'Partner 1 Name', type: 'text' },
  { key: 'p1Logo', label: 'Partner 1 Logo', type: 'image' },
  { key: 'p2Name', label: 'Partner 2 Name', type: 'text' },
  { key: 'p2Logo', label: 'Partner 2 Logo', type: 'image' },
  { key: 'p3Name', label: 'Partner 3 Name', type: 'text' },
  { key: 'p3Logo', label: 'Partner 3 Logo', type: 'image' },
  { key: 'p4Name', label: 'Partner 4 Name', type: 'text' },
  { key: 'p4Logo', label: 'Partner 4 Logo', type: 'image' },
  { key: 'p5Name', label: 'Partner 5 Name', type: 'text' },
  { key: 'p5Logo', label: 'Partner 5 Logo', type: 'image' },
];

export default function TrustedPartners() {
  const { content } = useContent();
  const data = { ...defaultData, ...content.trustedPartners };

  const partners = [
    { name: data.p1Name, logo: data.p1Logo },
    { name: data.p2Name, logo: data.p2Logo },
    { name: data.p3Name, logo: data.p3Logo },
    { name: data.p4Name, logo: data.p4Logo },
    { name: data.p5Name, logo: data.p5Logo },
    // Duplicate for seamless marquee
    { name: data.p1Name, logo: data.p1Logo },
    { name: data.p2Name, logo: data.p2Logo },
    { name: data.p3Name, logo: data.p3Logo },
    { name: data.p4Name, logo: data.p4Logo },
    { name: data.p5Name, logo: data.p5Logo },
  ];

  return (
    <section className="py-24 px-6 bg-dark-bg border-t border-white/5 relative overflow-hidden">
      <SectionEditor 
        sectionId="trustedPartners"
        initialData={defaultData}
        fields={fields}
      />
      
      <div className="max-w-7xl mx-auto">
        <h2 className="text-sm font-bold text-white/40 uppercase tracking-widest text-center mb-16">{data.title}</h2>
        
        <div className="relative flex overflow-hidden">
          <motion.div
            className="flex gap-16 items-center"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 20, ease: "linear", repeat: Infinity }}
          >
            {partners.map((partner, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.1 }}
                className="flex flex-col items-center gap-4 min-w-[150px]"
              >
                <img 
                  src={partner.logo} 
                  alt={partner.name} 
                  className="h-16 object-contain opacity-60 hover:opacity-100 transition-opacity"
                  referrerPolicy="no-referrer"
                />
                <span className="text-xs font-medium text-white/30">{partner.name}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

import { motion } from "motion/react";
import { ShoppingBag, Star, Zap } from "lucide-react";
import { useContent } from "../context/ContentContext";
import SectionEditor from "./SectionEditor";

export default function KaynBrand() {
  const { content } = useContent();
  const defaultData = {
    titleLine1: "KAYN",
    titleLine2: "Lifestyle & Vision",
    description: "KAYN is more than just a brand; it's a movement founded by Inezaye Hirwa Savior. We specialize in high-end digital experiences, lifestyle curation, and creative direction that pushes the boundaries of the Rwandan creative industry.",
    feature1Title: "Premium Quality",
    feature1Desc: "Excellence in every detail of our creative output.",
    feature2Title: "Exclusive Design",
    feature2Desc: "Unique aesthetics that stand out in a global market.",
    feature3Title: "Innovation",
    feature3Desc: "Pioneering new ways to connect and inspire.",
    image1: "https://picsum.photos/seed/kayn1/600/800",
    image2: "https://picsum.photos/seed/kayn2/600/600",
    image3: "https://picsum.photos/seed/kayn3/600/600",
    image4: "https://picsum.photos/seed/kayn4/600/800"
  };

  const data = { ...defaultData, ...content.kaynBrand };

  return (
    <section id="kayn" className="py-20 md:py-24 px-6 relative bg-white/5">
      <SectionEditor 
        sectionId="kaynBrand"
        initialData={defaultData}
        fields={[
          { key: 'titleLine1', label: 'Title Line 1', type: 'text' },
          { key: 'titleLine2', label: 'Title Line 2', type: 'text' },
          { key: 'description', label: 'Description', type: 'textarea' },
          { key: 'feature1Title', label: 'Feature 1 Title', type: 'text' },
          { key: 'feature1Desc', label: 'Feature 1 Desc', type: 'text' },
          { key: 'feature2Title', label: 'Feature 2 Title', type: 'text' },
          { key: 'feature2Desc', label: 'Feature 2 Desc', type: 'text' },
          { key: 'feature3Title', label: 'Feature 3 Title', type: 'text' },
          { key: 'feature3Desc', label: 'Feature 3 Desc', type: 'text' },
          { key: 'image1', label: 'Image 1 URL', type: 'image' },
          { key: 'image2', label: 'Image 2 URL', type: 'image' },
          { key: 'image3', label: 'Image 3 URL', type: 'image' },
          { key: 'image4', label: 'Image 4 URL', type: 'image' },
        ]}
      />
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-primary/10 border border-gold-primary/20 text-xs font-bold text-gold-primary mb-6 uppercase tracking-widest">
              The Brand
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-display font-bold mb-6 md:mb-8 leading-tight">
              {data.titleLine1}<br />
              <span className="gold-text-gradient italic font-serif">{data.titleLine2}</span>
            </h2>
            <p className="text-lg md:text-xl text-white/60 mb-8 md:mb-12 leading-relaxed font-light">
              {data.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-gold-primary/10 flex items-center justify-center text-gold-primary">
                  <ShoppingBag size={24} />
                </div>
                <h4 className="font-bold">{data.feature1Title}</h4>
                <p className="text-sm text-white/40">{data.feature1Desc}</p>
              </div>
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-gold-primary/10 flex items-center justify-center text-gold-primary">
                  <Star size={24} />
                </div>
                <h4 className="font-bold">{data.feature2Title}</h4>
                <p className="text-sm text-white/40">{data.feature2Desc}</p>
              </div>
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-gold-primary/10 flex items-center justify-center text-gold-primary">
                  <Zap size={24} />
                </div>
                <h4 className="font-bold">{data.feature3Title}</h4>
                <p className="text-sm text-white/40">{data.feature3Desc}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="grid grid-cols-2 gap-3 md:gap-4 mt-8 lg:mt-0"
          >
            <div className="space-y-3 md:space-y-4 pt-8 md:pt-12">
              <div className="rounded-3xl overflow-hidden aspect-[3/4] border border-white/10">
                <img src={data.image1} alt="Kayn Brand 1" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="rounded-3xl overflow-hidden aspect-square border border-white/10">
                <img src={data.image2} alt="Kayn Brand 2" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
            </div>
            <div className="space-y-4">
              <div className="rounded-3xl overflow-hidden aspect-square border border-white/10">
                <img src={data.image3} alt="Kayn Brand 3" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="rounded-3xl overflow-hidden aspect-[3/4] border border-white/10">
                <img src={data.image4} alt="Kayn Brand 4" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

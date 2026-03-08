import { motion } from "motion/react";
import { PieChart, TrendingUp, MapPin, Users } from "lucide-react";
import { useContent } from "../context/ContentContext";
import SectionEditor from "./SectionEditor";

export default function MediaKit() {
  const { content } = useContent();
  const defaultData = {
    title: "I. H. Savior Media Kit",
    description: "Detailed audience insights and performance metrics for brand partners. Data updated monthly to reflect current growth and engagement.",
    stat1Label: "Total Followers",
    stat1Value: "60K+",
    stat2Label: "Monthly Views",
    stat2Value: "1.2M+",
    stat3Label: "Engagement Rate",
    stat3Value: "8.5/10",
    stat4Label: "Top Region",
    stat4Value: "US, GB, CH, IN, FR, DE, CAN, IT, JP, RU, RW, KE, TZ, ZA",
    demo1Label: "18-24",
    demo1Value: "45",
    demo2Label: "25-34",
    demo2Value: "35",
    demo3Label: "35-44",
    demo3Value: "15",
    demo4Label: "Other",
    demo4Value: "5",
    regionsList: "United States, United Kingdom, Switzerland, India, France, Germany, Canada, Italy, Japan, Russia, Rwanda, Kenya, Tanzania, South Africa"
  };

  const data = { ...defaultData, ...content.mediaKit };

  const stats = [
    { label: data.stat1Label, value: data.stat1Value, icon: <Users size={20} /> },
    { label: data.stat2Label, value: data.stat2Value, icon: <TrendingUp size={20} /> },
    { label: data.stat3Label, value: data.stat3Value, icon: <PieChart size={20} /> },
    { label: data.stat4Label, value: data.stat4Value, icon: <MapPin size={20} /> },
  ];

  const demographics = [
    { label: data.demo1Label, value: parseInt(data.demo1Value) },
    { label: data.demo2Label, value: parseInt(data.demo2Value) },
    { label: data.demo3Label, value: parseInt(data.demo3Value) },
    { label: data.demo4Label, value: parseInt(data.demo4Value) },
  ];

  const regions = data.regionsList.split(',').map((r: string) => r.trim());

  return (
    <section id="mediakit" className="py-20 md:py-24 px-6 relative overflow-hidden">
      <SectionEditor 
        sectionId="mediaKit"
        initialData={defaultData}
        fields={[
          { key: 'title', label: 'Section Title', type: 'text' },
          { key: 'description', label: 'Description', type: 'textarea' },
          { key: 'stat1Label', label: 'Stat 1 Label', type: 'text' },
          { key: 'stat1Value', label: 'Stat 1 Value', type: 'text' },
          { key: 'stat2Label', label: 'Stat 2 Label', type: 'text' },
          { key: 'stat2Value', label: 'Stat 2 Value', type: 'text' },
          { key: 'stat3Label', label: 'Stat 3 Label', type: 'text' },
          { key: 'stat3Value', label: 'Stat 3 Value', type: 'text' },
          { key: 'stat4Label', label: 'Stat 4 Label', type: 'text' },
          { key: 'stat4Value', label: 'Stat 4 Value', type: 'text' },
          { key: 'demo1Label', label: 'Demo 1 Label', type: 'text' },
          { key: 'demo1Value', label: 'Demo 1 Value (%)', type: 'text' },
          { key: 'demo2Label', label: 'Demo 2 Label', type: 'text' },
          { key: 'demo2Value', label: 'Demo 2 Value (%)', type: 'text' },
          { key: 'demo3Label', label: 'Demo 3 Label', type: 'text' },
          { key: 'demo3Value', label: 'Demo 3 Value (%)', type: 'text' },
          { key: 'demo4Label', label: 'Demo 4 Label', type: 'text' },
          { key: 'demo4Value', label: 'Demo 4 Value (%)', type: 'text' },
          { key: 'regionsList', label: 'Regions List (comma separated)', type: 'textarea' },
        ]}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold-primary/5 rounded-full blur-[150px]" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">{data.title}</h2>
          <p className="text-white/40 max-w-2xl mx-auto text-sm md:text-base">
            {data.description}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="glass-card rounded-3xl p-8 flex flex-col items-center text-center group hover:border-gold-primary/30 transition-all"
              >
                <div className="w-12 h-12 rounded-2xl bg-gold-primary/10 flex items-center justify-center text-gold-primary mb-6 group-hover:scale-110 transition-transform">
                  {stat.icon}
                </div>
                <div className={`${stat.label === "Top Region" ? "text-[18px] leading-tight" : "text-4xl"} font-display font-bold mb-2 group-hover:text-gold-primary transition-colors`}>{stat.value}</div>
                <div className="text-sm text-white/40 font-medium uppercase tracking-widest">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Demographics & Regions */}
          <div className="glass-card rounded-3xl p-6 md:p-10 flex flex-col justify-between border-gold-primary/10">
            <div>
              <h4 className="text-lg md:text-xl font-bold mb-6 md:mb-8 flex items-center gap-2">
                <PieChart size={20} className="text-gold-primary" />
                Audience Demographics
              </h4>
              <div className="space-y-4 md:space-y-6">
                {demographics.map((demo, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-white/60">{demo.label} years old</span>
                      <span className="font-bold text-gold-light">{demo.value}%</span>
                    </div>
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${demo.value}%` }}
                        transition={{ duration: 1, delay: i * 0.1 }}
                        viewport={{ once: true }}
                        className="h-full bg-gradient-to-r from-gold-dark to-gold-primary rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12 pt-12 border-t border-white/5">
              <h4 className="text-xl font-bold mb-6">Top Regions</h4>
              <div className="flex flex-wrap gap-3">
                {regions.map((region: string, i: number) => (
                  <span
                    key={i}
                    className="px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-sm font-medium hover:border-white/20 transition-colors"
                  >
                    {region}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

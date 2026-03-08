import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, PanInfo } from "motion/react";
import { useContent } from "../context/ContentContext";
import SectionEditor from "./SectionEditor";

export default function Gallery() {
  const { content } = useContent();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const defaultData = {
    title: "Gallery",
    subtitle: "A visual journey through my life and career.",
    img1: "https://picsum.photos/seed/g1/600/600",
    img2: "https://picsum.photos/seed/g2/600/600",
    img3: "https://picsum.photos/seed/g3/600/600",
    img4: "https://picsum.photos/seed/g4/600/600",
    img5: "https://picsum.photos/seed/g5/600/600",
    img6: "https://picsum.photos/seed/g6/600/600",
    audioUrl: "",
  };

  const data = { ...defaultData, ...content.gallery };
  const items = [data.img1, data.img2, data.img3, data.img4, data.img5, data.img6];

  useEffect(() => {
    if (audioRef.current && data.audioUrl) {
      audioRef.current.volume = 0.2;
      audioRef.current.play().catch(e => console.log("Audio play suppressed:", e.message));
    }
  }, [currentIndex, data.audioUrl]);

  const paginate = (newDirection: number) => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setDirection(newDirection);
    setCurrentIndex((prev) => (prev + newDirection + items.length) % items.length);
  };

  useEffect(() => {
    const timer = setInterval(() => paginate(1), 5000);
    return () => clearInterval(timer);
  }, [items.length]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      rotateY: direction > 0 ? -180 : 180,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      rotateY: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? "100%" : "-100%",
      rotateY: direction < 0 ? -180 : 180,
      opacity: 0,
    }),
  };

  return (
    <section id="gallery" className="py-20 md:py-24 px-6 bg-dark-bg relative border-t border-white/5 overflow-hidden">
      <audio key={data.audioUrl} ref={audioRef} src={data.audioUrl} loop onError={() => console.log("Audio source failed to load")} />
      <SectionEditor 
        sectionId="gallery"
        initialData={defaultData}
        fields={[
          { key: 'title', label: 'Section Title', type: 'text' },
          { key: 'subtitle', label: 'Subtitle', type: 'textarea' },
          { key: 'img1', label: 'Image 1 URL', type: 'image' },
          { key: 'img2', label: 'Image 2 URL', type: 'image' },
          { key: 'img3', label: 'Image 3 URL', type: 'image' },
          { key: 'img4', label: 'Image 4 URL', type: 'image' },
          { key: 'img5', label: 'Image 5 URL', type: 'image' },
          { key: 'img6', label: 'Image 6 URL', type: 'image' },
          { key: 'audioUrl', label: 'Background Sound (Audio File)', type: 'audio' },
        ]}
      />
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4 gold-text-gradient">{data.title}</h2>
          <p className="text-white/40 max-w-xl mx-auto text-sm md:text-base">{data.subtitle}</p>
        </div>

        <div className="relative h-[500px] w-full flex items-center justify-center perspective-2000" onClick={() => paginate(1)}>
          <AnimatePresence initial={false} custom={direction}>
            <motion.img
              key={currentIndex}
              src={items[currentIndex]}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                duration: 0.8,
                ease: [0.4, 0, 0.2, 1],
              }}
              style={{ transformStyle: "preserve-3d" }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }: PanInfo) => {
                const swipe = Math.abs(offset.x) * velocity.x;
                if (swipe < -10000) paginate(1);
                else if (swipe > 10000) paginate(-1);
              }}
              className="absolute w-full h-full object-cover rounded-3xl shadow-2xl cursor-pointer"
              referrerPolicy="no-referrer"
            />
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

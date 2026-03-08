import React, { useState, useEffect } from "react";
import { motion } from "motion/react";

interface OpeningAnimationProps {
  onComplete: () => void;
}

const OpeningAnimation: React.FC<OpeningAnimationProps> = ({ onComplete }) => {
  const text = "YUNGKAALEN";
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Web Audio API context for sounds
  const playSound = (type: 'type' | 'delete' | 'whoosh') => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      
      const ctx = new AudioContext();

      if (type === 'whoosh') {
        // White noise for whoosh
        const bufferSize = ctx.sampleRate * 0.8; // 0.8 seconds
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }
        
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        
        // Lowpass filter to make it a deep whoosh
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(100, ctx.currentTime);
        filter.frequency.exponentialRampToValueAtTime(2000, ctx.currentTime + 0.6);

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        noise.start();
      } else {
        // Typing/Deleting sounds
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = type === 'delete' ? "square" : "triangle";
        const baseFreq = type === 'delete' ? 800 : 2000;
        osc.frequency.setValueAtTime(baseFreq + Math.random() * 300, ctx.currentTime);
        
        gain.gain.setValueAtTime(0.03, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 0.05);
      }
    } catch (e) {
      // Ignore audio errors (e.g. user hasn't interacted yet)
    }
  };

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const animateText = () => {
      if (!isDeleting) {
        if (displayedText.length < text.length) {
          timeout = setTimeout(() => {
            setDisplayedText(text.slice(0, displayedText.length + 1));
            playSound('type');
          }, 150 + Math.random() * 50); // Random typing speed
        } else {
          // Finished typing, wait before deleting
          timeout = setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        if (displayedText.length > 0) {
          timeout = setTimeout(() => {
            setDisplayedText(text.slice(0, displayedText.length - 1));
            playSound('delete');
          }, 75); // Faster deletion
        } else {
          // Finished deleting, trigger completion
          playSound('whoosh');
          timeout = setTimeout(onComplete, 600);
        }
      }
    };

    animateText();
    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
      exit={{ 
        y: -window.innerHeight,
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
      }}
    >
      <div className="text-4xl md:text-6xl font-display font-bold tracking-wider text-white">
        {displayedText}
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="inline-block w-1 h-8 md:h-12 bg-gold-primary ml-1 align-middle"
        />
      </div>
    </motion.div>
  );
}

export default OpeningAnimation;

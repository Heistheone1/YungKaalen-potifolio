import { motion } from "motion/react";
import { Instagram, Twitch, Youtube, Twitter, Disc as Discord, Send } from "lucide-react";
import { Link } from "react-router-dom";
import { useContent } from "../context/ContentContext";
import SectionEditor from "./SectionEditor";

export default function Footer() {
  const { content } = useContent();
  const defaultData = {
    brandName: "I. H. SAVIOR",
    description: "Inezaye Hirwa Savior | Founder of KAYN. Bridging cultures through digital excellence.",
    instagramUrl: "https://instagram.com/yungkaalen",
    twitchUrl: "https://twitch.tv/yungkaalen",
    youtubeUrl: "https://youtube.com/yungkaalen",
    twitterUrl: "https://twitter.com/yungkaalen",
    discordUrl: "https://discord.gg/yungkaalen",
    tiktokUrl: "https://tiktok.com/@yungkaalen",
    copyrightText: "© 2026 Inezaye Hirwa Savior. All rights reserved.",
    mediaKitUrl: "#"
  };

  const data = { ...defaultData, ...content.footer };

  const socials = [
    { icon: <Instagram size={20} />, href: data.instagramUrl },
    { icon: <Twitch size={20} />, href: data.twitchUrl },
    { icon: <Youtube size={20} />, href: data.youtubeUrl },
    { icon: <Twitter size={20} />, href: data.twitterUrl },
    { icon: <Discord size={20} />, href: data.discordUrl },
    { icon: <Send size={20} />, href: data.tiktokUrl },
  ];

  return (
    <footer className="py-12 md:py-20 px-6 border-t border-white/5 bg-dark-bg relative">
      <SectionEditor 
        sectionId="footer"
        initialData={defaultData}
        fields={[
          { key: 'brandName', label: 'Brand Name', type: 'text' },
          { key: 'description', label: 'Description', type: 'textarea' },
          { key: 'instagramUrl', label: 'Instagram URL', type: 'text' },
          { key: 'twitchUrl', label: 'Twitch URL', type: 'text' },
          { key: 'youtubeUrl', label: 'YouTube URL', type: 'text' },
          { key: 'twitterUrl', label: 'Twitter URL', type: 'text' },
          { key: 'discordUrl', label: 'Discord URL', type: 'text' },
          { key: 'tiktokUrl', label: 'TikTok URL', type: 'text' },
          { key: 'copyrightText', label: 'Copyright Text', type: 'text' },
          { key: 'mediaKitUrl', label: 'Media Kit URL', type: 'text' },
        ]}
      />
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-12 mb-12 md:mb-20">
          <div className="text-center md:text-left">
            <div className="text-2xl md:text-3xl font-display font-bold mb-4 gold-text-gradient">
              {data.brandName}
            </div>
            <p className="text-white/40 max-w-xs font-light mx-auto md:mx-0">
              {data.description}
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-6">
            <div className="text-sm font-bold uppercase tracking-widest text-white/40">Follow the Journey</div>
            <div className="flex flex-wrap justify-center gap-4">
              {socials.map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  target="_blank"
                  whileHover={{ y: -5, color: "#D4AF37" }}
                  className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60 transition-colors hover:border-gold-primary/30"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-xs md:text-sm text-white/20 text-center md:text-left">
          <div>{data.copyrightText}</div>
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/faq" className="hover:text-white transition-colors">FAQ</Link>
            <a href={data.mediaKitUrl} className="hover:text-white transition-colors">Media Kit PDF</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

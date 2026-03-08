import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import SocialCounters from "../components/SocialCounters";
import About from "../components/About";
import KaynBrand from "../components/KaynBrand";
import ContentShowcase from "../components/ContentShowcase";
import ProfessionalStandards from "../components/ProfessionalStandards";
import TrustedPartners from "../components/TrustedPartners";
import Gallery from "../components/Gallery";
import Testimonials from "../components/Testimonials";
import MediaKit from "../components/MediaKit";
import ContactForm from "../components/ContactForm";
import Footer from "../components/Footer";
import AdminLogin from "../components/AdminLogin";
import OpeningAnimation from "../components/OpeningAnimation";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="min-h-screen bg-dark-bg text-white selection:bg-gold-primary/30">
      <AdminLogin />
      <AnimatePresence>
        {isLoading ? (
          <OpeningAnimation key="opening" onComplete={() => setIsLoading(false)} />
        ) : null}
      </AnimatePresence>

      <div>
        <Navbar />
        <main>
          <Hero enableAnimation={!isLoading} />
          <SocialCounters />
          <About />
          <KaynBrand />
          <ContentShowcase />
          <ProfessionalStandards />
          <TrustedPartners />
          <Gallery />
          <Testimonials />
          <MediaKit />
          <ContactForm />
        </main>
        <Footer />
      </div>
    </div>
  );
}

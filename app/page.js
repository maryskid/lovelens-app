import Image from "next/image";
import { Button } from "@/components/ui/button";
import Hero from "@/app/_components/Hero";
import RelationshipSection from "@/app/_components/RelationshipSection";
import DiscoverSection from "@/app/_components/DiscoverSection";
import JourneySection from "@/app/_components/JourneySection";
import TestimonialsSection from "@/app/_components/TestimonialsSection";
import ScienceSection from "@/app/_components/ScienceSection";
import CallToActionSection from "@/app/_components/CallToActionSection";
import FAQSection from "@/app/_components/FAQSection";
import Footer from "@/app/_components/Footer";
export default function Home() {
  return (
    <div>
      <Hero />
      <RelationshipSection />
      <DiscoverSection />
      <JourneySection />
      <TestimonialsSection />
      <ScienceSection />
      <CallToActionSection />
      <FAQSection />
    </div>
  );
}


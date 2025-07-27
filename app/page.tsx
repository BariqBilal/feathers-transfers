import HeroSection from "@/component/sections/HeroSection";
import PartnerSection from "@/component/sections/PartnerSection";
import QuoteSection from "@/component/sections/QueteSection";
import ServiceSection from "@/component/sections/ServiceSection";
import Testimonials from "@/component/sections/Testimonials";

export default function Home() {
  return (
    <div className="min-h-[90vh] h-auto">
      <HeroSection
        height="70vh" 
        bgImage="/hero.jpg"
        title="Trusted Transfers to La Plagne Resorts"
        description="Your dedicated specialists for reliable airport and train station transfers across all of La Plagne."
      />
      <ServiceSection/>
      <PartnerSection/>
      <QuoteSection/>
      <Testimonials/>
    </div>
  );
}

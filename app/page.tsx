import HeroSection3 from "@/component/sections/HeroSection3";
import PartnerSection from "@/component/sections/PartnerSection";
import QuoteSection from "@/component/sections/QueteSection";
import ServiceSection from "@/component/sections/ServiceSection";
import Testimonials from "@/component/sections/Testimonials";

export default function Home() {
  return (
    <div className="">
      <HeroSection3
        height="75vh" 
        bgImage="/ccc.PNG"
        title="Trusted Transfers to all La Plagne Resorts"
        description="Your dedicated specialists for reliable airport and train station transfers across all of La Plagne."
      />
      <ServiceSection/>
      <PartnerSection/>
      
      <QuoteSection/>
      <Testimonials/>
    </div>
  );
}

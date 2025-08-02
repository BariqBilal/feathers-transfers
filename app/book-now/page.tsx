import FeatureSection from "@/component/sections/FeatureSection";
import HeroSection from "@/component/sections/HeroSection";

export default function BookNow() {
  return (
    <>
      <HeroSection
        height="75vh"
        bgImage="/ccc.PNG"
        title="Book Your Transfer Now!"
        description="Secure your transfer to La Plagne Resorts today with our fast, reliable, and comfortable."
      />
      <FeatureSection />
    </>
  )
}
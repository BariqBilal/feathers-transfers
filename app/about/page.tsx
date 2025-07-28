import AboutSection from "@/component/sections/AboutDetailSec";
import CommitmentSection from "@/component/sections/Comitement";
import FeatureSection from "@/component/sections/FeatureSection";
import HeroSection2 from "@/component/sections/HeroSection2";

export default function About(){
    return(
        <>
         <HeroSection2
        height="50vh" 
        bgImage="/about.PNG"
        title="Our Story in the French Alps"
        description="Three decades of excellence in mountain transport and hospitality"
      />
      <AboutSection/>
      <FeatureSection/>
      <CommitmentSection/>
        </>
    )
}
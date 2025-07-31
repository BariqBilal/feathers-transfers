import DetailSection from "@/component/sections/DetaillSection";
import HeroSection2 from "@/component/sections/HeroSection2";

export default function LaPplange() {
    return (
        <>
            <HeroSection2
                height="50vh"
                bgImage="/contact.jpg"
                title="The Eleven Villages of La Plagne"
                description="Specialized in La Plagne and Savoie Region Transfers"
            />
            <DetailSection />
        </>
    )
}
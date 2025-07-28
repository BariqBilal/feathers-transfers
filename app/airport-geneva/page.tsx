import AirportDetail from "@/component/sections/AirportDetail";
import HeroSection2 from "@/component/sections/HeroSection2";

export default function AirportGeneva(){
    return(
        <>
          <HeroSection2
        height="50vh" 
        bgImage="/hero.jpg"
        title="Geneva Airport (LATA Code: GVA)"
        description="Your Gateway to Switzerland and the Alps"
      />
       <AirportDetail
        location='Just 4km northwest of Geneva city centre'
        transferTime='2.5 hours to La Plagne'
        amenities='Free Wi-Fi available throughout'
      />
        </>
    )
}
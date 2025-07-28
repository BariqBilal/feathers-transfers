import AirportOverview from "@/component/AirportOverview";
import AirportDetail from "@/component/sections/AirportDetail";
import AirportInfoCards from "@/component/sections/AirportInfoCards";
import HeroSection2 from "@/component/sections/HeroSection2";
import InfoCard from "@/component/sections/InfoCard";
import { FaMapMarkerAlt, FaPlane } from "react-icons/fa";
import { FiMapPin } from "react-icons/fi";

export default function AirportGeneva(){
   const airportData = {
    title: "Geneva Airport Overview",
    description: [
      "Geneva Airport is one of Switzerland's principal gateways to the world.",
      "Situated just four kilometres northwest of the city centre, it serves not only the city and parts of neighbouring France, but it is also the main arrival destination for skiers during the ski season.",
      "In our opinion, Geneva should be your first choice airport not only due to the large number of daily flights, but principally because it is such a major transfer hub, it very rarely, if ever, gets closed due to bad weather ensuring your flight is very unlikely to be diverted."
    ],
    imageUrl: "/aa.png",
    imageAlt: "Aerial view of Geneva Airport"
  };
    return(
        <>
          <HeroSection2
        height="50vh" 
        bgImage="/airportg.jpg"
        title="Geneva Airport (LATA Code: GVA)"
        description="Your Gateway to Switzerland and the Alps"
      />
       <AirportDetail
        location='Just 4km northwest of Geneva city centre'
        transferTime='2.5 hours to La Plagne'
        amenities='Free Wi-Fi available throughout'
      />
       <AirportOverview
        title={airportData.title}
        description={airportData.description}
        imageUrl={airportData.imageUrl}
        imageAlt={airportData.imageAlt}
      />
      <AirportInfoCards/>
        <div style={{ padding: '20px' }}>
      <InfoCard
        title="Traveling to other Geneva resorts?"
        description="Genève Aéroport generates enough income every year to cope with the maintenance of its infrastructure and to finance its development. The company does not receive subsidies from any public authority and each year it pays half of its profits to the State!"
        icon={<FaMapMarkerAlt size={24} />} 
      />
    </div>
        </>
    )
}
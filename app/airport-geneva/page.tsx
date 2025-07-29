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
      "Arrivals at Geneva can get VERY busy on Saturdays during the ski season so to avoid problems, we always meet our Passengers at the Swiss Chalet Restaurant which is well away from the crowds. ",

      "Exit customs, but not the airport terminal, and turn left, heading towards the train station. Walk for no more than 100m and on your left hand side you will see the Swiss Chalet Restaurant where your driver will be waiting for you holding a sign with your name on it.",
      "Exit the terminal building, turn left and head towards the road. After a short walk of around two hundred metres, you will arrive at T1. Continue straight ahead towards the train station and, as above, about 100 m after arrivals, you will arrive at the Swiss Chalet Restaurant",
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
        description="Geneva Airport is one of Switzerland’s principal gateways to the world. Situated just four kilometres northwest of the city centre, it serves not only the city and parts of neighbouring France, but it is also the main arrival destination for skiers during the ski season. On a good run, Geneva Airport is a two-and-a-half-hour transfer to La Plagne."
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
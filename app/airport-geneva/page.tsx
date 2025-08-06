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
      "Arrivals at Geneva can get VERY busy on Saturdays during the ski season so to avoid problems, we always meet our Passengers at the <a  href='https://www.google.fr/maps/place/Swiss+Chalet/@46.2311027,6.1066986,17z/data=!3m1!5s0x478c64845e72c92b:0x55f0c588a8b1ba9e!4m10!1m2!2m1!1sswiss+chalet+restauran+geneva+airport!3m6!1s0x478c64845ca06b3f:0x87f884a9e214bc72!8m2!3d46.2312036!4d6.1094997!15sCiZzd2lzcyBjaGFsZXQgcmVzdGF1cmFudCBnZW5ldmEgYWlycG9ydCIDiAEBWigiJnN3aXNzIGNoYWxldCByZXN0YXVyYW50IGdlbmV2YSBhaXJwb3J0kgEQc3dpc3NfcmVzdGF1cmFudKoBkAEKDC9nLzFxNjI5eF9qcwoJL20vMDFxc2d0CgkvbS8wMjBuX18QASobIhdzd2lzcyBjaGFsZXQgcmVzdGF1cmFudCgAMh8QASIb25u4cIVCe01MTrXVdJzWQN6JzN-WHUrFRinqMioQAiImc3dpc3MgY2hhbGV0IHJlc3RhdXJhbnQgZ2VuZXZhIGFpcnBvcnTgAQA!16s%2Fg%2F1hhxjy0vx?entry=ttu&g_ep=EgoyMDI1MDczMC4wIKXMDSoASAFQAw%3D%3D' className='text-blue-500 hover:underline'>Swiss Chalet Restaurant</a> which is well away from the crowds.",
      
      "Exit customs, but not the airport terminal, and turn left, heading towards the train station. Walk for no more than 100m and on your left hand side you will see the Swiss Chalet Restaurant where your driver will be waiting for you holding a sign with your name on it.",
      
      "Exit the terminal building, turn left and head towards the road. After a short walk of around two hundred metres, you will arrive at T1. Continue straight ahead towards the train station and, as above, about 100m after arrivals, you will arrive at the Swiss Chalet Restaurant"
    ],
    imageUrl: "/airportg.jpg",
    imageAlt: "Aerial view of Geneva Airport"
  };
    return(
        <>
          <HeroSection2
        height="50vh" 
        bgImage="/airportg.jpg"
        title="Geneva Airport (IATA Code: GVA)"
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
        title="Geneva Airport – Did you know ?"
        description="Genève Aéroport generates enough income every year to cope with the maintenance of its infrastructure and to finance its development. The company does not receive subsidies from any public authority and each year it pays half of its profits to the State!"
        icon={<FaMapMarkerAlt size={24} />} 
  
      />
    </div>
        </>
    )
}
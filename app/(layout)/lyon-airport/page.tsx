import AirportOverview from "@/component/AirportOverview";
import AirportDetail from "@/component/sections/AirportDetail";
import HeroSection2 from "@/component/sections/HeroSection2";
import InfoCard from "@/component/sections/InfoCard";
import ProcedureSection from "@/component/sections/ProcedureSection";
import { Car, CheckCircle, FileText } from "lucide-react";
import { FaMapMarkerAlt } from "react-icons/fa";

export default function AirportGeneva(){
   const airportData = {
    title: "Lyon Saint-Exupéry Airport",
    description: [
      "<a href='https://www.lyonaeroports.com/en'>Lyon Saint-Exupéry Airport</a> serves as the region’s principal portal to Europe and the world at large, blending efficiency and modernity with the timeless elegance of French design. On a good run, the airport is a two-and-a-half-hour transfer to La Plagne.",
      
      "The airport’s main terminal, Terminal 1, underwent significant expansion and modernization in 2017. The new extension offers a sleek, contemporary space with soaring glass facades, expansive waiting areas, and a variety of Shops Cafés/Restaurants and Airport lounges. It handles many international and Schengen flights and most flights from the UK arrive at Terminal 1.",
      "The nearest parking to the Terminal 1 is a good ten minutes’ walk away, so to avoid you the inconvenience of hauling your baggage about, your driver will be waiting five minutes away and will come into the short stay pick up and drop off zone to collect you. When you are ready, we ask that you send a WhatsApp message."
    ],
    imageUrl: "/T1 LYON.jpg",
    imageAlt: "Aerial view of Geneva Airport"
  };

  const stepsData = [
  {
    icon: <FileText className="w-8 h-8" />,
    stepTitle: '',
    description: 'The nearest parking to the Terminal 1 is a good ten minutes’ walk away, so to avoid you the inconvenience of hauling your baggage about, your driver will be waiting five minutes away and will come into the short stay pick up and drop off zone to collect you. '
  },
  {
    icon: <Car className="w-8 h-8" />,
    stepTitle: '',
    description: 'When you have collected all your luggage and are ready to go, we ask that you walk out to the car park (not the one with taxis and buses) and then send your driver a WhatsApp message. He or she will then come in to collect you.'
  },
  {
    icon: <CheckCircle className="w-8 h-8" />,
    stepTitle: '',
    description: 'Situated on the outskirts of Lyon, the airport has direct motorway access ensuring you a speedy getaway towards the alps.'
  },
];
    return(
        <>
          <HeroSection2
        height="50vh" 
        bgImage="/airport4.jpg"
        title="Lyon Saint-Exupéry Airport (IATA Code: LYS)"
        description="Lyon, the vibrant capital of France’s Auvergne-Rhône-Alpes region, is renowned for its rich history, gastronomic heritage, and cultural life. As the third largest city in France, Lyon is a pivotal hub for both tourism and business."
      />
       <AirportDetail
        location='25kms east of Lyon in the town of Colombier-Saugnieu'
        transferTime='2.5 hours to La Plagne'
        amenities='Free Wi-Fi available throughout'
      />
      <AirportOverview
        title={airportData.title}
        description={airportData.description}
      imageUrl={airportData.imageUrl}
        imageAlt={airportData.imageAlt}
      />
       <ProcedureSection sectionTitle="Arrival Procedure at Lyon Airport" steps={stepsData} />
       <div style={{ padding: '20px' }}>
      <InfoCard
        title="Lyon Saint-Exupéry Airport – did you know ?"
        description="The airport hosts a winter festival each year, celebrating the start of the ski season with live music, local food, and family activities !"
        icon={<FaMapMarkerAlt size={24} />} 
      />
    </div>
        </>
    )
}
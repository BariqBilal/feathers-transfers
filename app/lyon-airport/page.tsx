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
      "Lyon Saint-Exupéry Airport serves as the region’s principal portal to Europe and the world at large, blending efficiency and modernity with the timeless elegance of French design. On a good run, the airport is a two-and-a-half-hour transfer to La Plagne.",
      
      "The airport’s main terminal, Terminal 1, underwent significant expansion and modernization in 2017. The new extension offers a sleek, contemporary space with soaring glass facades, expansive waiting areas, and a variety of Shops Cafés/Restaurants and Airport lounges. It handles many international and Schengen flights and most flights from the UK arrive at Terminal 1.",
      "The nearest parking to the Terminal 1 is a good ten minutes’ walk away, so to avoid you the inconvenience of hauling your baggage about, your driver will be waiting five minutes away and will come into the short stay pick up and drop off zone to collect you. When you are ready, we ask that yu send a WhatsApp message."
    ],
    imageUrl: "/aa.png",
    imageAlt: "Aerial view of Geneva Airport"
  };

  const stepsData = [
  {
    icon: <FileText className="w-8 h-8" />,
    stepTitle: 'Step 1: Documentation',
    description: 'Complete all necessary paperwork for the procedure before starting.'
  },
  {
    icon: <Car className="w-8 h-8" />,
    stepTitle: 'Step 2: Vehicle Inspection',
    description: 'Ensure the vehicle passes the required safety inspection.'
  },
  {
    icon: <CheckCircle className="w-8 h-8" />,
    stepTitle: 'Step 3: Final Approval',
    description: 'Submit for final approval after all checks are complete.'
  },
];
    return(
        <>
          <HeroSection2
        height="50vh" 
        bgImage="/airport4.jpg"
        title="Lyon Saint-Exupéry Airport(LATA Code: LYS)"
        description="Lyon, the vibrant capital of France’s Auvergne-Rhône-Alpes region, is renowned for its rich history, gastronomic heritage, and cultural life. As the third largest city in France, Lyon is a pivotal hub for both tourism and business."
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
       <ProcedureSection sectionTitle="Procedure Steps" steps={stepsData} />
       <div style={{ padding: '20px' }}>
      <InfoCard
        title="Lyon Saint-Exupéry Airport"
        description="The airport hosts a winter festival each year, celebrating the start of the ski season with live music, local food, and family activities !"
        icon={<FaMapMarkerAlt size={24} />} 
      />
    </div>
        </>
    )
}